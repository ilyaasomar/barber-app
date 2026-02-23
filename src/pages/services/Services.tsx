"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { styles } from "@/styles";

interface ServiceDataProps {
  id: string;
  name: string;
  description: string;
  price: number;
}
import { useState } from "react";
import { toast } from "sonner";
import { DataTable } from "@/components/reusables/data-table";
import { createService, getServices } from "@/api/services";
import ServiceActions from "./components/ServiceActions";
import { columns } from "./components/Column";
const Services = () => {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  // fetch customers
  const { data: services } = useQuery({
    queryKey: ["services"],
    queryFn: getServices,
  });

  // create customer
  const createMutation = useMutation({
    mutationFn: createService,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["services"] });
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
  const formattedService = services?.map(
    (service: ServiceDataProps, index: number) => ({
      serialNumber: index + 1,
      id: service.id,
      name: service.name,
      description: service.description,
      price: service.price,
    }),
  );

  return (
    <div className="p-3">
      <div className="flex justify-between border-b pb-2">
        <Header title="Services" />
        <Button
          className={`${styles.primaryBgColor} text-white py-5 rounded-sm hover:${styles.primaryBgColor} cursor-pointer`}
          onClick={() => setIsOpen(true)}
        >
          <Plus className="w-5 h-5 text-white" />
          Add Service
        </Button>
      </div>
      {/* show data */}
      <div className="mt-6">
        <ServiceActions
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          createMutation={createMutation}
        />
        <DataTable columns={columns} data={formattedService ?? []} />
      </div>
    </div>
  );
};

export default Services;
