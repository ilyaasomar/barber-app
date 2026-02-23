"use client";

import type { ColumnDef } from "@tanstack/react-table";
import Actions from "./Actions";
import { formatter } from "@/lib/utils";

export type PaymentColumn = {
  serialNumber: number;
  id: string;
  type: string;
  name: string;
  balance: number;
};

export const columns: ColumnDef<PaymentColumn>[] = [
  {
    accessorKey: "serialNumber",
    header: "SN",
  },

  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "name",
    header: "Method Name",
  },
  {
    accessorKey: "balance",
    header: "Balance",
    cell: ({ row }) => formatter.format(row.original.balance),
  },

  {
    header: "Options",
    cell: ({ row }) => (
      <Actions
        id={row.original.id}
        type={row.original.type}
        name={row.original.name}
      />
    ),
  },
];
