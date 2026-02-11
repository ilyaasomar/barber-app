import z from "zod";
export const createServiceSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  description: z.string().optional(),
  price: z
    .number({
      message: "Amount must be a number",
    })
    .positive("Price must be a positive number"),
});

export const updateServiceSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  description: z.string().optional(),
  price: z
    .number({
      message: "Amount must be a number",
    })
    .positive("Price must be a positive number"),
});
