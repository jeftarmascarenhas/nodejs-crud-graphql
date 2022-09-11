import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import express from "express";
import http from "http";
import { Resolvers, Schema } from "./graphql";

async function startApolloServer(typeDefs: any, resolvers: any) {
  const app = express();
  const httpServer = http.createServer(app);
  const PORT = process.env.PORT || 4000;
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: "bounded",
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  server.applyMiddleware({ app });

  await new Promise<void>((resolve) => {
    httpServer.listen({ port: PORT }, resolve);
  });
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  );
}

startApolloServer(Schema, Resolvers);
