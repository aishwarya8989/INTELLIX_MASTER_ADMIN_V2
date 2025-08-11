import { z } from "zod";

export const instAdminCreateSchema = z.object({
    id: z.number().int().positive(),
    name: z
        .string()
        .min(1, { message: "Name is required" })
        .max(200, { message: "Name must be at most 200 characters" })
        .trim(),

    email: z
        .string()
        .min(1, { message: "Email is required" })
        .email({ message: "Enter a valid email address" })
        .trim()
        .toLowerCase(),

    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters" })
        .max(128, { message: "Password is too long" })
        .refine(
            (pw) =>
                /[a-z]/.test(pw) &&
                /[A-Z]/.test(pw) &&
                /[0-9]/.test(pw) &&
                /[^A-Za-z0-9]/.test(pw),
            {
                message:
                    "Password must include lowercase, uppercase, number and special character",
            }
        ),

    instituteId: z
        .number({ invalid_type_error: "Institute ID must be a number" })
        .int({ message: "Institute ID must be an integer" })
        .positive({ message: "Institute ID must be a positive number" }),
});


export type InstAdminCreateInput = z.infer<typeof instAdminCreateSchema>;
