import DeleteDialog from "@/components/reusables/delete-dialog";
import { styles } from "@/styles";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FileEdit, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { deleteAppointment, updateAppointment } from "@/api/appointments";
import AppointmentActions from "./AppointmentActions";
interface ActionsProps {
  id: string;
  customerId: string;
  customer_name: string;
  serviceId: string;
  service_name: string;
  date: Date;
  status: string;
  customer_data?: { id: string; name: string }[];
  service_data?: { id: string; name: string }[];
}
const Actions = ({
  id,
  customerId,
  customer_name,
  serviceId,
  service_name,
  date,
  status,
  customer_data,
  service_data,
}: ActionsProps) => {
  const [isOpen, setOpen] = useState(false);
  const [isEditOpen, setEditOpen] = useState(false);
  const queryClient = useQueryClient();
  // delete service
  const deleteMutation = useMutation({
    mutationFn: deleteAppointment,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["appointments"] });
      setOpen(false);
      toast.success(data.message);
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        toast.error((error as any).response?.data?.message);
      }
    },
  });

  // update service
  const updateMutation = useMutation({
    mutationFn: updateAppointment,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["appointments"] });
      setEditOpen(false);
      toast.success(data.message);
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        console.log(error);
        toast.error((error as any).response?.data?.message);
      }
    },
  });
  return (
    <>
      <DeleteDialog
        isOpen={isOpen}
        setOpen={setOpen}
        onConfirm={() => deleteMutation.mutate(id)}
        isLoading={deleteMutation.isPending}
      />

      <AppointmentActions
        isOpen={isEditOpen}
        setIsOpen={setEditOpen}
        selectedAppointment={{
          id,
          customerId,
          customer_name,
          serviceId,
          service_name,
          date: new Date(date),
          status,
        }}
        updateMutation={updateMutation}
        customer_data={customer_data}
        service_data={service_data}
      />

      <div className="flex items-center gap-x-2">
        <div
          className={`w-7 h-7 flex items-center rounded-md ${styles.primaryBgColor}`}
          onClick={() => setEditOpen(true)}
        >
          <FileEdit
            size={10}
            className="text-white w-full h-full p-1 cursor-pointer"
          />
        </div>

        <div
          className="w-7 h-7 flex items-center rounded-md bg-red-600"
          onClick={() => setOpen(true)}
        >
          <Trash className="text-white w-full h-full p-1 cursor-pointer" />
        </div>
      </div>
    </>
  );
};

export default Actions;
