import jwt from "jsonwebtoken";

export const JWT_SECRET = "jwt-secret";

export const getUser = (token: string) => {
  try {
    if (token) {
      return jwt.verify(token, JWT_SECRET);
    }
    return null;
  } catch (error) {
    return null;
  }
};
