// src/api/modules/auth/auth.schema.ts
import { z } from "zod";

export const registerSchema = z.object({
    body: z.object({
        username: z.string().min(3),
        email: z.string().email(),
        password: z.string().min(8),
    })
});

export const loginSchema = z.object({
    body: z.object({
        email: z.string().email(),
        password: z.string().min(8),
    })
});

export type LoginInput = z.infer<typeof loginSchema>['body'];
export type RegisterInput = z.infer<typeof registerSchema>['body'];