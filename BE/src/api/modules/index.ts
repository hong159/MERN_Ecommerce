// src/api/modules/index.ts
import { Router } from "express";
import authRoutes from "./users/user.route";


const router = Router();

// Gom tất cả các routes vào đây
router.use("/auth", authRoutes);


export default router;