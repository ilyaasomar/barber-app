"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createCustomer, getCustomers } from "@/api/customers";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { styles } from "@/styles";

interface CustomerDataProps {
  id: string;
  name: string;
  phone: string;
  email: string;
}
import { useState } from "react";
import CustomerActions from "./components/CustomerActions";
import { toast } from "sonner";
import { DataTable } from "@/components/reusables/data-table";
import { columns } from "./components/Column";
const Customers = () => {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  // fetch customers
  const { data: customers } = useQuery({
    queryKey: ["customers"],
    queryFn: getCustomers,
  });

  // create customer
  const createMutation = useMutation({
    mutationFn: createCustomer,
    onSuccess: (data) => {
      setTimeout(() => {
        setIsOpen(false);
        queryClient.invalidateQueries({ queryKey: ["customers"] });
        toast.success(data.message);
      }, 1000);
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        toast.error((error as any).response?.data?.message);
      }
    },
  });

  // filter data as i need
  const formattedCustomer = customers?.map(
    (customer: CustomerDataProps, index: number) => ({
      serialNumber: index + 1,
      id: customer.id,
      customer_name: customer.name,
      phone: customer.phone,
      email: customer.email,
    }),
  );

  return (
    <div className="p-3">
      <div className="flex justify-between border-b pb-2">
        <Header title="Customers" />
        <Button
          className={`${styles.primaryBgColor} text-white py-5 rounded-sm hover:${styles.primaryBgColor} cursor-pointer`}
          onClick={() => setIsOpen(true)}
        >
          <Plus className="w-5 h-5 text-white" />
          Add Customer
        </Button>
      </div>
      {/* show data */}
      <div className="mt-6">
        <CustomerActions
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          createMutation={createMutation}
        />
        <DataTable columns={columns} data={formattedCustomer ?? []} />
      </div>
    </div>
  );
};

export default Customers;
