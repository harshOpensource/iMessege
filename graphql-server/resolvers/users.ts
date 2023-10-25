import { PrismaClient, User } from "@prisma/client";
import { CreateUsernameResponse, GraphQLContext } from "../types";
import { PubSub } from "graphql-subscriptions";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

const prisma = new PrismaClient();
const pubsub = new PubSub();

const userResolvers = {
  Query: {
    searchUsers: async function searchUsers(
      _: any,
      args: { username: string }
    ): Promise<Array<User>> {
      const { username: searchedUsername } = args;

      const session = await getServerSession(authOptions);

      if (!session) {
        throw new Error("Not authenticated!");
      }

      console.log("session", session);

      const myUsername = session?.user.username;

      try {
        const users = await prisma.user.findMany({
          where: {
            username: {
              contains: searchedUsername,
              not: myUsername,
              mode: "insensitive",
            },
          },
        });
        return users;
      } catch (error: any) {
        throw new Error(error);
      }
    },
  },

  Mutation: {
    createUsername: async function createUsername(
      _: any,
      args: {
        username: string;
      }
    ): Promise<CreateUsernameResponse> {
      const session = await getServerSession(authOptions);
      if (!session) {
        throw new Error("Not authenticated");
      }

      const { id: userId } = session.user;
      const { username } = args;

      try {
        const existingUser = await prisma.user.findUnique({
          where: {
            username,
          },
        });

        if (existingUser) {
          return {
            error: "Username already exists, Try Another!",
          };
        }

        await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            username,
          },
        });

        return { success: true };
      } catch (error) {
        return {
          error: "Something went wrong, Try Again!",
        };
      }
    },
  },
};

export default userResolvers;
