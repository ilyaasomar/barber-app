import z from "zod";

export const createAppointmentSchema = z.object({
  customerId: z.string().min(1, "Customer must be selected"),
  serviceId: z.string().min(1, "Service must be selected"),
  date: z.coerce.date(),
  status: z.string("Choose status"),
});

export const updateAppointmentSchema = z.object({
  customerId: z.string().min(1, "Customer must be selected"),
  serviceId: z.string().min(1, "Service must be selected"),
  date: z.coerce.date(),
  status: z.string("Choose status"),
});
