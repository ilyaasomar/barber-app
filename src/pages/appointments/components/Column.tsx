"use client";

import type { ColumnDef } from "@tanstack/react-table";
import Actions from "./Actions";

export type CustomerColumn = {
  serialNumber: number;
  id: string;
  customerId: string;
  customer_name: string;
  serviceId: string;
  service_name: string;
  date: Date;
  status: string;
  customer_data?: { id: string; name: string }[];
  service_data?: { id: string; name: string }[];
};

export const columns: ColumnDef<CustomerColumn>[] = [
  { accessorKey: "serialNumber", header: "SN" },
  { accessorKey: "customer_name", header: "Customer" },
  { accessorKey: "service_name", header: "Service" },
  { accessorKey: "date", header: "Date" },
  {
    accessorKey: "status",
    header: "Status",
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
        date={row.original.date}
        status={row.original.status}
        customer_data={row.original.customer_data}
        service_data={row.original.service_data}
      />
    ),
  },
];
