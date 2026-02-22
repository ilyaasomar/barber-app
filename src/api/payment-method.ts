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
