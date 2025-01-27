// src/models/user.model.ts
import mongoose from "mongoose";

// Định nghĩa interface cho authentication
interface IAuthentication {
    password: string;
    salt: string;
    sessionToken?: string; // sessionToken có thể không bắt buộc
}

// Định nghĩa interface cho User
export interface IUser {
    username: string;
    email: string;
    authentication: IAuthentication;
}

// Định nghĩa schema cho User
const UserSchema = new mongoose.Schema<IUser>(
    {
        username: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        authentication: {
            password: { type: String, required: true, select: false }, // Không trả về khi query
            salt: { type: String, required: true, select: false },    // Không trả về khi query
            sessionToken: { type: String, select: false },            // Không trả về khi query
        },
    },
    { timestamps: true } // Tự động thêm createdAt và updatedAt
);

// Tạo model từ schema
export const User = mongoose.model<IUser>("User", UserSchema);