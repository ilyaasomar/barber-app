import { api } from "./axios";

export interface Customer {
  name: string;
  email: string;
  phone: string;
}

export const getCustomers = async () => {
  const { data } = await api.get("/customers");
  return data;
};

export const createCustomer = async (payload: Customer) => {
  const { data } = await api.post("/customers", payload);
  return data;
};

export const updateCustomer = async ({
  id,
  payload,
}: {
  id: string;
  payload: Customer;
}) => {
  const { data } = await api.patch(`/customers/${id}`, payload);
  return data;
};

export const deleteCustomer = async ({ id }: { id: string }) => {
  const { data } = await api.delete(`/customers/${id}`);
  return data;
};
