import { gql } from "apollo-server-express";

const Schema = gql`
  # This User type has one fields: name
  type User {
    id: ID! # User ID is required
    name: String! # User name is required
  }
  type Query {
    getAllUsers: [User] # Get all users
    getUserById(id: Int): User # Get user by id
  }
  type Mutation {
    createUser(name: String): User! # Create a new user
    updateUser(id: Int, name: String): User! # Update user by id
    deleteUser(id: Int): User! # Delete user by id
  }
`;

export default Schema;
