import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import connectToDatabase from "@/lib/db";
import Order from "@/lib/models/Order";
import Customer from "@/lib/models/Customer";
import { verifyToken } from "@/lib/auth";

const parseSafeDate = (dateVal: any, fallbackDate: Date): Date => {
  if (!dateVal) return fallbackDate;
  const d = new Date(dateVal);
  return isNaN(d.getTime()) ? fallbackDate : d;
};

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;
    const verified = token ? await verifyToken(token) : null;

    if (!verified || verified.role !== "superadmin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await connectToDatabase();
    
    // Fetch all orders
    const orders = await Order.find({}).populate("customer", "name");

    const dailyMap: Record<string, { date: string; inflow: number; outflow: number; net: number; transactions: any[] }> = {};
    const weeklyMap: Record<string, { weekCommencing: string; inflow: number; outflow: number; net: number }> = {};
    const monthlyMap: Record<string, { month: string; label: string; inflow: number; outflow: number; net: number }> = {};
    const yearlyMap: Record<string, { year: string; inflow: number; outflow: number; net: number }> = {};

    let totalInflow = 0;
    let totalOutflow = 0;

    const getWeekCommencingDate = (d: Date): string => {
      const day = d.getDay();
      const diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
      const monday = new Date(d.setDate(diff));
      return monday.toISOString().split("T")[0];
    };

    const getMonthName = (m: number): string => {
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      return months[m];
    };

    for (const order of orders) {
      const invNum = order.invoiceNumber || "unknown";
      const clientName = order.customer?.name || "Unknown Customer";
      const fallback = order.createdAt ? new Date(order.createdAt) : (order.date ? new Date(order.date) : new Date());

      // 1. Process Payments (Inflows)
      if (order.payments && order.payments.length > 0) {
        for (const payment of order.payments) {
          const pDate = parseSafeDate(payment.date, fallback);
          const dateStr = pDate.toISOString().split("T")[0];
          const weekStr = getWeekCommencingDate(new Date(pDate));
          const monthStr = dateStr.substring(0, 7); // YYYY-MM
          const yearStr = dateStr.substring(0, 4); // YYYY
          const amount = payment.amount || 0;

          totalInflow += amount;

          // Daily
          if (!dailyMap[dateStr]) {
            dailyMap[dateStr] = { date: dateStr, inflow: 0, outflow: 0, net: 0, transactions: [] };
          }
          dailyMap[dateStr].inflow += amount;
          dailyMap[dateStr].net += amount;
          dailyMap[dateStr].transactions.push({
            type: "inflow",
            amount,
            description: `Payment received - INV-${invNum} (${clientName})` + (payment.note ? ` - ${payment.note}` : ""),
            time: pDate.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
            orderId: order._id.toString(),
            invoiceNumber: invNum,
          });

          // Weekly
          if (!weeklyMap[weekStr]) {
            weeklyMap[weekStr] = { weekCommencing: weekStr, inflow: 0, outflow: 0, net: 0 };
          }
          weeklyMap[weekStr].inflow += amount;
          weeklyMap[weekStr].net += amount;

          // Monthly
          if (!monthlyMap[monthStr]) {
            const dateObj = new Date(pDate);
            monthlyMap[monthStr] = {
              month: monthStr,
              label: `${getMonthName(dateObj.getMonth())} ${dateObj.getFullYear()}`,
              inflow: 0,
              outflow: 0,
              net: 0,
            };
          }
          monthlyMap[monthStr].inflow += amount;
          monthlyMap[monthStr].net += amount;

          // Yearly
          if (!yearlyMap[yearStr]) {
            yearlyMap[yearStr] = { year: yearStr, inflow: 0, outflow: 0, net: 0 };
          }
          yearlyMap[yearStr].inflow += amount;
          yearlyMap[yearStr].net += amount;
        }
      }

      // 2. Process Expenses (Outflows)
      if (order.expenses && order.expenses.length > 0) {
        for (const expense of order.expenses) {
          const eDate = parseSafeDate(expense.date, fallback);
          const dateStr = eDate.toISOString().split("T")[0];
          const weekStr = getWeekCommencingDate(new Date(eDate));
          const monthStr = dateStr.substring(0, 7); // YYYY-MM
          const yearStr = dateStr.substring(0, 4); // YYYY
          const amount = expense.amount || 0;

          totalOutflow += amount;

          // Daily
          if (!dailyMap[dateStr]) {
            dailyMap[dateStr] = { date: dateStr, inflow: 0, outflow: 0, net: 0, transactions: [] };
          }
          dailyMap[dateStr].outflow += amount;
          dailyMap[dateStr].net -= amount;
          dailyMap[dateStr].transactions.push({
            type: "outflow",
            amount,
            description: `Expense on INV-${invNum} (${clientName}) - ${expense.description}`,
            time: eDate.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
            orderId: order._id.toString(),
            invoiceNumber: invNum,
          });

          // Weekly
          if (!weeklyMap[weekStr]) {
            weeklyMap[weekStr] = { weekCommencing: weekStr, inflow: 0, outflow: 0, net: 0 };
          }
          weeklyMap[weekStr].outflow += amount;
          weeklyMap[weekStr].net -= amount;

          // Monthly
          if (!monthlyMap[monthStr]) {
            const dateObj = new Date(eDate);
            monthlyMap[monthStr] = {
              month: monthStr,
              label: `${getMonthName(dateObj.getMonth())} ${dateObj.getFullYear()}`,
              inflow: 0,
              outflow: 0,
              net: 0,
            };
          }
          monthlyMap[monthStr].outflow += amount;
          monthlyMap[monthStr].net -= amount;

          // Yearly
          if (!yearlyMap[yearStr]) {
            yearlyMap[yearStr] = { year: yearStr, inflow: 0, outflow: 0, net: 0 };
          }
          yearlyMap[yearStr].outflow += amount;
          yearlyMap[yearStr].net -= amount;
        }
      }
    }

    // Sort mappings chronologically
    const daily = Object.values(dailyMap).sort((a, b) => b.date.localeCompare(a.date));
    const weekly = Object.values(weeklyMap).sort((a, b) => b.weekCommencing.localeCompare(a.weekCommencing));
    const monthly = Object.values(monthlyMap).sort((a, b) => b.month.localeCompare(a.month));
    const yearly = Object.values(yearlyMap).sort((a, b) => b.year.localeCompare(a.year));

    return NextResponse.json({
      totals: {
        totalInflow,
        totalOutflow,
        netProfit: totalInflow - totalOutflow,
      },
      daily,
      weekly,
      monthly,
      yearly,
    });
  } catch (error) {
    console.error("Reports API error:", error);
    return NextResponse.json({ error: "Failed to generate report" }, { status: 500 });
  }
}
