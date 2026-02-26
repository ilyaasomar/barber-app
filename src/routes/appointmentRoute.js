import express from "express";

import { validateRequest } from "../middlewares/validateRequest.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  createAppointmentSchema,
  updateAppointmentSchema,
} from "../validators/appointmentValidator.js";
import {
  createAppointment,
  deleteAppointment,
  getAppointmentById,
  getAppointments,
  updateAppointment,
} from "../controllers/AppointmentController.js";
const router = express.Router();

// these routes uses middleware to check if the user is authenticated and has the necessary permissions to access the service routes. The actual implementation of the route handlers will be done in the serviceController.js file, where we will define the logic for handling each of these routes.
router.use(authMiddleware);

router.get("/", getAppointments);
router.get("/:id", getAppointmentById);
router.post("/", validateRequest(createAppointmentSchema), createAppointment);
router.patch(
  "/:id",
  validateRequest(updateAppointmentSchema),
  updateAppointment,
);
router.delete("/:id", deleteAppointment);

export default router;
