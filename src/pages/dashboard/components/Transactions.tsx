import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatter } from "@/lib/utils";

interface TransactionProps {
  transaction_data: {
    id: string;
    amount: number;
    customer: { id: string; name: string };
    service: { id: string; name: string };
    paymentMethod: { id: string; type: string };
  }[];
}

const Transactions = ({ transaction_data }: TransactionProps) => {
  return (
    <Card
      className="bg-white border-0 rounded-2xl shadow-sm fade-up overflow-hidden"
      style={{ animationDelay: "720ms" }}
    >
      <CardHeader className="pb-3 pt-5 px-5 flex flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle className="text-sm font-semibold text-[#1C1C1C]">
            Recent Invoices
          </CardTitle>
          <p className="text-xs text-zinc-400 mt-0.5">Last 5 transactions</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-[#B8960C] hover:text-[#B8960C] hover:bg-[#D4AF37]/10 text-xs h-7 rounded-full border border-[#D4AF37]/30 px-3"
        >
          All Invoices
        </Button>
      </CardHeader>
      <Separator className="bg-zinc-100" />
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="border-zinc-50 hover:bg-transparent bg-zinc-50/70">
              <TableHead>Invoice ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Payment Method</TableHead>
              <TableHead>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transaction_data?.map((row, index) => (
              <TableRow
                key={row.id}
                className="row-hover border-zinc-50 cursor-default"
              >
                <TableCell className="px-5 py-3.5 font-mono text-[12px] font-semibold">
                  {`INV-${String(index + 1).padStart(3, "0")}`}
                </TableCell>
                <TableCell className="px-5 py-3.5 text-sm text-[#1C1C1C] font-medium">
                  {row?.customer?.name}
                </TableCell>
                <TableCell className="px-5 py-3.5 text-sm">
                  {row?.service?.name}
                </TableCell>
                <TableCell className="px-5 py-3.5 text-sm font-semibold text-[#1C1C1C]">
                  {row?.paymentMethod?.type}
                </TableCell>
                <TableCell className="px-5 py-3.5 text-sm font-semibold">
                  {formatter.format(row.amount)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default Transactions;
