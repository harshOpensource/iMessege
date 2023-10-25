import { User } from "@prisma/client";
import { GraphQLContext } from "../types";

const userResolvers = {
  Query: {
    searchUsers: async function searchUsers(
      _: any,
      args: { username: string },
      context: GraphQLContext
    ): Promise<Array<User>> {
      const { username: searchedUsername } = args;
      const { prisma, session } = context;

      if (!prisma) {
        throw new Error("Not authenticated!");
      }

      const myUsername = session?.user?.username;

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
};

export default userResolvers;
