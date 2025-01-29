// src/api/modules/index.ts
import { Router } from "express";
import userRoutes from "./users/user.route";
import authRoutes from "./auth/auth.route";

const router = Router();

// Gom tất cả các routes vào đây
router.use("/users", userRoutes);
router.use("/auth", authRoutes);

export default router;
