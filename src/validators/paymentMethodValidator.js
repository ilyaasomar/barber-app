import z from "zod";
export const createPaymentMethodSchema = z.object({
  type: z.enum(["CASH", "BANK", "TWINT"], {
    message: "Type must be one of: CASH, BANK, TWINT",
  }),
  name: z.string().min(2, "Name must be at least 2 characters long"),
});

export const updatePaymentMethodSchema = z.object({
  type: z.enum(["CASH", "BANK", "TWINT"], {
    message: "Type must be one of: CASH, BANK, TWINT",
  }),
  name: z.string().min(2, "Name must be at least 2 characters long"),
});
