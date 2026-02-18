import express from "express";
import { login, logout, register } from "../controllers/authController.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { loginSchema, registerSchema } from "../validators/authValidator.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
const router = express.Router();

// @route  POST /api/auth -> register a new user
router.post("/register", validateRequest(registerSchema), register);
// @route   POST /api/auth -> login a user
router.post("/login", validateRequest(loginSchema), login);
// @route   POST /api/auth -> login a user
router.post("/logout", logout);

// @route   GET /api/auth/me -> it checks is user has cookies or the browser generated it
router.get("/me", authMiddleware, (req, res) => {
  res.json(req.user);
});
export default router;
