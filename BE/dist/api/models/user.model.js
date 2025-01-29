"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
// src/models/user.model.ts
const mongoose_1 = __importDefault(require("mongoose"));
// Định nghĩa schema cho User
const UserSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    authentication: {
        password: { type: String, required: true, select: false }, // Không trả về khi query
        salt: { type: String, required: true, select: false }, // Không trả về khi query
        sessionToken: { type: String, select: false }, // Không trả về khi query
    },
}, { timestamps: true } // Tự động thêm createdAt và updatedAt
);
// Tạo model từ schema
exports.User = mongoose_1.default.model("User", UserSchema);
