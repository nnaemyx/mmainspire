"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Search, X, Users, Phone, Ruler } from "lucide-react";

type Customer = {
  _id: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  measurements?: Record<string, string | number | undefined>;
  notes?: string;
  createdAt: string;
};

const MEASUREMENT_KEYS = [
  "bust", "roundUnderBust", "waist", "shoulderToUnderBust",
  "halfLength", "bustPoint", "shoulder", "roundSleeve",
  "sleeveLength", "blouseLength", "hips", "skirtLength",
  "skirtWaist", "fullGownLength", "shortGownLength",
  "trouserLength", "laps", "knee", "ankle",
];

export default function AdminCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, []);

  async function fetchCustomers() {
    try {
      const res = await fetch("/api/customers");
      const data = await res.json();
      if (Array.isArray(data)) {
        setCustomers(data);
      } else {
        setCustomers([]);
      }
    } catch (err) {
      console.error(err);
      setCustomers([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleSearch() {
    setLoading(true);
    try {
      const res = await fetch(`/api/customers?search=${encodeURIComponent(search)}`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setCustomers(data);
      } else {
        setCustomers([]);
      }
    } catch (err) {
      console.error(err);
      setCustomers([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !phone) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email, address }),
      });
      if (!res.ok) throw new Error("Failed to create customer");

      setName("");
      setPhone("");
      setEmail("");
      setAddress("");
      setShowForm(false);
      fetchCustomers();
    } catch (err) {
      console.error(err);
      alert("Failed to register customer.");
    } finally {
      setSubmitting(false);
    }
  }

  function getMeasurementCount(m?: Record<string, string | number | undefined>) {
    if (!m) return 0;
    return MEASUREMENT_KEYS.filter((k) => m[k] !== undefined && m[k] !== null && m[k] !== "").length;
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 md:mb-8">
        <h1 className="font-display text-2xl md:text-3xl italic text-cream">Customers</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 font-body text-[10px] tracking-[0.35em] uppercase px-6 py-3 bg-brand text-canvas hover:bg-brand/85 transition-all duration-300"
        >
          {showForm ? <><X size={14} /> Cancel</> : <><Plus size={14} /> Register Customer</>}
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
        <input
          type="text"
          placeholder="Search by name or phone..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            if (e.target.value === "") fetchCustomers();
          }}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="w-full bg-surface border border-[rgba(255,255,255,0.08)] text-cream font-body text-sm py-3 pl-11 pr-4 outline-none focus:border-brand transition-colors"
        />
      </div>

      {/* Add Customer Form */}
      {showForm && (
        <div className="bg-surface p-6 md:p-8 border border-[rgba(255,255,255,0.08)] mb-8">
          <h2 className="font-display text-xl italic text-cream mb-6">Register New Customer</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block font-body text-[9px] tracking-[0.4em] uppercase text-muted mb-2">
                  Full Name *
                </label>
                <input
                  required
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ada Obi"
                  className="w-full bg-transparent border-b border-[rgba(255,255,255,0.18)] focus:border-brand text-cream font-body text-sm py-3 outline-none"
                />
              </div>
              <div>
                <label className="block font-body text-[9px] tracking-[0.4em] uppercase text-muted mb-2">
                  Phone Number *
                </label>
                <input
                  required
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 08060065236"
                  className="w-full bg-transparent border-b border-[rgba(255,255,255,0.18)] focus:border-brand text-cream font-body text-sm py-3 outline-none"
                />
              </div>
              <div>
                <label className="block font-body text-[9px] tracking-[0.4em] uppercase text-muted mb-2">
                  Email (Optional)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. ada@email.com"
                  className="w-full bg-transparent border-b border-[rgba(255,255,255,0.18)] focus:border-brand text-cream font-body text-sm py-3 outline-none"
                />
              </div>
              <div>
                <label className="block font-body text-[9px] tracking-[0.4em] uppercase text-muted mb-2">
                  Address (Optional)
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. Onitsha, Anambra"
                  className="w-full bg-transparent border-b border-[rgba(255,255,255,0.18)] focus:border-brand text-cream font-body text-sm py-3 outline-none"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="font-body text-[10px] tracking-[0.35em] uppercase px-8 py-4 bg-brand text-canvas hover:bg-brand/85 transition-all duration-300 disabled:opacity-50"
            >
              {submitting ? "Registering..." : "Register Customer"}
            </button>
          </form>
        </div>
      )}

      {/* Customer List */}
      {loading ? (
        <p className="text-muted font-body">Loading customers...</p>
      ) : customers.length === 0 ? (
        <div className="text-center py-16">
          <Users size={48} className="mx-auto text-muted/30 mb-4" />
          <p className="text-muted font-body">
            {search ? "No customers match your search." : "No customers registered yet."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {customers.map((customer) => (
            <Link
              key={customer._id}
              href={`/admin/customers/${customer._id}`}
              className="bg-surface border border-[rgba(255,255,255,0.08)] p-5 hover:border-brand/30 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-display text-lg italic text-cream group-hover:text-brand transition-colors">
                    {customer.name}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-1">
                    <Phone size={11} className="text-muted" />
                    <span className="font-body text-xs text-muted">{customer.phone}</span>
                  </div>
                </div>
                <span className="font-body text-[8px] tracking-widest uppercase text-muted bg-surface2 px-2 py-1">
                  {new Date(customer.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "2-digit",
                  })}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <Ruler size={12} className="text-brand/60" />
                  <span className="font-body text-[10px] text-muted">
                    {getMeasurementCount(customer.measurements)}/19 measurements
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
