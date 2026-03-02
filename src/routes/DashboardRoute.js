import express from "express";
import { getDashboardData } from "../controllers/DashboardController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
const router = express.Router();
router.use(authMiddleware);
router.get("/", getDashboardData);

export default router;
