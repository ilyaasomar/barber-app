"use client";

import type { ColumnDef } from "@tanstack/react-table";
import Actions from "./Actions";
import { formatter } from "@/lib/utils";

export type CustomerColumn = {
  serialNumber: number;
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
};

export const columns: ColumnDef<CustomerColumn>[] = [
  { accessorKey: "serialNumber", header: "SN" },
  { accessorKey: "customer_name", header: "Customer" },
  { accessorKey: "service_name", header: "Service" },
  { accessorKey: "method_type", header: "Payment Method" },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => formatter.format(row.original.amount),
  },
  {
    header: "Options",
    cell: ({ row }) => (
      <Actions
        id={row.original.id}
        customerId={row.original.customerId}
        customer_name={row.original.customer_name}
        serviceId={row.original.serviceId}
        service_name={row.original.service_name}
        paymentMethodId={row.original.paymentMethodId}
        method_type={row.original.method_type}
        amount={row.original.amount}
        customer_data={row.original.customer_data}
        service_data={row.original.service_data}
        payment_method_data={row.original.payment_method_data}
      />
    ),
  },
];
