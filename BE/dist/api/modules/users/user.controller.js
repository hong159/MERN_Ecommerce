"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const enums_1 = require("../../enums");
const user_service_1 = require("./user.service");
const lodash_1 = require("lodash");
exports.UserController = {
    getAllUsers: async (req, res) => {
        try {
            const users = await user_service_1.UserService.getUsers();
            res.status(enums_1.ResCode.OK).json(users);
        }
        catch (error) {
            console.log("Error on getAllUsers: ", error);
            res.sendStatus(enums_1.ResCode.BAD_REQUEST);
        }
    },
    deteleUser: async (req, res) => {
        try {
            const { id } = req.params;
            const deleteUser = await user_service_1.UserService.deleteUserById(id);
            res.json(deleteUser);
        }
        catch (error) {
            console.log("Error", error);
            res.sendStatus(enums_1.ResCode.BAD_REQUEST);
            return;
        }
    },
    updateUser: async (req, res) => {
        try {
            const { id } = req.params;
            const { username } = req.body;
            const user = await user_service_1.UserService.getUserById(id);
            user.username = username;
            await user.save();
            res.sendStatus(enums_1.ResCode.OK).end();
            return;
        }
        catch (error) {
            console.log("Error Update", error);
            res.sendStatus(enums_1.ResCode.BAD_REQUEST);
            return;
        }
    },
    getUserById: async (req, res) => {
        try {
            const id = (0, lodash_1.get)(req, "user._id");
            const users = await user_service_1.UserService.getUserById(id);
            res.status(enums_1.ResCode.OK).json(users);
        }
        catch (error) {
            console.log("Error Update", error);
            res.sendStatus(enums_1.ResCode.BAD_REQUEST);
            return;
        }
    },
};
exports.default = exports.UserController;
