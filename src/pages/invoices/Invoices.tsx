"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { styles } from "@/styles";

interface InvoiceDataProps {
  id: string;
  customerId: string;
  serviceId: string;
  paymentMethodId: string;
  amount: number;
  status: string;
}
import { useState } from "react";
import { toast } from "sonner";
import { DataTable } from "@/components/reusables/data-table";
import { createService, getServices } from "@/api/services";
import { columns } from "./components/Column";
import InvoiceActions from "./components/InvoiceActions";
import { createInvoice, getInvoices } from "@/api/invoices";
const Invoices = () => {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  // fetch customers
  const { data: invoices } = useQuery({
    queryKey: ["invoices"],
    queryFn: getInvoices,
  });

  // create customer
  const createMutation = useMutation({
    mutationFn: createInvoice,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["invoices"] });
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
  const formattedService = invoices?.map(
    (invoice: InvoiceDataProps, index: number) => ({
      serialNumber: index + 1,
      id: invoice.id,
      customerId: invoice.customerId,
      customer_name: invoice.customer?.name,
      serviceId: invoice.serviceId,
      service_name: invoice.service.name,
      paymentMethodId: invoice.paymentMethodId,
      method_type: invoice.type,
      amount: invoice.amount,
      status: invoice.status,
    }),
  );

  return (
    <div className="p-3">
      <div className="flex justify-between border-b pb-2">
        <Header title="Invoices" />
        <Button
          className={`${styles.primaryBgColor} text-white py-5 rounded-sm hover:${styles.primaryBgColor} cursor-pointer`}
          onClick={() => setIsOpen(true)}
        >
          <Plus className="w-5 h-5 text-white" />
          Add Invoice
        </Button>
      </div>
      {/* show data */}
      <div className="mt-6">
        <InvoiceActions
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          createMutation={createMutation}
        />
        <DataTable columns={columns} data={formattedService ?? []} />
      </div>
    </div>
  );
};

export default Invoices;
