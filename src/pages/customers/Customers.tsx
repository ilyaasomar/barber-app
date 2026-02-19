"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createCustomer,
  deleteCustomer,
  getCustomers,
  updateCustomer,
} from "@/api/customers";
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
[];
import ShowCustomerData from "./components/ShowData";
import { useState } from "react";
import CustomerActions from "./components/CustomerActions";
const Customers = () => {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  // fetch customers
  const {
    data: customers,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["customers"],
    queryFn: getCustomers,
  });

  // create customer
  const createMutation = useMutation({
    mutationFn: createCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });

  // update customer
  const updateMutation = useMutation({
    mutationFn: updateCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });

  // delete customer
  const deleteMutation = useMutation({
    mutationFn: deleteCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
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
      {/* dataTable */}
      <div className="mt-6">
        <CustomerActions
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          createMutation={createMutation}
        />
        <ShowCustomerData data={formattedCustomer} />
      </div>
    </div>
  );
};

export default Customers;
