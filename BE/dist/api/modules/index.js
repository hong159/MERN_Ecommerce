"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/api/modules/index.ts
const express_1 = require("express");
const user_route_1 = __importDefault(require("./users/user.route"));
const auth_route_1 = __importDefault(require("./auth/auth.route"));
const router = (0, express_1.Router)();
// Gom tất cả các routes vào đây
router.use("/users", user_route_1.default);
router.use("/auth", auth_route_1.default);
exports.default = router;
