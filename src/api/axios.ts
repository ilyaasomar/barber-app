import axios from "axios";
// export const api = axios.create({
//   // baseURL: "http://localhost:8000/api", //after deploy i have to change to the backend url

//   baseURL: "https://barberappsw-backend.up.railway.app/api",
//   withCredentials: true,
// });

export const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

// these are for storing token to the localStorage but now i am using http-cookies

// add jwt Bearer token by using localstorage
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token && config.headers) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   // console.log(config);
//   return config;
// });

// // Add response interceptor to handle 401s globally
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem("token");
//     }
//     return Promise.reject(error);
//   },
// );
