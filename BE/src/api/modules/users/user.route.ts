// src/api/modules/auth/auth.route.ts
import express from "express";
import { UserController } from "./user.controller";
import { isAuthenticated } from "../../middlewares/isAuthentication";
import { isOwner } from "../../middlewares/isOwner";

const router = express.Router();

router.get("/", isAuthenticated, UserController.getUserById);
router.delete("/:id", isAuthenticated, isOwner, UserController.deteleUser);
router.patch("/:id", isAuthenticated, isOwner, UserController.updateUser);

export default router;
