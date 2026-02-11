import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  createPaymentMethod,
  deletePaymentMethod,
  getPaymentMethodById,
  getPaymentMethods,
  updatePaymentMethod,
} from "../controllers/paymentMethodController.js";
import {
  createPaymentMethodSchema,
  updatePaymentMethodSchema,
} from "../validators/paymentMethodValidator.js";
import { validateRequest } from "../middlewares/validateRequest.js";
const router = express.Router();

// middleware
router.use(authMiddleware);
router.get("/", getPaymentMethods);
router.get("/:id", getPaymentMethodById);
router.post(
  "/",
  validateRequest(createPaymentMethodSchema),
  createPaymentMethod,
);
router.patch(
  "/:id",
  validateRequest(updatePaymentMethodSchema),
  updatePaymentMethod,
);
router.delete("/:id", deletePaymentMethod);
export default router;
