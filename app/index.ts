import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import express from "express";
import http from "http";
import Resolvers from "./Resolvers";
import Schema from "./Schema";

async function startAppoloServer(schema: any, resolvers: any) {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs: Schema,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  server.applyMiddleware({ app });

  await new Promise<void>((resolve) => {
    httpServer.listen({ port: 4000 }, resolve);
  });
}

startAppoloServer(Schema, Resolvers);
