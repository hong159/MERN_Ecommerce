"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const models_1 = require("../../models");
exports.AuthService = {
    getUserByEmail: (email) => models_1.User.findOne({ email }),
    getUserBySessionToken: (sessionToken) => models_1.User.findOne({
        "authentication.sessionToken": sessionToken,
    }),
};
