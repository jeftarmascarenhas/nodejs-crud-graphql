import jwt from "jsonwebtoken";
import { Login } from "../../entities";
import { JWT_SECRET } from "../../utils/getUser";

const mutations = {
  login(_: any, { email, password }: Login) {
    const token = jwt.sign({ email }, JWT_SECRET, {
      expiresIn: "1d",
    });

    const user = { id: 2, name: "Jeftar Mascarenhas" };

    const isValid = "123456"; // validePassword of database

    if (!user) {
      throw new Error("No user with that email");
    }

    if (!isValid) {
      throw new Error("Incorrect password");
    }

    return {
      token,
      user,
    };
  },
};

export const resolvers = { mutations };
