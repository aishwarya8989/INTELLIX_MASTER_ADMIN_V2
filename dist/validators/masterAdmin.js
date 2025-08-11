"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMasterAdminSchema = void 0;
const zod_1 = require("zod");
exports.createMasterAdminSchema = zod_1.z.object({
    id: zod_1.z.number().int().positive(),
    email: zod_1.z
        .string()
        .trim()
        .email("Invalid email address")
        .max(255, "Email must be at most 255 characters"),
    password: zod_1.z
        .string()
        .min(6, "Password must be at least 6 characters long")
        .max(100, "Password must be at most 100 characters long"),
    contact_no: zod_1.z
        .string({
        required_error: 'Mobile number is required.',
        invalid_type_error: 'Mobile number must be a string.',
    })
        .regex(/^[6-9][0-9]{9}$/, 'Mobile number must be exactly 10 digits and start with 6, 7, 8, or 9 (only digits allowed).').refine((val) => !/^(\d)\1{9}$/.test(val), {
        message: 'Mobile number cannot have all digits the same (e.g., 6666666666).',
    }),
    token: zod_1.z.string().optional().nullable(),
});
