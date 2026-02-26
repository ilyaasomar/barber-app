import { prisma } from "../config/db.js";

// @route create  POST /api/appointments
export const createAppointment = async (req, res) => {
  // const { email, name, phone, customerId, serviceId, date, time } = req.body;
  // try {
  //   // first check it there is customer id
  //   // if there no customer id and email means the person sent from website
  //   if (!customerId && !serviceId && name && email && phone) {
  //     // it means request comes from website not web app
  //     //   first create the customer and then apply appointment
  //     const customer = await prisma.customer.create({
  //       data: {
  //         name,
  //         email,
  //         phone,
  //       },
  //     });
  //     //   now create the appointment
  //     const appointment = await prisma.appointment.create({
  //       data: {
  //         customerId: customer.id,
  //         date,
  //         time,
  //         status: "waiting",
  //       },
  //     });
  //     return res.status(201).json({
  //       status: "success",
  //       message: "Your appointment has sent!. check you email",
  //       data: appointment,
  //     });
  //   } else {
  //     // means it comes from the web not from the website
  //   }
  // } catch (error) {}
};
