"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { styles } from "@/styles";

interface AppointmentDataProps {
  id: string;
  customerId: string;
  customer: { id: string; name: string; email: string; phone: string };
  serviceId: string;
  service: { id: string; name: string; description: string; price: number };
  date: Date;
  status: string;
}
import { useState } from "react";
import { toast } from "sonner";
import { DataTable } from "@/components/reusables/data-table";
import { columns } from "./components/Column";
import { createAppointment, getAppointments } from "@/api/appointments";
import AppointmentActions from "./components/AppointmentActions";
const Appointments = () => {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  // fetch customers
  const { data } = useQuery({
    queryKey: ["appointments"],
    queryFn: getAppointments,
  });
  const appointment_data = data?.appointment_data ?? [];
  const customer_data = data?.customer_data ?? [];
  const service_data = data?.service_data ?? [];
  // create appointment
  const createMutation = useMutation({
    mutationFn: createAppointment,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["appointments"] });
      setIsOpen(false);
      toast.success(data.message);
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        toast.error((error as any).response?.data?.message);
      }
    },
  });

  // filter data as i need
  const formattedInvoice = appointment_data?.map(
    (appointment: AppointmentDataProps, index: number) => ({
      serialNumber: index + 1,
      id: appointment.id,
      customerId: appointment.customerId,
      customer_name: appointment.customer?.name,
      serviceId: appointment.serviceId,
      service_name: appointment.service?.name,
      date: appointment.date,
      status: appointment.status,
      customer_data,
      service_data,
    }),
  );

  return (
    <div className="p-3">
      <div className="flex justify-between border-b pb-2">
        <Header title="Appointments" />
        <Button
          className={`${styles.primaryBgColor} text-white py-5 rounded-sm hover:${styles.primaryBgColor} cursor-pointer`}
          onClick={() => setIsOpen(true)}
        >
          <Plus className="w-5 h-5 text-white" />
          Add Appointment
        </Button>
      </div>
      {/* show data */}
      <div className="mt-6">
        <AppointmentActions
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          createMutation={createMutation}
          customer_data={customer_data}
          service_data={service_data}
        />
        <DataTable columns={columns} data={formattedInvoice} />
      </div>
    </div>
  );
};

export default Appointments;
