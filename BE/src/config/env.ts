// src/config/env.ts
import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
  PORT: z.string().default("3000"),
  MONGO_URI: z.string().min(1),
  JWT_SECRET: z.string().min(1),
});

export const env = envSchema.parse(process.env);
