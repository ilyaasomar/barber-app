import express from "express";
import {
  createCustomer,
  deleteCustomer,
  getCustomerById,
  getCustomers,
  updateCustomer,
} from "../controllers/customerController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import {
  createCustomerSchema,
  updateCustomerSchema,
} from "../validators/customerValidator.js";
const router = express.Router();

// All routes in this router will require authentication
router.use(authMiddleware);

router.get("/", getCustomers);
router.post("/:id", getCustomerById);
router.post("/", validateRequest(createCustomerSchema), createCustomer);
router.patch("/:id", validateRequest(updateCustomerSchema), updateCustomer);
router.delete("/:id", deleteCustomer);

export default router;
