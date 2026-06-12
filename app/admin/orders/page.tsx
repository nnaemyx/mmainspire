"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Plus, Search, X, FileText, Filter } from "lucide-react";

type OrderListItem = {
  _id: string;
  invoiceNumber: string;
  date: string;
  total: number;
  advance: number;
  balance: number;
  status: string;
  items: { description: string }[];
  customer: { _id: string; name: string; phone: string };
};

type Customer = {
  _id: string;
  name: string;
  phone: string;
};

const STATUS_OPTIONS = ["All", "Pending", "In Progress", "Ready", "Delivered"];

const STATUS_COLORS: Record<string, string> = {
  Pending: "bg-yellow-500/15 text-yellow-400",
  "In Progress": "bg-blue-500/15 text-blue-400",
  Ready: "bg-brand/15 text-brand",
  Delivered: "bg-muted/15 text-muted",
};

function OrdersContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [orders, setOrders] = useState<OrderListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // New order form
  const [showNewOrder, setShowNewOrder] = useState(searchParams.get("new") === "true");
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState(searchParams.get("customer") || "");
  const [customerSearch, setCustomerSearch] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, [statusFilter]);

  useEffect(() => {
    if (showNewOrder) fetchCustomers();
  }, [showNewOrder]);

  async function fetchOrders() {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter !== "All") params.set("status", statusFilter);
      if (search) params.set("search", search);

      const res = await fetch(`/api/orders?${params.toString()}`);
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function fetchCustomers() {
    try {
      const res = await fetch(`/api/customers?search=${encodeURIComponent(customerSearch)}`);
      const data = await res.json();
      setCustomers(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleCreateOrder(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedCustomer) {
      alert("Please select a customer.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: selectedCustomer,
          items: [],
        }),
      });
      if (!res.ok) throw new Error("Failed to create order");
      const order = await res.json();
      router.push(`/admin/orders/${order._id}`);
    } catch (err) {
      console.error(err);
      alert("Failed to create order.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 md:mb-8">
        <h1 className="font-display text-2xl md:text-3xl italic text-cream">Orders</h1>
        <button
          onClick={() => setShowNewOrder(!showNewOrder)}
          className="flex items-center gap-2 font-body text-[10px] tracking-[0.35em] uppercase px-6 py-3 bg-brand text-canvas hover:bg-brand/85 transition-all duration-300"
        >
          {showNewOrder ? (
            <>
              <X size={14} /> Cancel
            </>
          ) : (
            <>
              <Plus size={14} /> New Order
            </>
          )}
        </button>
      </div>

      {/* New Order Form */}
      {showNewOrder && (
        <div className="bg-surface p-6 md:p-8 border border-[rgba(255,255,255,0.08)] mb-8">
          <h2 className="font-display text-xl italic text-cream mb-5">Create New Order</h2>
          <form onSubmit={handleCreateOrder} className="space-y-5">
            <div>
              <label className="block font-body text-[9px] tracking-[0.4em] uppercase text-muted mb-2">
                Select Customer *
              </label>
              {/* Customer search */}
              <div className="flex gap-3 mb-3">
                <input
                  type="text"
                  value={customerSearch}
                  onChange={(e) => setCustomerSearch(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), fetchCustomers())}
                  placeholder="Search customer by name or phone..."
                  className="flex-1 bg-transparent border-b border-[rgba(255,255,255,0.18)] focus:border-brand text-cream font-body text-sm py-2 outline-none"
                />
                <button
                  type="button"
                  onClick={fetchCustomers}
                  className="font-body text-[9px] tracking-wider uppercase px-4 py-2 border border-brand/30 text-brand hover:bg-brand/10 transition-colors"
                >
                  Search
                </button>
              </div>
              {/* Customer results */}
              <div className="max-h-48 overflow-y-auto space-y-1">
                {customers.map((c) => (
                  <button
                    type="button"
                    key={c._id}
                    onClick={() => setSelectedCustomer(c._id)}
                    className={`w-full text-left px-4 py-3 font-body text-sm transition-colors ${
                      selectedCustomer === c._id
                        ? "bg-brand/15 text-brand border-l-2 border-brand"
                        : "text-cream hover:bg-[rgba(255,255,255,0.03)]"
                    }`}
                  >
                    <span className="font-medium">{c.name}</span>
                    <span className="text-muted text-xs ml-3">{c.phone}</span>
                  </button>
                ))}
                {customers.length === 0 && (
                  <p className="font-body text-xs text-muted py-3 px-4">
                    No customers found. Search or{" "}
                    <Link href="/admin/customers" className="text-brand hover:underline">
                      register a new customer
                    </Link>{" "}
                    first.
                  </p>
                )}
              </div>
            </div>
            <button
              type="submit"
              disabled={submitting || !selectedCustomer}
              className="font-body text-[10px] tracking-[0.35em] uppercase px-8 py-4 bg-brand text-canvas hover:bg-brand/85 transition-all duration-300 disabled:opacity-50"
            >
              {submitting ? "Creating..." : "Create Order"}
            </button>
          </form>
        </div>
      )}

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="Search by invoice #, customer name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchOrders()}
            className="w-full bg-surface border border-[rgba(255,255,255,0.08)] text-cream font-body text-sm py-3 pl-11 pr-4 outline-none focus:border-brand transition-colors"
          />
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {STATUS_OPTIONS.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`font-body text-[9px] tracking-[0.2em] uppercase px-4 py-2.5 whitespace-nowrap transition-colors ${
                statusFilter === s
                  ? "bg-brand text-canvas"
                  : "bg-surface border border-[rgba(255,255,255,0.08)] text-muted hover:text-cream"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      {loading ? (
        <p className="text-muted font-body">Loading orders...</p>
      ) : orders.length === 0 ? (
        <div className="text-center py-16">
          <FileText size={48} className="mx-auto text-muted/30 mb-4" />
          <p className="text-muted font-body">
            {statusFilter !== "All" || search
              ? "No orders match your filter."
              : "No orders created yet."}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <Link
              key={order._id}
              href={`/admin/orders/${order._id}`}
              className="block bg-surface border border-[rgba(255,255,255,0.08)] p-4 md:p-5 hover:border-brand/30 transition-all group"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="font-body text-sm text-cream font-medium tracking-wide">
                    INV-{order.invoiceNumber}
                  </span>
                  <span
                    className={`font-body text-[8px] tracking-[0.3em] uppercase px-2.5 py-0.5 ${
                      STATUS_COLORS[order.status] || "bg-muted/15 text-muted"
                    }`}
                  >
                    {order.status}
                  </span>
                  <span className="font-body text-xs text-muted">
                    {order.customer?.name || "Unknown"}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <span className="font-body text-[10px] text-muted">
                    {new Date(order.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                  <span className="font-display text-sm text-cream">
                    ₦{order.total.toLocaleString()}
                  </span>
                  {order.balance > 0 && (
                    <span className="font-body text-[10px] text-red-400">
                      Bal: ₦{order.balance.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
              {order.items.length > 0 && (
                <p className="font-body text-xs text-muted mt-2 truncate">
                  {order.items.map((i) => i.description).join(", ")}
                </p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AdminOrders() {
  return (
    <Suspense fallback={<div className="text-cream font-body">Loading...</div>}>
      <OrdersContent />
    </Suspense>
  );
}
