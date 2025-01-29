"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const enums_1 = require("../enums");
const lodash_1 = require("lodash");
const auth_service_1 = require("../modules/auth/auth.service");
const isAuthenticated = async (req, res, next) => {
    try {
        const sessionToken = req.cookies["Libra-Auth"];
        if (!sessionToken) {
            console.log("No session token provided");
            res.status(enums_1.ResCode.FORBIDDEN).json({ message: "Unauthorized: No session token provided" });
            return;
        }
        const existingUser = await auth_service_1.AuthService.getUserBySessionToken(sessionToken);
        if (!existingUser) {
            console.log("Invalid session token");
            res.status(enums_1.ResCode.FORBIDDEN).json({ message: "Unauthorized: Invalid session token" });
            return;
        }
        (0, lodash_1.merge)(req, { user: existingUser });
        console.log(`User authenticated: ${existingUser.username}`);
        next();
    }
    catch (error) {
        console.error("Error on isAuthenticated: ", error);
        next(error);
    }
};
exports.isAuthenticated = isAuthenticated;
