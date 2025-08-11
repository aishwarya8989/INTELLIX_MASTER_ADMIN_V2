"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instAdminCreateSchema = void 0;
const zod_1 = require("zod");
exports.instAdminCreateSchema = zod_1.z.object({
    id: zod_1.z.number().int().positive(),
    name: zod_1.z
        .string()
        .min(1, { message: "Name is required" })
        .max(200, { message: "Name must be at most 200 characters" })
        .trim(),
    email: zod_1.z
        .string()
        .min(1, { message: "Email is required" })
        .email({ message: "Enter a valid email address" })
        .trim()
        .toLowerCase(),
    password: zod_1.z
        .string()
        .min(8, { message: "Password must be at least 8 characters" })
        .max(128, { message: "Password is too long" })
        .refine((pw) => /[a-z]/.test(pw) &&
        /[A-Z]/.test(pw) &&
        /[0-9]/.test(pw) &&
        /[^A-Za-z0-9]/.test(pw), {
        message: "Password must include lowercase, uppercase, number and special character",
    }),
    instituteId: zod_1.z
        .number({ invalid_type_error: "Institute ID must be a number" })
        .int({ message: "Institute ID must be an integer" })
        .positive({ message: "Institute ID must be a positive number" }),
});
