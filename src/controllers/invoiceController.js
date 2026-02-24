import { prisma } from "../config/db.js";

// @route GET /api/sales-invoice
// @desc Get all sales invoices
export const getInvoices = async (req, res) => {
  const userId = req.user.id;
  try {
    const invoiceData = await prisma.salesInvoice.findMany({
      where: { userId: userId },
      include: {
        customer: true,
        service: true,
        paymentMethod: true,
      },
    });
    const customerData = await prisma.customer.findMany({
      where: { userId: userId },
    });
    const serviceData = await prisma.services.findMany({
      where: { userId: userId },
    });
    const paymentMethodData = await prisma.paymentMethod.findMany({
      where: { userId: userId },
    });
    res.status(200).json({
      invoice_data: invoiceData,
      customer_data: customerData,
      service_data: serviceData,
      payment_method_data: paymentMethodData,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error fetching invoice", error: error.message });
  }
};

// @route GET /api/sales-invoice/:id
// @desc Get single sales invoices
export const getInvoiceById = async (req, res) => {
  const userId = req.user.id;
  const { id } = await req.params;
  console.log("here is the id", id);

  try {
    const invoiceData = await prisma.salesInvoice.findUnique({
      where: { id: id, userId: userId },
    });
    if (!invoiceData) {
      return res.status(401).json({ message: "Data not found" });
    }
    res.status(201).json(invoiceData);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error:", error });
  }
};

// @route POST /api/sales-invoice
// @ create sales invoices
export const createInvoice = async (req, res) => {
  const userId = req.user.id;
  const { customerId, serviceId, paymentMethodId, amount } = req.body;
  const currentDate = new Date();
  const todaysDate = currentDate.toLocaleDateString();
  console.log("today's date is :", todaysDate);
  try {
    // check if this transaction already exist
    const isExistCustomerData = await prisma.salesInvoice.findFirst({
      where: {
        customerId: customerId,
        serviceId: serviceId,
      },
      //   orderBy: "desc",
    });
    if (isExistCustomerData) {
      const createdAt = isExistCustomerData.createdAt;
      const lastPayDate = createdAt.toLocaleDateString();
      //   console.log("last day he paid:", lastPayDate);
      //   if last time paid date === current time paid date means he paid today.
      if (todaysDate === lastPayDate) {
        return res
          .status(401)
          .json({ message: "This transaction already exist" });
      }
    }

    const newInvoice = await prisma.salesInvoice.create({
      data: {
        customerId,
        serviceId,
        paymentMethodId,
        amount,
        userId: userId,
      },
    });
    res
      .status(201)
      .json({ message: "Invoice created successfully!", data: newInvoice });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error fetching customers", error: error.message });
  }
};

// @route PATCH /api/sales-invoice/:id
// @ update sales invoices
export const updateInvoice = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const { customerId, serviceId, paymentMethodId, amount } = req.body;
  console.log(id);
  try {
    // check if this transaction already exist
    const isExistCustomerData = await prisma.salesInvoice.findUnique({
      where: {
        id: id,
        userId: userId,
      },
    });
    if (!isExistCustomerData) {
      return res.status(401).json({ message: "This transaction not found" });
    }
    const updatedInvoice = await prisma.salesInvoice.update({
      where: { id: id },
      data: {
        customerId,
        serviceId,
        paymentMethodId,
        amount,
        userId: userId,
      },
    });
    res
      .status(201)
      .json({ message: "Invoice updated successfully!", data: updatedInvoice });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error fetching customers", error: error.message });
  }
};

// @route DELETE /api/sales-invoice/:id
// @ delete sales invoices
export const deleteInvoice = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  try {
    const invoice = await prisma.salesInvoice.findUnique({
      where: { id: id, userId: userId },
    });
    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }
    // delete the invoice
    await prisma.salesInvoice.delete({
      where: { id: id },
    });
    res.status(200).json({ message: "Invoice deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting customer", error: error.message });
  }
};
