import { api } from "./axios";

interface RegisterUser {
  name: string;
  email: string;
  password: string;
}
interface LoginUser {
  email: string;
  password: string;
}

export const registerUser = async (payload: RegisterUser) => {
  const { data } = await api.post("/auth/register", payload);
  return data;
};

export const loginUser = async (payload: LoginUser) => {
  const { data } = await api.post("/auth/login", payload);
  return data;
};

export const logoutUser = async () => {
  const { data } = await api.post("/auth/logout");
  return data;
};

export const getMe = async () => {
  const res = await api.get("/auth/me");
  return res.data;
};
