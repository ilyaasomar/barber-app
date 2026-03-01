import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
import {
  DollarSign,
  CalendarDays,
  UserPlus,
  FileText,
  Scissors,
} from "lucide-react";

const stats = [
  {
    label: "Monthly Revenue",
    value: "$1,284",
    icon: DollarSign,
  },
  {
    label: "Appointments",
    value: "24",
    icon: CalendarDays,
  },
  {
    label: "New Customers",
    value: "8",
    icon: UserPlus,
  },
  {
    label: "Services",
    value: "5",
    icon: FileText,
  },
];

const invoices = [
  {
    inv: "#INV-0042",
    name: "Darius King",
    svc: "Line Up",
    amt: "$25",
    method: "Cash",
    status: "Paid",
  },
  {
    inv: "#INV-0041",
    name: "Elijah Frost",
    svc: "Classic Cut",
    amt: "$35",
    method: "Card",
    status: "Paid",
  },
  {
    inv: "#INV-0040",
    name: "Marcus Webb",
    svc: "Fade + Beard",
    amt: "$55",
    method: "Mobile",
    status: "Paid",
  },
  {
    inv: "#INV-0039",
    name: "Jordan Lee",
    svc: "Hot Shave",
    amt: "$45",
    method: "Cash",
    status: "Pending",
  },
  {
    inv: "#INV-0038",
    name: "Tyler Brooks",
    svc: "Taper Fade",
    amt: "$40",
    method: "Card",
    status: "Pending",
  },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#F4F4F5] text-[#1C1C1C] p-6 lg:p-8 space-y-6">
      {/* ── Header ──────────────────────────────────────────────── */}
      <header className="flex items-start justify-between fade-up">
        <div>
          <p className="text-xs text-zinc-400 uppercase tracking-widest mb-1 font-medium">
            Sunday, March 1 — 2026
          </p>
          <h1 className="font-display text-3xl font-medium leading-tight tracking-tight text-[#1C1C1C]">
            Good Morning, <span className="text-[#D4AF37]">Boss.</span>
          </h1>
          <p className="text-sm text-zinc-400 mt-1.5">
            Here's what's happening at your shop today.
          </p>
        </div>
      </header>

      {/* ── Stat Cards ──────────────────────────────────────────── */}
      <section className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s, i) => {
          const Icon = s.icon;
          const isHero = i === 0;
          return (
            <Card
              key={i}
              className={`card-lift rounded-2xl border-0 shadow-sm overflow-hidden relative fade-up ${isHero ? "bg-[#1C1C1C]" : "bg-white"}`}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {isHero && (
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
              )}
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`text-2xl font-semibold tracking-tight ${isHero ? "text-white" : "text-[#1C1C1C]"}`}
                  >
                    {s.value}
                  </div>
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center ${isHero ? "bg-[#D4AF37]/15 text-[#D4AF37]" : "text-[#1C1C1C]"}`}
                    style={!isHero ? { background: "rgba(28,28,28,0.07)" } : {}}
                  >
                    <Icon size={17} />
                  </div>
                </div>

                <div
                  className={`text-xs mt-1 ${isHero ? "text-zinc-400" : "text-zinc-500"}`}
                >
                  {s.label}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </section>

      {/* ── Divider ─────────────────────────────────────────────── */}
      <div className="flex items-center gap-4 opacity-25">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#D4AF37]" />
        <Scissors size={14} className="text-[#D4AF37] -rotate-45" />
        <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#D4AF37]" />
      </div>

      {/* ── Recent Invoices ──────────────────────────────────────── */}
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
                {[
                  "Invoice #",
                  "Customer",
                  "Service",
                  "Amount",
                  "Method",
                  "Status",
                ].map((h) => (
                  <TableHead
                    key={h}
                    className="text-zinc-400 text-[11px] uppercase tracking-widest font-medium px-5 py-3"
                  >
                    {h}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((row, i) => (
                <TableRow
                  key={i}
                  className="row-hover border-zinc-50 cursor-default"
                >
                  <TableCell className="px-5 py-3.5 font-mono text-[12px] text-[#B8960C] font-semibold">
                    {row.inv}
                  </TableCell>
                  <TableCell className="px-5 py-3.5 text-sm text-[#1C1C1C] font-medium">
                    {row.name}
                  </TableCell>
                  <TableCell className="px-5 py-3.5 text-sm text-zinc-400">
                    {row.svc}
                  </TableCell>
                  <TableCell className="px-5 py-3.5 text-sm font-semibold text-[#1C1C1C]">
                    {row.amt}
                  </TableCell>
                  <TableCell className="px-5 py-3.5 text-sm text-zinc-400">
                    {row.method}
                  </TableCell>
                  <TableCell className="px-5 py-3.5">
                    <Badge
                      className={`text-[10px] uppercase tracking-wider font-semibold px-2.5 border shadow-none ${
                        row.status === "Paid"
                          ? "bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-50"
                          : "bg-[#D4AF37]/10 text-[#B8960C] border-[#D4AF37]/25 hover:bg-[#D4AF37]/10"
                      }`}
                    >
                      {row.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
