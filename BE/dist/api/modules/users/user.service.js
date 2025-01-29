"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const models_1 = require("../../models");
exports.UserService = {
    getUsers: () => models_1.User.find(),
    getUserById: (id) => models_1.User.findById(id),
    createUser: (values) => new models_1.User(values).save().then((user) => user.toObject()),
    deleteUserById: (id) => models_1.User.findByIdAndDelete({ _id: id }),
    updateUser: (id, values) => models_1.User.findByIdAndUpdate(id, values),
};
