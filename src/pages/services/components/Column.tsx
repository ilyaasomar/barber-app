"use client";

import type { ColumnDef } from "@tanstack/react-table";
import Actions from "./Actions";
import { formatter } from "@/lib/utils";

export type CustomerColumn = {
  serialNumber: number;
  id: string;
  name: string;
  description: string;
  price: number;
};

export const columns: ColumnDef<CustomerColumn>[] = [
  {
    accessorKey: "serialNumber",
    header: "SN",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => formatter.format(row.original.price),
  },
  {
    header: "Options",
    cell: ({ row }) => (
      <Actions
        id={row.original.id}
        name={row.original.name}
        description={row.original.description}
        price={row.original.price}
      />
    ),
  },
];
