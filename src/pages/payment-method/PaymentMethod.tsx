import Header from "@/components/Header";
import { DataTable } from "@/components/reusables/data-table";
import { Button } from "@/components/ui/button";
import { styles } from "@/styles";
import { Plus } from "lucide-react";
import { useState } from "react";
import { columns } from "./components/Column";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createPaymentMethod, getPaymentMethods } from "@/api/payment-method";
import { toast } from "sonner";
import PaymentMethodActions from "./components/PaymentMethodActions";
interface PaymentMethodData {
  id: string;
  type: string;
  name: string;
  balance: number;
}
const PaymentMethod = () => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const { data: payment_methods } = useQuery({
    queryKey: ["payment_methods"],
    queryFn: getPaymentMethods,
  });

  // create payment method
  const createMutation = useMutation({
    mutationFn: createPaymentMethod,
    onSuccess: (data) => {
      console.log(data);
      setTimeout(() => {
        setIsOpen(false);
        queryClient.invalidateQueries({ queryKey: ["payment_methods"] });
        toast.success(data?.message);
      }, 1000);
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        toast.error((error as any).response?.data?.message);
      }
    },
  });

  const formattedPaymentMethod = payment_methods?.map(
    (method: PaymentMethodData, index: number) => ({
      serialNumber: index + 1,
      id: method.id,
      type: method.type,
      name: method.name,
      balance: method.balance,
    }),
  );
  return (
    <div className="p-3">
      <div className="flex justify-between border-b pb-2">
        <Header title="Payment Methods" />
        <Button
          className={`${styles.primaryBgColor} text-white py-5 rounded-sm hover:${styles.primaryBgColor} cursor-pointer`}
          onClick={() => setIsOpen(true)}
        >
          <Plus className="w-5 h-5 text-white" />
          Add Method
        </Button>
      </div>
      {/* show data */}
      <div className="mt-6">
        {/* pass the creation */}
        <PaymentMethodActions
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          createMutation={createMutation}
        />
        <DataTable columns={columns} data={formattedPaymentMethod ?? []} />
      </div>
    </div>
  );
};

export default PaymentMethod;
