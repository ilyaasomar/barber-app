"use client";

import type { ColumnDef } from "@tanstack/react-table";
import Actions from "./actions";

export type CustomerColumn = {
  serialNumber: number;
  id: string;
  customer_name: string;
  email: string;
  phone: string;
};

export const columns: ColumnDef<CustomerColumn>[] = [
  {
    accessorKey: "serialNumber",
    header: "SN",
  },
  {
    accessorKey: "customer_name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    header: "Options",
    cell: ({ row }) => <Actions id={row.original.id} />,
  },
];
