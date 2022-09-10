import { gql } from "apollo-server-express";
import { User } from "./User";

const Schema = gql`
  # This User type has one fields: name
  # ${User.type}

  type Query {
    ${User.queries}
  }

  type Mutation {
    ${User.mutations}
  }
`;

export default Schema;
