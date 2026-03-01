import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { config } from "dotenv";
import { connectDB, disconnectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import invoiceRoutes from "./routes/invoiceRoutes.js";
import paymentMethodRoutes from "./routes/paymentMethodRoutes.js";
import appointmentRoutes from "./routes/appointmentRoute.js";
import publicAppointmentRoutes from "./routes/publicAppointmentRoute.js";

config();
connectDB();
const app = express();

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    // origin: "http://localhost:5173", // after i deploy i will change this to my domain
    origin: "https://barber-appsw.vercel.app",
    credentials: true, // 👈 must be true
  }),
);
// api routes
app.use("/api/auth", authRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/payment-methods", paymentMethodRoutes);
app.use("/api/invoices", invoiceRoutes);
// this one comes from the web application
app.use("/api/app/appointments", appointmentRoutes);
// other hand this comes from the website
app.use("/api/public/appointments", publicAppointmentRoutes);

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () =>
  console.log(`Server is listening at port: http://localhost:${PORT}`),
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on("uncaughtException", async (err) => {
  console.error("Uncaught Exception:", err);
  await disconnectDB();
  process.exit(1);
});

// Graceful shutdown
process.on("SIGTERM", async () => {
  console.log("SIGTERM received, shutting down gracefully");
  server.close(async () => {
    await disconnectDB();
    process.exit(0);
  });
});
