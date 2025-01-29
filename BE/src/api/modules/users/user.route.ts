// src/api/modules/auth/auth.route.ts
import express from "express";
import { isAuthenticated, isOwner } from "../../middlewares";
import { UserController } from "./user.controller";

const router = express.Router();

router.get("/", isAuthenticated, UserController.getUserById);
router.patch("/:id", isAuthenticated, isOwner, UserController.updateUser);
router.delete("/:id", isAuthenticated, isOwner, UserController.deteleUser);
export default router;
