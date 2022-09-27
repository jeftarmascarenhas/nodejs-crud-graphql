import express from "express";
import { ApolloServer } from "apollo-server-express";
import { DocumentNode, print } from "graphql";
import request from "supertest";
import http from "http";
import { Schema, Resolvers } from "./app/graphql";

let cachedServer: any;

const createServer = async () => {
  const app = express();
  const server = new ApolloServer({
    typeDefs: Schema,
    resolvers: Resolvers,
    csrfPrevention: true,
    cache: "bounded",
  });

  const httpServer = http.createServer(app);
  await server.start();
  server.applyMiddleware({ app });
  return httpServer;
};

export const sendTestRequest = async (
  query: DocumentNode,
  {
    variables = {},
    headers = {},
  }: {
    variables?: any;
    headers?: { [key: string]: string };
  } = {}
): Promise<any> => {
  const server = cachedServer ?? (await createServer());
  cachedServer = server;
  const requestBuilder = request(server).post("/graphql");

  Object.entries(headers).forEach(([key, value]) => {
    requestBuilder.set(key, value);
  });
  const { text } = await requestBuilder.send({
    variables,
    query: print(query),
  });
  return JSON.parse(text);
};
