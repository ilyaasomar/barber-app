import { deletePaymentMethod, updatePaymentMethod } from "@/api/payment-method";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import PaymentMethodActions from "./PaymentMethodActions";
import { FileEdit, Trash } from "lucide-react";
import { styles } from "@/styles";
import DeleteDialog from "@/components/reusables/delete-dialog";
interface ActionProps {
  id: string;
  type: string;
  name: string;
}
const Actions = ({ id, type, name }: ActionProps) => {
  const [isOpen, setOpen] = useState(false);
  const [isEditOpen, setEditOpen] = useState(false);
  const queryClient = useQueryClient();

  // update mutation
  const updateMutation = useMutation({
    mutationFn: updatePaymentMethod,
    onSuccess: (data) => {
      setTimeout(() => {
        setEditOpen(false);
        queryClient.invalidateQueries({ queryKey: ["payment_methods"] });
        toast.success(data.message);
      }, 1000);
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        console.log(error);
        toast.error((error as any).response?.data?.message);
      }
    },
  });

  //   delete mutation

  const deleteMutation = useMutation({
    mutationFn: deletePaymentMethod,
    onSuccess: (data) => {
      setTimeout(() => {
        setOpen(false);
        queryClient.invalidateQueries({ queryKey: ["payment_methods"] });
        toast.success(data.message);
      }, 1000);
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        console.log(error);
        toast.error((error as any).response?.data?.message);
      }
    },
  });
  return (
    <div>
      <PaymentMethodActions
        isOpen={isEditOpen}
        setIsOpen={setEditOpen}
        updateMutation={updateMutation}
        selectedMethod={{ id, type, name }}
      />
      <DeleteDialog
        isOpen={isOpen}
        setOpen={setOpen}
        onConfirm={() => deleteMutation.mutate(id)}
        isLoading={deleteMutation.isPending}
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
    </div>
  );
};

export default Actions;
