import { User } from "./User";

const Resolvers = {
  Query: {
    ...User.resolvers.queries,
  },
  Mutation: {
    ...User.resolvers.mutation,
  },
};

export default Resolvers;
