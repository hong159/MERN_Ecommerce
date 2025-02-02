// src/api/middlewares/validateRequest.ts
import express from "express";
import { AnyZodObject, ZodError } from "zod";
import { ResCode } from "../shared/enums";

/**
 * Middleware validate request dựa trên schema Zod.
 * @param schema - Schema Zod để validate (body, query, params).
 */
export const validateRequest =
  (schema: AnyZodObject) =>
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    try {
      // Validate request body, query, và params
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next(); // Nếu hợp lệ, chuyển sang middleware tiếp theo
    } catch (error) {
      if (error instanceof ZodError) {
        // Nếu có lỗi validation, trả về response với thông báo lỗi chi tiết
        res.status(ResCode.BAD_REQUEST).json({
          success: false,
          errors: error.errors.map((err) => ({
            path: err.path.join("."), // Đường dẫn đến trường bị lỗi
            message: err.message, // Thông báo lỗi
          })),
        });
        return;
      }
      // Nếu lỗi không phải ZodError, chuyển sang middleware xử lý lỗi tập trung
      next(error);
    }
  };
