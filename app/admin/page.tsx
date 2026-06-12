"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingBag, MessageSquare, Users, ClipboardList, AlertCircle } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    clothes: 0,
    enquiries: 0,
    customers: 0,
    orders: 0,
    pendingBalance: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [clothesRes, enquiriesRes, customersRes, ordersRes] = await Promise.all([
          fetch("/api/clothes"),
          fetch("/api/enquiries"),
          fetch("/api/customers"),
          fetch("/api/orders"),
        ]);
        
        const clothes = await clothesRes.json();
        const enquiries = await enquiriesRes.json();
        const customers = await customersRes.json();
        const orders = await ordersRes.json();

        const pendingBalance = Array.isArray(orders)
          ? orders.reduce((sum: number, o: any) => sum + (o.balance || 0), 0)
          : 0;
        
        setStats({
          clothes: Array.isArray(clothes) ? clothes.length : 0,
          enquiries: Array.isArray(enquiries) ? enquiries.length : 0,
          customers: Array.isArray(customers) ? customers.length : 0,
          orders: Array.isArray(orders) ? orders.length : 0,
          pendingBalance,
        });
      } catch (error) {
        console.error("Failed to fetch stats", error);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (loading) {
    return <div className="text-cream font-body">Loading dashboard...</div>;
  }

  return (
    <div>
      <h1 className="font-display text-2xl md:text-3xl lg:text-4xl italic text-cream mb-6 md:mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
        {/* Customers */}
        <Link
          href="/admin/customers"
          className="bg-surface p-4 md:p-6 border border-[rgba(255,255,255,0.08)] flex items-center gap-3 md:gap-5 hover:border-brand/20 transition-all group"
        >
          <div className="w-10 h-10 md:w-14 md:h-14 bg-purple-500/10 flex items-center justify-center text-purple-400 rounded-full shrink-0">
            <Users size={22} />
          </div>
          <div>
            <p className="font-body text-[9px] md:text-[10px] tracking-widest uppercase text-muted mb-0.5">Customers</p>
            <p className="font-display text-2xl md:text-3xl text-cream">{stats.customers}</p>
          </div>
        </Link>

        {/* Orders */}
        <Link
          href="/admin/orders"
          className="bg-surface p-4 md:p-6 border border-[rgba(255,255,255,0.08)] flex items-center gap-3 md:gap-5 hover:border-brand/20 transition-all group"
        >
          <div className="w-10 h-10 md:w-14 md:h-14 bg-amber-500/10 flex items-center justify-center text-amber-400 rounded-full shrink-0">
            <ClipboardList size={22} />
          </div>
          <div>
            <p className="font-body text-[9px] md:text-[10px] tracking-widest uppercase text-muted mb-0.5">Orders</p>
            <p className="font-display text-2xl md:text-3xl text-cream">{stats.orders}</p>
          </div>
        </Link>

        {/* Pending Balance */}
        <div className="bg-surface p-4 md:p-6 border border-[rgba(255,255,255,0.08)] flex items-center gap-3 md:gap-5 col-span-2 lg:col-span-1">
          <div className="w-10 h-10 md:w-14 md:h-14 bg-red-500/10 flex items-center justify-center text-red-400 rounded-full shrink-0">
            <AlertCircle size={22} />
          </div>
          <div>
            <p className="font-body text-[9px] md:text-[10px] tracking-widest uppercase text-muted mb-0.5">Outstanding Balance</p>
            <p className="font-display text-2xl md:text-3xl text-cream">
              ₦{stats.pendingBalance.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Clothes */}
        <Link
          href="/admin/clothes"
          className="bg-surface p-4 md:p-6 border border-[rgba(255,255,255,0.08)] flex items-center gap-3 md:gap-5 hover:border-brand/20 transition-all group"
        >
          <div className="w-10 h-10 md:w-14 md:h-14 bg-brand/10 flex items-center justify-center text-brand rounded-full shrink-0">
            <ShoppingBag size={22} />
          </div>
          <div>
            <p className="font-body text-[9px] md:text-[10px] tracking-widest uppercase text-muted mb-0.5">Clothes</p>
            <p className="font-display text-2xl md:text-3xl text-cream">{stats.clothes}</p>
          </div>
        </Link>

        {/* Enquiries */}
        <Link
          href="/admin/enquiries"
          className="bg-surface p-4 md:p-6 border border-[rgba(255,255,255,0.08)] flex items-center gap-3 md:gap-5 hover:border-brand/20 transition-all group"
        >
          <div className="w-10 h-10 md:w-14 md:h-14 bg-blue-500/10 flex items-center justify-center text-blue-500 rounded-full shrink-0">
            <MessageSquare size={22} />
          </div>
          <div>
            <p className="font-body text-[9px] md:text-[10px] tracking-widest uppercase text-muted mb-0.5">Enquiries</p>
            <p className="font-display text-2xl md:text-3xl text-cream">{stats.enquiries}</p>
          </div>
        </Link>
      </div>

      <div className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-3 md:gap-4">
        <Link
          href="/admin/customers"
          className="font-body text-[10px] tracking-[0.35em] uppercase px-8 py-4 bg-brand text-canvas hover:bg-brand/85 transition-all duration-300 text-center"
        >
          Register Customer
        </Link>
        <Link
          href="/admin/orders"
          className="font-body text-[10px] tracking-[0.35em] uppercase px-8 py-4 border border-[rgba(255,255,255,0.2)] text-cream hover:bg-[rgba(255,255,255,0.05)] transition-all duration-300 text-center"
        >
          Create Order
        </Link>
        <Link
          href="/admin/clothes"
          className="font-body text-[10px] tracking-[0.35em] uppercase px-8 py-4 border border-[rgba(255,255,255,0.2)] text-cream hover:bg-[rgba(255,255,255,0.05)] transition-all duration-300 text-center"
        >
          Manage Clothes
        </Link>
      </div>
    </div>
  );
}
