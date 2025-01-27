import { User } from "../../models";

export const userService = {
    getUsers: () => User.find(),
    getUserByEmail: (email: string) => User.findOne({ email }),
    getUserBySessionToken: (sessionToken: string) => User.findOne({
        'authentication.sessionToken': sessionToken
    }),
    getUserById: (id: string) => User.findById(id),
    createUser: (values: Record<string, any>) => new User(values).save().then((user) => user.toObject()),
    deleteUserById: (id: string) => User.findByIdAndDelete({ _id: id }),
    updateUser: (id: string, values: Record<string, any>) => User.findByIdAndUpdate(id, values),
}