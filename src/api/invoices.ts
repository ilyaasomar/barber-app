import { api } from "./axios";

export interface Invoice {
  customerId: string;
  serviceId: string;
  paymentMethodId: string;
  amount: number;
  status: string;
}

export const getInvoices = async () => {
  const { data } = await api.get("/invoices");
  return data;
};

export const createInvoice = async (payload: Invoice) => {
  console.log(payload);

  const { data } = await api.post("/invoices", payload);

  return data;
};

export const updateInvoice = async ({
  id,
  payload,
}: {
  id: string;
  payload: Invoice;
}) => {
  const { data } = await api.patch(`/invoices/${id}`, payload);
  return data;
};

export const deleteInvoice = async (id: string) => {
  console.log(id);
  const { data } = await api.delete(`/invoices/${id}`);
  return data;
};
