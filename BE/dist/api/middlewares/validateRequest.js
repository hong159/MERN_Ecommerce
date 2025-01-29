"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const zod_1 = require("zod");
const enums_1 = require("../enums");
/**
 * Middleware validate request dựa trên schema Zod.
 * @param schema - Schema Zod để validate (body, query, params).
 */
const validateRequest = (schema) => async (req, res, next) => {
    try {
        // Validate request body, query, và params
        await schema.parseAsync({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        next(); // Nếu hợp lệ, chuyển sang middleware tiếp theo
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            // Nếu có lỗi validation, trả về response với thông báo lỗi chi tiết
            res.status(enums_1.ResCode.BAD_REQUEST).json({
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
exports.validateRequest = validateRequest;
