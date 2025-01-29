// src/app.ts
import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from 'cookie-parser';
import { connectDB } from "./config/db";
import { env } from "./config/env";
import router from "./api/modules";
import { ErrorHandle } from "./api/middlewares/errorHandler";

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

// Kết nối database
connectDB();

// Routes
app.use("/api", router);

// Xử lý lỗi tập trung
app.use(ErrorHandle);

export default app;