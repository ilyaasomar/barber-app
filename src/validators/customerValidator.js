import z from "zod";

export const createCustomerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z
    .string()
    .trim()
    .min(2, "Email is required")
    .email("Please provide a valid email")
    .toLowerCase(),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 characters long")
    .max(15, "Phone number must be at most 15 characters long")
    .optional(),
});

export const updateCustomerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z
    .string()
    .trim()
    .min(2, "Email is required")
    .email("Please provide a valid email")
    .toLowerCase(),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 characters long")
    .max(15, "Phone number must be at most 15 characters long")
    .optional(),
});
