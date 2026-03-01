import { prisma } from "../config/db.js";

export const getAppointments = async (req, res) => {
  const userId = req.user.id;
  try {
    const appointmentData = await prisma.appointment.findMany({
      where: { userId: userId },
      include: {
        customer: true,
        service: true,
      },
    });

    // i was preparing for request that comes from the website
    // and disabling the time already assigned other person.
    // const currentDate = new Date();
    // console.log(currentDate);

    // const occupiedDate = appointmentData.filter(
    //   (data) => data.date <= currentDate,
    // );
    // console.log("occupied ates are", occupiedDate);

    const customerData = await prisma.customer.findMany({
      where: { userId: userId },
    });
    const serviceData = await prisma.services.findMany({
      where: { userId: userId },
    });

    res.status(200).json({
      appointment_data: appointmentData,
      customer_data: customerData,
      service_data: serviceData,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error fetching invoice", error: error.message });
  }
};

export const getAppointmentById = async (req, res) => {};

// @route create  POST /api/appointments

export const createAppointment = async (req, res) => {
  const { customerId, serviceId, date, status } = req.body;
  const userId = req.user?.id || null;

  try {
    if (!customerId) {
      return res.status(400).json({ message: "Customer ID is required" });
    }

    const appointmentDate = new Date(date);

    // Start and end of the appointment day
    const startOfDay = new Date(
      appointmentDate.getFullYear(),
      appointmentDate.getMonth(),
      appointmentDate.getDate(),
    );

    const endOfDay = new Date(
      appointmentDate.getFullYear(),
      appointmentDate.getMonth(),
      appointmentDate.getDate(),
      23,
      59,
      59,
      999,
    );

    // Check if the customer already has an appointment on this date
    const appointmentExist = await prisma.appointment.findFirst({
      where: {
        customerId: customerId,
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });

    if (appointmentExist) {
      return res.status(400).json({
        message: "This customer already has an appointment on this date",
      });
    }

    // Create the new appointment
    const newAppointment = await prisma.appointment.create({
      data: {
        customerId: customerId,
        serviceId: serviceId || null,
        date: appointmentDate,
        status: status || "waiting",
        userId: userId,
      },
    });

    res.status(201).json({
      status: "success",
      message: "Appointment created successfully!",
      data: {
        appointment: newAppointment,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error creating appointment",
      error: error.message,
    });
  }
};

export const updateAppointment = async (req, res) => {
  const { customerId, serviceId, date, status } = req.body;

  const { id } = req.params;
  const userId = req.user.id;
  try {
    const appointmentExist = await prisma.appointment.findFirst({
      where: { id: id },
    });

    if (!appointmentExist) {
      return res.status(401).json({ message: "Appointment is not found" });
    }

    const newAppointment = await prisma.appointment.update({
      where: { id: id },
      data: {
        customerId: customerId || null,
        serviceId: serviceId || null,
        date,
        status: status,
        userId: userId || null,
      },
    });
    res.status(201).json({
      status: "success",
      message: "Appointment updated successfully!",
      data: {
        appointment: newAppointment,
      },
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error updating appointment", error: error.message });
  }
};
export const deleteAppointment = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  try {
    const appointment = await prisma.appointment.findUnique({
      where: { id: id, userId: userId },
    });
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    // delete the invoice
    await prisma.appointment.delete({
      where: { id: id },
    });
    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting appointment", error: error.message });
  }
};
