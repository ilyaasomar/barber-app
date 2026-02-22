// @route GET /api/payment-methods
// @desc Get all payment methods for the authenticated user

import { prisma } from "../config/db.js";

// @access Private
export const getPaymentMethods = async (req, res) => {
  const userId = req.user.id;
  try {
    const paymentMethods = await prisma.paymentMethod.findMany({
      where: { userId },
    });
    res.status(200).json(paymentMethods);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @route GET /api/payment-methods/:id
// @desc Get a single payment method by ID
// @access Private
export const getPaymentMethodById = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  try {
    const paymentMethod = await prisma.paymentMethod.findUnique({
      where: { id, userId },
    });
    if (!paymentMethod) {
      return res.status(404).json({ error: "Payment method not found" });
    }
    res.status(200).json(paymentMethod);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @route POST /api/payment-methods
// @desc Create a new payment method
// @access Private
export const createPaymentMethod = async (req, res) => {
  const userId = req.user.id;
  const { type, name } = req.body;
  try {
    // check if payment method already exist
    const existingPaymentMethod = await prisma.paymentMethod.findFirst({
      where: { type, name, userId },
    });
    if (existingPaymentMethod) {
      return res.status(400).json({ error: "Payment method already exists" });
    }
    const paymentMethod = await prisma.paymentMethod.create({
      data: { type, name, userId },
    });
    res
      .status(201)
      .json({
        status: "success",
        message: "Payment method created!",
        data: paymentMethod,
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @route PATCH /api/payment-methods/:id
// @desc Update a payment method by ID
// @access Private
export const updatePaymentMethod = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  const { type, name } = req.body;
  try {
    // check if payment method exist
    const existingPaymentMethod = await prisma.paymentMethod.findUnique({
      where: { id, userId },
    });
    if (!existingPaymentMethod) {
      return res.status(404).json({ error: "Payment method not found" });
    }
    const updatedPaymentMethod = await prisma.paymentMethod.update({
      where: { id, userId },
      data: { type, name },
    });
    res.status(200).json(updatedPaymentMethod);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @route DELETE /api/payment-methods/:id
// @desc Delete a payment method by ID
// @access Private
export const deletePaymentMethod = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  try {
    // check if payment method exist
    const existingPaymentMethod = await prisma.paymentMethod.findUnique({
      where: { id, userId },
    });
    if (!existingPaymentMethod) {
      return res.status(404).json({ error: "Payment method not found" });
    }
    await prisma.paymentMethod.delete({
      where: { id, userId },
    });
    res.status(200).json({ message: "Payment method deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
