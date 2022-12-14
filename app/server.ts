import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
  AuthenticationError,
} from "apollo-server-core";
import express from "express";
import http from "http";
import { WebSocketServer } from "ws";
import { Resolvers, Schema } from "./graphql";
import { useServer } from "graphql-ws/lib/use/ws";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { getUser } from "./utils/getUser";

async function startApolloServer(typeDefs: any, resolvers: any) {
  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const app = express();

  const PORT = process.env.PORT || 4000;

  const httpServer = http.createServer(app);

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
  });

  const serverCleanup = useServer({ schema }, wsServer);

  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    cache: "bounded",
    context: ({ req }) => {
      const token = req.get("Authorization") || "";
      const user = getUser(token.replace("Bearer", ""));
      // if (!user)
      //   throw new AuthenticationError(
      //     "you must be logged in to query this schema"
      //   );
      return { user };
    },
    introspection: true,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
  });

  await server.start();
  server.applyMiddleware({ app });

  // server.installSubscriptionHandlers(httpServer);

  await new Promise<void>((resolve) => {
    httpServer.listen({ port: PORT }, resolve);
  });
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  );
}

startApolloServer(Schema, Resolvers);
