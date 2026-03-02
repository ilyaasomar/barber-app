import { Card, CardContent } from "@/components/ui/card";

import {
  DollarSign,
  CalendarDays,
  UserPlus,
  FileText,
  Scissors,
} from "lucide-react";
import Transactions from "./Transactions";

interface ShowDataProps {
  data: {
    user_data: { id: string; name: string; email: string };
    total_revenue: number;
    total_appointments: number;
    total_customers: number;
    total_services: number;
    last_transactions: {
      id: string;
      amount: number;
      customer: { id: string; name: string };
      service: { id: string; name: string };
      paymentMethod: { id: string; type: string };
    }[];
  };
}
const ShowData = ({ data }: ShowDataProps) => {
  const full_name = data?.user_data?.name;
  const total_revenue = data?.total_revenue;
  const total_appointments = data?.total_appointments;
  const total_customers = data?.total_customers;
  const total_services = data?.total_services;
  const last_transactions = data?.last_transactions;
  const stats = [
    {
      label: "Total Revenue",
      value: total_revenue === undefined ? `$0.00` : `$${total_revenue}`,
      icon: DollarSign,
    },
    {
      label: "Appointments",
      value: total_appointments === undefined ? "0" : `${total_appointments}`,
      icon: CalendarDays,
    },
    {
      label: "New Customers",
      value: total_customers === undefined ? "0" : `${total_customers}`,
      icon: UserPlus,
    },
    {
      label: "Services",
      value: total_services === undefined ? "0" : `${total_services}`,
      icon: FileText,
    },
  ];

  const todaysDate = new Date().toDateString();
  const getFullYear = todaysDate.split(" ")[3];
  const getDay = todaysDate.split(" ")[2];
  const getMonth = todaysDate.split(" ")[1];
  const getDate = todaysDate.split(" ")[0];
  return (
    <div className="min-h-screen bg-[#F4F4F5] text-[#1C1C1C] p-6 lg:p-8 space-y-6">
      {/* ── Header ──────────────────────────────────────────────── */}
      <header className="flex items-start justify-between fade-up">
        <div>
          <p className="text-xs text-black uppercase mb-1 font-bold">
            {getDate}, {getMonth} {getDay} — {getFullYear}
          </p>
          <h1 className="font-display text-3xl font-medium leading-tight tracking-tight text-[#1C1C1C]">
            Good Morning, <span className="text-[#D4AF37]">{full_name}.</span>
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
                <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
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
        <div className="flex-1 h-px bg-linear-to-r from-transparent to-[#D4AF37]" />
        <Scissors size={14} className="text-[#D4AF37] -rotate-45" />
        <div className="flex-1 h-px bg-linear-to-l from-transparent to-[#D4AF37]" />
      </div>

      {/* ── Recent Invoices ──────────────────────────────────────── */}

      <Transactions transaction_data={last_transactions} />
    </div>
  );
};

export default ShowData;
