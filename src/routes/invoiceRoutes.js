import express from "express";

import { validateRequest } from "../middlewares/validateRequest.js";

import {
  createInvoiceSchema,
  updateInvoiceSchema,
} from "../validators/InvoiceValidator.js";
import {
  createInvoice,
  deleteInvoice,
  getInvoiceById,
  getInvoices,
  updateInvoice,
} from "../controllers/invoiceController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
const router = express.Router();

// these routes uses middleware to check if the user is authenticated and has the necessary permissions to access the service routes. The actual implementation of the route handlers will be done in the serviceController.js file, where we will define the logic for handling each of these routes.
router.use(authMiddleware);

router.get("/", getInvoices);
router.get("/:id", getInvoiceById);
router.post("/", validateRequest(createInvoiceSchema), createInvoice);
router.patch("/:id", validateRequest(updateInvoiceSchema), updateInvoice);
router.delete("/:id", deleteInvoice);

export default router;
