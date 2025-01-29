// src/api/modules/auth/auth.route.ts
import express from "express";
import { AuthController } from "./auth.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { loginSchema, registerSchema } from "./auth.schema";

const router = express.Router();

router.post("/register", validateRequest(registerSchema), AuthController.register);
router.post("/login", validateRequest(loginSchema), AuthController.login);

export default router;
