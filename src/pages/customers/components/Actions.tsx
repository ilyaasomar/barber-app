import { deleteCustomer, updateCustomer } from "@/api/customers";
import DeleteDialog from "@/components/reusables/delete-dialog";
import { styles } from "@/styles";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FileEdit, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import CustomerActions from "./CustomerActions";
interface ActionsProps {
  id: string;
  customer_name: string;
  email: string;
  phone: string;
}
const Actions = ({ id, customer_name, email, phone }: ActionsProps) => {
  const [isOpen, setOpen] = useState(false);
  const [isEditOpen, setEditOpen] = useState(false);
  const queryClient = useQueryClient();
  // delete customer
  const deleteMutation = useMutation({
    mutationFn: deleteCustomer,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["customers"] });
      setOpen(false);
      toast.success(data.message);
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        toast.error((error as any).response?.data?.message);
      }
    },
  });

  // update customer
  const updateMutation = useMutation({
    mutationFn: updateCustomer,
    onSuccess: (data) => {
      setTimeout(() => {
        setEditOpen(false);
        queryClient.invalidateQueries({ queryKey: ["customers"] });
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
    <>
      <DeleteDialog
        isOpen={isOpen}
        setOpen={setOpen}
        onConfirm={() => deleteMutation.mutate({ id })}
        isLoading={deleteMutation.isPending}
      />
      <CustomerActions
        isOpen={isEditOpen}
        setIsOpen={setEditOpen}
        selectedCustomer={{ id, customer_name, email, phone }}
        updateMutation={updateMutation}
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
