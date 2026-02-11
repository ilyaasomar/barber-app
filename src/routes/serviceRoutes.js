import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  createService,
  deleteService,
  getServiceById,
  getServices,
  updateService,
} from "../controllers/serviceController.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import {
  createServiceSchema,
  updateServiceSchema,
} from "../validators/serviceValidator.js";
const router = express.Router();

// these routes uses middleware to check if the user is authenticated and has the necessary permissions to access the service routes. The actual implementation of the route handlers will be done in the serviceController.js file, where we will define the logic for handling each of these routes.
router.use(authMiddleware);

router.get("/", getServices);
router.post("/:id", getServiceById);
router.post("/", validateRequest(createServiceSchema), createService);
router.patch("/:id", validateRequest(updateServiceSchema), updateService);
router.delete("/:id", deleteService);

export default router;
