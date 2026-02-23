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
  status: string;
};

export const columns: ColumnDef<CustomerColumn>[] = [
  {
    accessorKey: "serialNumber",
    header: "SN",
  },
  {
    accessorKey: "customer_name",
    header: "Customer",
  },
  {
    accessorKey: "service_name",
    header: "Service",
  },

  {
    accessorKey: "method_type",
    header: "Payment Method",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => formatter.format(row.original.amount),
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    header: "Options",
    // cell: ({ row }) => (
    //   <Actions
    //     id={row.original.id}
    //     name={row.original.name}
    //     description={row.original.description}
    //     price={row.original.price}
    //   />
    // ),
  },
];
