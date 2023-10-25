import { GraphQLContext, SubscriptionContext } from "@/graphql-server/types";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { PrismaClient } from "@prisma/client";
import { PubSub } from "graphql-subscriptions";
import { useServer as subServer, useServer } from "graphql-ws/lib/use/ws";
import { createServer } from "http";
import { NextApiRequest, NextApiResponse, NextPageContext } from "next";
import { WebSocketServer } from "ws";
import resolvers from "@/graphql-server/resolvers/index";
import typeDefs from "@/graphql-server/typeDefs/index";

import { authOptions } from "../auth/[...nextauth]/route";
import { NextRequest } from "next/server";
import gql from "graphql-tag";
import { Session, getServerSession } from "next-auth";

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const httpServer = createServer();

const wsServer = new WebSocketServer({
  server: httpServer,
  path: "api/graphql/subscriptions",
});

const getSubscriptionContext = async (
  ctx: SubscriptionContext,
  req: NextApiRequest,
  res: NextApiResponse
): Promise<GraphQLContext> => {
  ctx;
  const session = await getServerSession(req, res, authOptions);
  const pubsub = new PubSub();
  const prisma = new PrismaClient();
  // ctx is the graphql-ws Context where connectionParams live
  if (ctx.connectionParams && ctx.connectionParams.session) {
    const { session } = ctx.connectionParams;
    return { session, prisma, pubsub };
  }
  // Otherwise let our resolvers know we don't have a current user
  return { session: session, prisma, pubsub };
};

const serverCleanup = useServer(
  {
    schema,
    context: (
      ctx: SubscriptionContext,
      req: NextApiRequest,
      res: NextApiResponse
    ) => {
      // This will be run every time the client sends a subscription request
      // Returning an object will add that information to our
      // GraphQL context, which all of our resolvers have access to.
      return getSubscriptionContext(ctx, req, res);
    },
  },
  wsServer
);

const apolloServer = new ApolloServer({
  schema,
  plugins: [
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});

const getServersSession = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  return session;
};

const handler = startServerAndCreateNextHandler<NextRequest>(apolloServer);

export async function GET(request: NextRequest, response: NextApiResponse) {
  return handler(request);
}

export async function POST(request: NextRequest) {
  return handler(request);
}
