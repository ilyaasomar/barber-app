import { api } from "./axios";

export interface PaymentMethodInterface {
  type: string;
  name: string;
}
export const getPaymentMethods = async () => {
  const { data } = await api.get("/payment-methods");
  console.log(data);
  return data;
};

// create
export const createPaymentMethod = async (payload: PaymentMethodInterface) => {
  const { data } = await api.post("/payment-methods", payload);
  return data;
};

// update
export const updatePaymentMethod = async ({
  id,
  payload,
}: {
  id: string;
  payload: PaymentMethodInterface;
}) => {
  console.log(id, payload);
  const { data } = await api.patch(`/payment-methods/${id}`, payload);
  return data;
};

// delete
export const deletePaymentMethod = async (id: string) => {
  const { data } = await api.delete(`/payment-methods/${id}`);
  return data;
};
