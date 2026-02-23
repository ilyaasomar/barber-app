import DeleteDialog from "@/components/reusables/delete-dialog";
import { styles } from "@/styles";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FileEdit, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import ServiceActions from "./ServiceActions";
import { deleteService, updateService } from "@/api/services";
interface ActionsProps {
  id: string;
  name: string;
  description: string;
  price: number;
}
const Actions = ({ id, name, description, price }: ActionsProps) => {
  const [isOpen, setOpen] = useState(false);
  const [isEditOpen, setEditOpen] = useState(false);
  const queryClient = useQueryClient();
  // delete service
  const deleteMutation = useMutation({
    mutationFn: deleteService,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["services"] });
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
    mutationFn: updateService,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["services"] });
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
        selectedService={{ id, name, description, price }}
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
