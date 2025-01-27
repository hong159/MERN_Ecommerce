// src/api/modules/auth/auth.route.ts
import express from "express";
import {UserController} from "./user.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { loginSchema, registerSchema } from "./user.schema";
import { isAuthenticated } from "../../middlewares/isAuthentication";
import { isOwner } from "../../middlewares/isOwner";

const router = express.Router();

router.post("/register", validateRequest(registerSchema), UserController.register);
router.post("/login", validateRequest(loginSchema), UserController.login);
router.get("/users", isAuthenticated, UserController.getAllUsers);
router.delete('/users/:id', isAuthenticated, isOwner, UserController.deteleUser);
router.patch('/users/:id', isAuthenticated, isOwner, UserController.updateUser);

export default router;