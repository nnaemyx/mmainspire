"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { TrendingUp, TrendingDown, DollarSign, Calendar, RefreshCw, ChevronRight } from "lucide-react";

type Transaction = {
  type: "inflow" | "outflow";
  amount: number;
  description: string;
  time: string;
  orderId: string;
  invoiceNumber: string;
};

type DailyReport = {
  date: string;
  inflow: number;
  outflow: number;
  net: number;
  transactions: Transaction[];
};

type WeeklyReport = {
  weekCommencing: string;
  inflow: number;
  outflow: number;
  net: number;
};

type MonthlyReport = {
  month: string;
  label: string;
  inflow: number;
  outflow: number;
  net: number;
};

type YearlyReport = {
  year: string;
  inflow: number;
  outflow: number;
  net: number;
};

type ReportData = {
  totals: {
    totalInflow: number;
    totalOutflow: number;
    netProfit: number;
  };
  daily: DailyReport[];
  weekly: WeeklyReport[];
  monthly: MonthlyReport[];
  yearly: YearlyReport[];
};

export default function ReportsPage() {
  const [data, setData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"daily" | "weekly" | "monthly" | "yearly">("daily");

  useEffect(() => {
    fetchReport();
  }, []);

  async function fetchReport() {
    setLoading(true);
    try {
      const res = await fetch("/api/reports");
      if (res.ok) {
        const reportData = await res.json();
        setData(reportData);
      }
    } catch (err) {
      console.error("Failed to fetch reports:", err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="text-cream font-body flex flex-col items-center justify-center py-20 gap-3">
        <div className="w-6 h-6 border-2 border-brand border-t-transparent rounded-full animate-spin" />
        <span>Generating Reports...</span>
      </div>
    );
  }

  if (!data) {
    return <div className="text-red-400 font-body py-10">Failed to load reports. Ensure you are signed in as Superadmin.</div>;
  }

  const { totals } = data;

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl italic text-cream">Financial Reports</h1>
          <p className="font-body text-[10px] tracking-widest uppercase text-muted mt-1">Real-time Accounting Ledger</p>
        </div>
        <button
          onClick={fetchReport}
          className="flex items-center gap-1.5 font-body text-[9px] tracking-[0.25em] uppercase px-4 py-2 bg-surface hover:bg-surface2 text-cream border border-[rgba(255,255,255,0.08)] transition-all cursor-pointer"
        >
          <RefreshCw size={12} className="animate-hover" />
          Refresh
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Inflow */}
        <div className="bg-surface border border-[rgba(255,255,255,0.08)] p-5 md:p-6 flex items-center justify-between">
          <div>
            <span className="block font-body text-[8px] tracking-[0.4em] uppercase text-muted mb-2">Total Inflow (Credits)</span>
            <span className="font-display text-2xl md:text-3xl text-brand">₦{totals.totalInflow.toLocaleString()}</span>
          </div>
          <div className="w-12 h-12 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center text-brand">
            <TrendingUp size={20} />
          </div>
        </div>

        {/* Total Outflow */}
        <div className="bg-surface border border-[rgba(255,255,255,0.08)] p-5 md:p-6 flex items-center justify-between">
          <div>
            <span className="block font-body text-[8px] tracking-[0.4em] uppercase text-muted mb-2">Total Outflow (Debits)</span>
            <span className="font-display text-2xl md:text-3xl text-red-400">₦{totals.totalOutflow.toLocaleString()}</span>
          </div>
          <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
            <TrendingDown size={20} />
          </div>
        </div>

        {/* Net Profit */}
        <div className="bg-surface border border-[rgba(255,255,255,0.08)] p-5 md:p-6 flex items-center justify-between">
          <div>
            <span className="block font-body text-[8px] tracking-[0.4em] uppercase text-muted mb-2">Net Income (Balance)</span>
            <span className={`font-display text-2xl md:text-3xl ${totals.netProfit >= 0 ? "text-brand" : "text-red-400"}`}>
              ₦{totals.netProfit.toLocaleString()}
            </span>
          </div>
          <div className={`w-12 h-12 rounded-full flex items-center justify-center border ${
            totals.netProfit >= 0
              ? "bg-brand/10 border-brand/20 text-brand"
              : "bg-red-500/10 border-red-500/20 text-red-400"
          }`}>
            <DollarSign size={20} />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-[rgba(255,255,255,0.08)] flex gap-2 overflow-x-auto pb-px">
        {(["daily", "weekly", "monthly", "yearly"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`font-body text-[10px] tracking-[0.25em] uppercase px-5 py-3 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === tab
                ? "border-brand text-brand bg-brand/5"
                : "border-transparent text-muted hover:text-cream"
            }`}
          >
            {tab} Report
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div className="bg-surface border border-[rgba(255,255,255,0.08)] p-4 md:p-6">
        {/* DAILY REPORT */}
        {activeTab === "daily" && (
          <div className="space-y-6">
            {data.daily.length === 0 ? (
              <p className="font-body text-sm text-muted text-center py-10">No daily records logged yet.</p>
            ) : (
              data.daily.map((day) => (
                <div key={day.date} className="border border-[rgba(255,255,255,0.06)] bg-surface2/30">
                  {/* Day Header Summary */}
                  <div className="p-4 bg-surface2/60 border-b border-[rgba(255,255,255,0.06)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-brand" />
                      <span className="font-display italic text-base text-cream">
                        {new Date(day.date).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                          weekday: "short",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-body tracking-wider text-muted">
                      <span>Inflow: <strong className="text-brand">₦{day.inflow.toLocaleString()}</strong></span>
                      <span>Outflow: <strong className="text-red-400">₦{day.outflow.toLocaleString()}</strong></span>
                      <span>Net: <strong className={day.net >= 0 ? "text-brand" : "text-red-400"}>₦{day.net.toLocaleString()}</strong></span>
                    </div>
                  </div>

                  {/* Day Ledger Transactions */}
                  <div className="divide-y divide-[rgba(255,255,255,0.04)]">
                    {day.transactions.map((t, idx) => (
                      <div key={idx} className="p-3 sm:px-6 flex items-start sm:items-center justify-between gap-4">
                        <div className="flex items-start sm:items-center gap-3">
                          <span className={`text-[8px] tracking-[0.2em] uppercase px-2 py-0.5 border rounded-sm font-body shrink-0 ${
                            t.type === "inflow"
                              ? "bg-brand/10 border-brand/20 text-brand"
                              : "bg-red-500/10 border-red-500/20 text-red-400"
                          }`}>
                            {t.type === "inflow" ? "Credit" : "Debit"}
                          </span>
                          <div className="min-w-0">
                            <p className="font-body text-xs text-cream leading-relaxed">{t.description}</p>
                            <span className="text-[10px] text-muted font-body mt-0.5 block">{t.time}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <span className={`font-display text-sm ${t.type === "inflow" ? "text-brand" : "text-red-400"}`}>
                            {t.type === "inflow" ? "+" : "-"}₦{t.amount.toLocaleString()}
                          </span>
                          <Link
                            href={`/admin/orders/${t.orderId}`}
                            className="text-muted hover:text-brand transition-colors p-1"
                            title="View Order"
                          >
                            <ChevronRight size={14} />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* WEEKLY REPORT */}
        {activeTab === "weekly" && (
          <div className="overflow-x-auto">
            <table className="w-full text-left font-body text-sm text-cream border-collapse">
              <thead>
                <tr className="border-b border-[rgba(255,255,255,0.08)] text-[9px] tracking-widest text-muted uppercase">
                  <th className="py-3 px-4 font-normal">Week Commencing (Monday)</th>
                  <th className="py-3 px-4 font-normal text-right">Credits (Inflow)</th>
                  <th className="py-3 px-4 font-normal text-right">Debits (Outflow)</th>
                  <th className="py-3 px-4 font-normal text-right">Net Income</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(255,255,255,0.04)]">
                {data.weekly.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-10 text-center text-muted">No weekly reports available.</td>
                  </tr>
                ) : (
                  data.weekly.map((week) => (
                    <tr key={week.weekCommencing} className="hover:bg-[rgba(255,255,255,0.01)]">
                      <td className="py-4 px-4 font-medium">
                        {new Date(week.weekCommencing).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className="py-4 px-4 text-right text-brand">₦{week.inflow.toLocaleString()}</td>
                      <td className="py-4 px-4 text-right text-red-400">₦{week.outflow.toLocaleString()}</td>
                      <td className={`py-4 px-4 text-right font-display italic font-semibold ${week.net >= 0 ? "text-brand" : "text-red-400"}`}>
                        ₦{week.net.toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* MONTHLY REPORT */}
        {activeTab === "monthly" && (
          <div className="overflow-x-auto">
            <table className="w-full text-left font-body text-sm text-cream border-collapse">
              <thead>
                <tr className="border-b border-[rgba(255,255,255,0.08)] text-[9px] tracking-widest text-muted uppercase">
                  <th className="py-3 px-4 font-normal">Month</th>
                  <th className="py-3 px-4 font-normal text-right">Credits (Inflow)</th>
                  <th className="py-3 px-4 font-normal text-right">Debits (Outflow)</th>
                  <th className="py-3 px-4 font-normal text-right">Net Income</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(255,255,255,0.04)]">
                {data.monthly.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-10 text-center text-muted">No monthly reports available.</td>
                  </tr>
                ) : (
                  data.monthly.map((month) => (
                    <tr key={month.month} className="hover:bg-[rgba(255,255,255,0.01)]">
                      <td className="py-4 px-4 font-display italic text-base text-cream">{month.label}</td>
                      <td className="py-4 px-4 text-right text-brand">₦{month.inflow.toLocaleString()}</td>
                      <td className="py-4 px-4 text-right text-red-400">₦{month.outflow.toLocaleString()}</td>
                      <td className={`py-4 px-4 text-right font-display italic font-semibold ${month.net >= 0 ? "text-brand" : "text-red-400"}`}>
                        ₦{month.net.toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* YEARLY REPORT */}
        {activeTab === "yearly" && (
          <div className="overflow-x-auto">
            <table className="w-full text-left font-body text-sm text-cream border-collapse">
              <thead>
                <tr className="border-b border-[rgba(255,255,255,0.08)] text-[9px] tracking-widest text-muted uppercase">
                  <th className="py-3 px-4 font-normal">Year</th>
                  <th className="py-3 px-4 font-normal text-right">Credits (Inflow)</th>
                  <th className="py-3 px-4 font-normal text-right">Debits (Outflow)</th>
                  <th className="py-3 px-4 font-normal text-right">Net Income</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(255,255,255,0.04)]">
                {data.yearly.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-10 text-center text-muted">No yearly reports available.</td>
                  </tr>
                ) : (
                  data.yearly.map((year) => (
                    <tr key={year.year} className="hover:bg-[rgba(255,255,255,0.01)]">
                      <td className="py-4 px-4 font-display italic text-base text-cream">{year.year}</td>
                      <td className="py-4 px-4 text-right text-brand">₦{year.inflow.toLocaleString()}</td>
                      <td className="py-4 px-4 text-right text-red-400">₦{year.outflow.toLocaleString()}</td>
                      <td className={`py-4 px-4 text-right font-display italic font-semibold ${year.net >= 0 ? "text-brand" : "text-red-400"}`}>
                        ₦{year.net.toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
