import express from "express";
import { createAppointment } from "../controllers/publicAppointmentController.js";

const router = express.Router();
// this is public route request comes from the website
router.post("/", createAppointment);

export default router;
