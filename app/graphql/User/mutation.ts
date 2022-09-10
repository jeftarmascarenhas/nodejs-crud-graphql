export const mutations = `
  createUser(name: String): User! # Create a new user
  updateUser(id: Int, name: String): User! # Update user by id
  deleteUser(id: Int): User! # Delete user by id
`;
