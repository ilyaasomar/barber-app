// @route GET /api/services
// @desc Get all services

import { prisma } from "../config/db.js";

// @access Private
export const getServices = async (req, res) => {
  const userId = req.user.id;
  try {
    const services = await prisma.services.findMany({
      where: { userId },
    });
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @route GET /api/services/:id
// @desc Get a single service by ID
// @access Private
export const getServiceById = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  try {
    const service = await prisma.services.findFirst({
      where: { id, userId },
    });
    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @route POST /api/services
// @desc Create a new service
// @access Private
export const createService = async (req, res) => {
  const userId = req.user.id;
  const { name, description, price } = req.body;
  try {
    // check if service with the same name already exists
    const existingService = await prisma.services.findFirst({
      where: { name },
    });
    if (existingService) {
      return res
        .status(400)
        .json({ error: "Service with this name already exists" });
    }
    const newService = await prisma.services.create({
      data: {
        name,
        description,
        price,
        userId,
      },
    });
    res.status(201).json(newService);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @route PATCH /api/services/:id
// @desc Update a service by ID
// @access Private
export const updateService = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  const { name, description, price } = req.body;
  try {
    // check if service exists
    const existingService = await prisma.services.findFirst({
      where: { id, userId },
    });
    if (!existingService) {
      return res.status(404).json({ error: "Service not found" });
    }
    const updatedService = await prisma.services.update({
      where: { id, userId },
      data: { name, description, price },
    });
    res.status(200).json(updatedService);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @route DELETE /api/services/:id
// @desc Delete a service by ID
// @access Private
export const deleteService = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  try {
    // check if service exists
    const existingService = await prisma.services.findFirst({
      where: { id, userId },
    });
    if (!existingService) {
      return res.status(404).json({ error: "Service not found" });
    }
    await prisma.services.delete({
      where: { id, userId },
    });
    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
