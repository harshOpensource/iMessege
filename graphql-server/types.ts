import { PrismaClient } from "@prisma/client";
import { Session } from "next-auth";
import { Context } from "graphql-ws";
import { PubSub } from "graphql-subscriptions";

export interface CreateUsernameResponse {
  success?: boolean;
  error?: string;
}

export interface GraphQLContext {
  session: Session | null;
  prisma: PrismaClient;
  pubsub: PubSub;
}

export interface SubscriptionContext extends Context {
  connectionParams: {
    session?: Session;
  };
}
