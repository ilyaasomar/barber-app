import z from "zod";

export const createInvoiceSchema = z.object({
  customerId: z.string("customer must be selected").uuid(),
  serviceId: z.string("Service must be selected").uuid(),
  paymentMethodId: z.string("Payment method must be selected").uuid(),
  amount: z
    .number({ message: "Amount must be a number" })
    .positive("Amount must be positive number"),
  status: z.string("Status must be selected"),
});

export const updateInvoiceSchema = z.object({
  customerId: z.string("customer must be selected").uuid(),
  serviceId: z.string("Service must be selected").uuid(),
  paymentMethodId: z.string("Payment method must be selected").uuid(),
  amount: z
    .number({ message: "Amount must be a number" })
    .positive("Amount must be positive number"),
  status: z.string("Status must be selected"),
});
