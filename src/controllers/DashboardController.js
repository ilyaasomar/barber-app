import { prisma } from "../config/db.js";
export const getDashboardData = async (req, res) => {
  const userId = req.user.id;
  try {
    // user name
    const user = await prisma.user.findUnique({ where: { id: userId } });

    //sales invoice
    const salesInvoice = await prisma.salesInvoice.findMany({
      where: { userId: userId },
      include: { customer: true, paymentMethod: true, service: true },
    });
    const totalRevenue = salesInvoice.reduce((sum, rev) => rev.amount + sum, 0);
    const lastTenTransactions = salesInvoice.slice(0, 10);

    // appointments
    const appointments = await prisma.appointment.count({
      where: { userId: userId },
    });

    // customers
    const customers = await prisma.customer.count({
      where: { userId: userId },
    });

    // services
    const services = await prisma.services.count({
      where: { userId: userId },
    });

    res.status(200).json({
      user_data: user,
      total_revenue: totalRevenue,
      total_appointments: appointments,
      total_customers: customers,
      total_services: services,
      last_transactions: lastTenTransactions,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching dashboard data", error: error.message });
  }
};
