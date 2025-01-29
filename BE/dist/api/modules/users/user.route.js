"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/api/modules/auth/auth.route.ts
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("../../middlewares");
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
router.get("/", middlewares_1.isAuthenticated, user_controller_1.UserController.getUserById);
router.patch("/:id", middlewares_1.isAuthenticated, middlewares_1.isOwner, user_controller_1.UserController.updateUser);
router.delete("/:id", middlewares_1.isAuthenticated, middlewares_1.isOwner, user_controller_1.UserController.deteleUser);
exports.default = router;
