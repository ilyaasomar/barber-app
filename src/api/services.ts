import { api } from "./axios";

export interface Service {
  name: string;
  description: string;
  price: number;
}

export const getServices = async () => {
  const { data } = await api.get("/services");
  return data;
};

export const createService = async (payload: Service) => {
  console.log(payload);

  const { data } = await api.post("/services", payload);

  return data;
};

export const updateService = async ({
  id,
  payload,
}: {
  id: string;
  payload: Service;
}) => {
  const { data } = await api.patch(`/services/${id}`, payload);
  return data;
};

export const deleteService = async (id: string) => {
  console.log(id);
  const { data } = await api.delete(`/services/${id}`);
  return data;
};
