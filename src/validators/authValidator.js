import z from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z
    .string()
    .trim()
    .min(2, "Email is required")
    .email("Please provide a valid email")
    .toLowerCase(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(10, "Password must be at most 10 characters"),
});

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(2, "Email is required")
    .email("Please provide a valid email")
    .toLowerCase(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(10, "Password must be at most 10 characters long"),
});
