import users, { User } from "./dataset";

const Resolvers = {
  Query: {
    getAllUsers: () => users,
    getUserById: (_: any, args: User) =>
      users.find((user) => user.id === args.id),
  },
  Mutation: {
    createUser: (_: any, args: User) => {
      const newUser = {
        id: users.length + 1,
        name: args.name,
      };

      users.push(newUser);

      return newUser; //return the new object's result
    },
    updateUser: (_: any, args: User) => {
      const index = users.findIndex((user) => user.id === args.id);
      users.splice(index, 1, { ...users[index], name: args.name });
      return users[index];
    },
    deleteUser: (_: any, args: User) => {
      const index = users.findIndex((user) => user.id === args.id);
      const userDeleted = users[index];
      users.splice(index, 1);
      return userDeleted;
    },
  },
};

export default Resolvers;
