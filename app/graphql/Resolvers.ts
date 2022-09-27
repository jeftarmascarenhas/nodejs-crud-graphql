import { User } from "./User";
import { Login } from "./Login";

const Resolvers = {
  Query: {
    ...User.resolvers.queries,
  },
  Mutation: {
    ...User.resolvers.mutation,
    ...Login.resolvers.mutations,
  },
};

export default Resolvers;
