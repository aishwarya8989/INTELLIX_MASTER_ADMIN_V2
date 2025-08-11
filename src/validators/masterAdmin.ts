import { z } from "zod";

export const createMasterAdminSchema = z.object({
    id: z.number().int().positive(),

    email: z
        .string()
        .trim()
        .email("Invalid email address")
        .max(255, "Email must be at most 255 characters"),

    password: z
        .string()
        .min(6, "Password must be at least 6 characters long")
        .max(100, "Password must be at most 100 characters long"),

    contact_no: z
        .string({
            required_error: 'Mobile number is required.',
            invalid_type_error: 'Mobile number must be a string.',
        })
        .regex(
            /^[6-9][0-9]{9}$/,
            'Mobile number must be exactly 10 digits and start with 6, 7, 8, or 9 (only digits allowed).'
        ).refine(
            (val) => !/^(\d)\1{9}$/.test(val),
            {
                message: 'Mobile number cannot have all digits the same (e.g., 6666666666).',
            }
        ),

    token: z.string().optional().nullable(),
});
