import { IUser, User } from "../../models";

export const UserService = {
  getUsers: () => User.find(),
  getUserById: (id: string) => User.findById(id),
  createUser: (values: Record<string, object>) =>
    new User(values).save().then((user) => user.toObject()),
  deleteUserById: (id: string) => User.findByIdAndDelete({ _id: id }),
  updateUser: (id: string, values: Record<string, any>) => User.findByIdAndUpdate(id, values),
};
