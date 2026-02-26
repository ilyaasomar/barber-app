import { api } from "./axios";

export interface Appointment {
  customerId: string;
  serviceId: string;
  date: Date;
  status: string;
}

export const getAppointments = async () => {
  const { data } = await api.get("/app/appointments");
  return data;
};

export const createAppointment = async (payload: Appointment) => {
  console.log(payload);

  const { data } = await api.post("/app/appointments", payload);

  return data;
};

export const updateAppointment = async ({
  id,
  payload,
}: {
  id: string;
  payload: Appointment;
}) => {
  console.log(payload);
  const { data } = await api.patch(`/app/appointments/${id}`, payload);
  console.log(data);
  return data;
};

export const deleteAppointment = async (id: string) => {
  console.log(id);
  const { data } = await api.delete(`/app/appointments/${id}`);
  return data;
};
