import { User } from "../../models";
export const AuthService = {
  getUserByEmail: (email: string) => User.findOne({ email }),
  getUserBySessionToken: (sessionToken: string) =>
    User.findOne({
      "authentication.sessionToken": sessionToken,
    }),
};
