import DeleteDialog from "@/components/reusables/delete-dialog";
import { styles } from "@/styles";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FileEdit, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import ServiceActions from "./InvoiceActions";
import { deleteInvoice, updateInvoice } from "@/api/invoices";
interface ActionsProps {
  id: string;
  customerId: string;
  customer_name: string;
  serviceId: string;
  service_name: string;
  paymentMethodId: string;
  method_type: string;
  amount: number;
  customer_data?: { id: string; name: string }[];
  service_data?: { id: string; name: string }[];
  payment_method_data?: { id: string; type: string }[];
}
const Actions = ({
  id,
  customerId,
  customer_name,
  serviceId,
  service_name,
  paymentMethodId,
  method_type,
  amount,
  customer_data,
  service_data,
  payment_method_data,
}: ActionsProps) => {
  const [isOpen, setOpen] = useState(false);
  const [isEditOpen, setEditOpen] = useState(false);
  const queryClient = useQueryClient();
  // delete service
  const deleteMutation = useMutation({
    mutationFn: deleteInvoice,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["invoices"] });
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
    mutationFn: updateInvoice,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["invoices"] });
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

      <ServiceActions
        isOpen={isEditOpen}
        setIsOpen={setEditOpen}
        selectedInvoice={{
          id,
          customerId,
          customer_name,
          serviceId,
          service_name,
          paymentMethodId,
          method_type,
          amount,
        }}
        updateMutation={updateMutation}
        customer_data={customer_data}
        service_data={service_data}
        payment_method_data={payment_method_data}
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
