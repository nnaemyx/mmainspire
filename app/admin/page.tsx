"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingBag, MessageSquare } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ clothes: 0, enquiries: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [clothesRes, enquiriesRes] = await Promise.all([
          fetch("/api/clothes"),
          fetch("/api/enquiries"),
        ]);
        
        const clothes = await clothesRes.json();
        const enquiries = await enquiriesRes.json();
        
        setStats({
          clothes: clothes.length || 0,
          enquiries: enquiries.length || 0,
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
      <h1 className="font-display text-3xl md:text-4xl italic text-cream mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface p-8 border border-[rgba(255,255,255,0.08)] flex items-center gap-6">
          <div className="w-16 h-16 bg-brand/10 flex items-center justify-center text-brand rounded-full">
            <ShoppingBag size={28} />
          </div>
          <div>
            <p className="font-body text-[10px] tracking-widest uppercase text-muted mb-1">Total Clothes</p>
            <p className="font-display text-4xl text-cream">{stats.clothes}</p>
          </div>
        </div>

        <div className="bg-surface p-8 border border-[rgba(255,255,255,0.08)] flex items-center gap-6">
          <div className="w-16 h-16 bg-blue-500/10 flex items-center justify-center text-blue-500 rounded-full">
            <MessageSquare size={28} />
          </div>
          <div>
            <p className="font-body text-[10px] tracking-widest uppercase text-muted mb-1">Total Enquiries</p>
            <p className="font-display text-4xl text-cream">{stats.enquiries}</p>
          </div>
        </div>
      </div>

      <div className="mt-12 flex gap-4">
        <Link
          href="/admin/clothes"
          className="font-body text-[10px] tracking-[0.35em] uppercase px-8 py-4 bg-brand text-canvas hover:bg-brand/85 transition-all duration-300"
        >
          Manage Clothes
        </Link>
        <Link
          href="/admin/enquiries"
          className="font-body text-[10px] tracking-[0.35em] uppercase px-8 py-4 border border-[rgba(255,255,255,0.2)] text-cream hover:bg-[rgba(255,255,255,0.05)] transition-all duration-300"
        >
          View Enquiries
        </Link>
      </div>
    </div>
  );
}
