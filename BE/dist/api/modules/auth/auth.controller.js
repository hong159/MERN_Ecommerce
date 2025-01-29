"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const enums_1 = require("../../enums");
const helpers_1 = require("../../helpers");
const auth_service_1 = require("./auth.service");
const user_service_1 = require("../users/user.service");
exports.AuthController = {
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                res.sendStatus(enums_1.ResCode.BAD_REQUEST);
                return;
            }
            const user = await auth_service_1.AuthService.getUserByEmail(email).select("+authentication.salt +authentication.password");
            if (!user) {
                res.sendStatus(enums_1.ResCode.BAD_REQUEST);
                return;
            }
            const expectedHash = helpers_1.AuthHepler.authentication(user.authentication.salt, password);
            if (expectedHash !== user.authentication.password) {
                res.sendStatus(enums_1.ResCode.FORBIDDEN);
                return;
            }
            const salt = helpers_1.AuthHepler.random();
            user.authentication.sessionToken = helpers_1.AuthHepler.authentication(salt, user._id.toString());
            await user.save();
            res.cookie("Libra-Auth", user.authentication.sessionToken, {
                domain: "localhost",
                path: "/",
            });
            res.status(enums_1.ResCode.OK).json(user).end();
            return;
        }
        catch (error) {
            console.log("Error on login: ", error);
            res.status(enums_1.ResCode.BAD_REQUEST);
            return;
        }
    },
    register: async (req, res) => {
        try {
            const { email, password, username } = req.body;
            if (!email || !password || !username) {
                res.status(enums_1.ResCode.BAD_REQUEST).send("Missing required fields");
                return;
            }
            const existingUser = await auth_service_1.AuthService.getUserByEmail(email);
            if (existingUser) {
                res.status(enums_1.ResCode.BAD_REQUEST).send("User already exists");
                return;
            }
            const salt = helpers_1.AuthHepler.random();
            const user = await user_service_1.UserService.createUser({
                email,
                username,
                authentication: {
                    salt,
                    password: helpers_1.AuthHepler.authentication(salt, password),
                },
            });
            res.status(enums_1.ResCode.CREATED).json(user).end();
            return;
        }
        catch (error) {
            console.log("Error on register: ", error);
            res.status(enums_1.ResCode.BAD_REQUEST);
            return;
        }
    },
};
