"use client";

import type { ColumnDef } from "@tanstack/react-table";
// import Actions from "./Actions";

export type PaymentColumn = {
  serialNumber: number;
  id: string;
  type: string;
  name: string;
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
    header: "Options",
    // cell: ({ row }) => (
    //   <Actions
    //     id={row.original.id}
    //     customer_name={row.original.customer_name}
    //     email={row.original.email}
    //     phone={row.original.phone}
    //   />
    // ),
  },
];
