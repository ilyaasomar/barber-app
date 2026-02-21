import { prisma } from "../config/db.js";

// @route  GET /api/customers
export const getCustomers = async (req, res) => {
  // const userId = req.user.id; // Get the authenticated user's ID from the request
  try {
    const customers = await prisma.customer.findMany({
      // where: { userId: userId },
    });
    res.status(200).json(customers);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching customers", error: error.message });
  }
};

// @route  POST /api/customers/:id
export const getCustomerById = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id; // Get the authenticated user's ID from the request
  try {
    const customer = await prisma.customer.findUnique({
      where: { id: id, userId: userId },
    });
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json(customer);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching customer", error: error.message });
  }
};

// @route  POST /api/customers
export const createCustomer = async (req, res) => {
  const { name, email, phone } = req.body;
  const userId = req.user.id; // Get the authenticated user's ID from the request
  try {
    // check if the customer already exists
    const customerExist = await prisma.customer.findUnique({
      where: { email: email },
    });
    if (customerExist) {
      return res.status(400).json({ message: "Customer already exists" });
    }
    const newCustomer = await prisma.customer.create({
      data: {
        name,
        email,
        phone,
        userId: userId || null,
      },
    });
    res.status(201).json({
      status: "success",
      message: "Customer created successfully!",
      data: {
        customer: newCustomer,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating customer", error: error.message });
  }
};

// @route  PATCH /api/customers/:id
export const updateCustomer = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  const userId = req.user.id;
  try {
    // check if the customer exists and belongs to the authenticated user
    const customer = await prisma.customer.findUnique({
      where: { id: id, userId: userId },
    });
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    const updatedCustomer = await prisma.customer.update({
      where: { id: id },
      data: {
        name,
        email,
        phone,
      },
    });
    res.status(200).json({
      status: "success",
      message: "Customer updated successfully!",
      data: {
        customer: updatedCustomer,
      },
    });
  } catch (error) {
    console.log({ message: error });
    res
      .status(500)
      .json({ message: "Error updating customer", error: error.message });
  }
};

// @route  DELETE /api/customers/:id

export const deleteCustomer = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  try {
    const customer = await prisma.customer.findUnique({
      where: { id: id, userId: userId },
    });
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    // delete the customer
    await prisma.customer.delete({
      where: { id: id },
    });
    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting customer", error: error.message });
  }
};
