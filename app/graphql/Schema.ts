import { gql } from "apollo-server-express";
import { Login } from "./Login";
import { User } from "./User";

const Schema = gql`
  # This User type has one fields: name
  ${User.type}

  # This Auth type
  ${Login.type}

  type Query {
    ${User.queries}
  }

  type Mutation {
    ${User.mutations}
    ${Login.mutations}
  }
`;

export default Schema;
