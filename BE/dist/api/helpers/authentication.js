"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthHepler = void 0;
const crypto_1 = __importDefault(require("crypto"));
const SECRET = "HONGDINH-REST-API";
exports.AuthHepler = {
    random: () => crypto_1.default.randomBytes(128).toString("base64"),
    authentication: (salt, password) => {
        return crypto_1.default.createHmac("sha256", [salt, password].join("/")).update(SECRET).digest("hex");
    },
};
