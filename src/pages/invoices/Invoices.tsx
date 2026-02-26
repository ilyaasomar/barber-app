"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { styles } from "@/styles";

interface InvoiceDataProps {
  id: string;
  customerId: string;
  customer: { id: string; name: string; email: string; phone: string };
  serviceId: string;
  service: { id: string; name: string; description: string; price: number };
  paymentMethodId: string;
  paymentMethod: { type: string; name: string };
  amount: number;
}
import { useState } from "react";
import { toast } from "sonner";
import { DataTable } from "@/components/reusables/data-table";
import { columns } from "./components/Column";
import InvoiceActions from "./components/InvoiceActions";
import { createInvoice, getInvoices } from "@/api/invoices";
const Invoices = () => {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  // fetch customers
  const { data } = useQuery({
    queryKey: ["invoices"],
    queryFn: getInvoices,
  });
  const invoice_data = data?.invoice_data ?? [];
  const customer_data = data?.customer_data ?? [];
  const service_data = data?.service_data ?? [];
  const payment_method_data = data?.payment_method_data ?? [];
  console.log("customer data", customer_data);
  // create invoice
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
  const formattedInvoice = invoice_data?.map(
    (invoice: InvoiceDataProps, index: number) => ({
      serialNumber: index + 1,
      id: invoice.id,
      customerId: invoice.customerId,
      customer_name: invoice.customer?.name,
      serviceId: invoice.serviceId,
      service_name: invoice.service?.name,
      paymentMethodId: invoice.paymentMethodId,
      method_type: invoice.paymentMethod?.type,
      amount: invoice.amount,
      customer_data,
      service_data,
      payment_method_data,
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
          customer_data={customer_data}
          service_data={service_data}
          payment_method_data={payment_method_data}
        />
        <DataTable columns={columns} data={formattedInvoice} />
      </div>
    </div>
  );
};

export default Invoices;
