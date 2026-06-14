"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Plus,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Pencil,
  Upload,
  X,
  Trash2,
  Send,
} from "lucide-react";

type Measurements = Record<string, string | number | undefined>;

type Customer = {
  _id: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  measurements?: Measurements;
  notes?: string;
  createdAt: string;
};

type Order = {
  _id: string;
  invoiceNumber: string;
  date: string;
  total: number;
  balance: number;
  status: string;
  items: { description: string }[];
};

const MEASUREMENT_GROUPS = [
  {
    label: "Upper Body",
    fields: [
      { key: "bust", label: "Bust" },
      { key: "roundUnderBust", label: "Round Under Bust" },
      { key: "waist", label: "Waist" },
      { key: "shoulderToUnderBust", label: "Shoulder to Under Bust" },
      { key: "halfLength", label: "Half Length" },
      { key: "bustPoint", label: "Bust Point" },
      { key: "shoulder", label: "Shoulder" },
      { key: "roundSleeve", label: "Round Sleeve" },
      { key: "sleeveLength", label: "Sleeve Length" },
      { key: "blouseLength", label: "Blouse Length" },
    ],
  },
  {
    label: "Lower Body",
    fields: [
      { key: "hips", label: "Hips" },
      { key: "skirtLength", label: "Skirt Length" },
      { key: "skirtWaist", label: "Skirt Waist" },
      { key: "laps", label: "Laps" },
      { key: "knee", label: "Knee" },
      { key: "ankle", label: "Ankle" },
    ],
  },
  {
    label: "Full Body",
    fields: [
      { key: "fullGownLength", label: "Full Gown Length" },
      { key: "shortGownLength", label: "Short Gown Length" },
      { key: "trouserLength", label: "Trouser Length" },
    ],
  },
];

const STATUS_COLORS: Record<string, string> = {
  Pending: "bg-yellow-500/15 text-yellow-400",
  "In Progress": "bg-blue-500/15 text-blue-400",
  Ready: "bg-brand/15 text-brand",
  Delivered: "bg-muted/15 text-muted",
};

export default function CustomerDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [customer, setCustomer] = useState<Customer | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingProfile, setEditingProfile] = useState(false);

  // Editable profile fields
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  // Measurements
  const [measurements, setMeasurements] = useState<Measurements>({});

  useEffect(() => {
    fetchCustomer();
  }, [id]);

  async function fetchCustomer() {
    try {
      const res = await fetch(`/api/customers/${id}`);
      const data = await res.json();
      setCustomer(data.customer);
      setOrders(data.orders || []);

      // Populate edit fields
      setName(data.customer.name);
      setPhone(data.customer.phone);
      setEmail(data.customer.email || "");
      setAddress(data.customer.address || "");
      setNotes(data.customer.notes || "");
      setMeasurements(data.customer.measurements || {});
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function saveMeasurements() {
    setSaving(true);
    try {
      const res = await fetch(`/api/customers/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ measurements }),
      });
      if (!res.ok) throw new Error("Failed to save");
      const updated = await res.json();
      setCustomer((prev) => (prev ? { ...prev, measurements: updated.measurements } : null));
    } catch (err) {
      console.error(err);
      alert("Failed to save measurements.");
    } finally {
      setSaving(false);
    }
  }

  async function saveProfile() {
    setSaving(true);
    try {
      const res = await fetch(`/api/customers/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email, address, notes }),
      });
      if (!res.ok) throw new Error("Failed to save");
      const updated = await res.json();
      setCustomer((prev) => (prev ? { ...prev, ...updated } : null));
      setEditingProfile(false);
    } catch (err) {
      console.error(err);
      alert("Failed to save profile.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!confirm("Are you sure? This will permanently delete this customer.")) return;
    try {
      await fetch(`/api/customers/${id}`, { method: "DELETE" });
      router.push("/admin/customers");
    } catch (err) {
      console.error(err);
    }
  }

  function updateMeasurement(key: string, value: string) {
    setMeasurements((prev) => ({
      ...prev,
      [key]: value === "" ? undefined : value,
    }));
  }

  function getWhatsAppMeasurementsUrl() {
    if (!customer?.phone) return "#";
    const phone = customer.phone.replace(/^0/, "234").replace(/\D/g, "");
    const lines = [`Hi ${customer.name}, here are your body measurements recorded at Mma Inspire:`];
    
    let hasMeasurements = false;
    MEASUREMENT_GROUPS.forEach((g) => {
      const activeFields = g.fields
        .filter((f) => measurements[f.key] !== undefined && measurements[f.key] !== null)
        .map((f) => `• ${f.label}: ${measurements[f.key]} inches`);
      
      if (activeFields.length > 0) {
        hasMeasurements = true;
        lines.push(`\n*${g.label}*`);
        lines.push(...activeFields);
      }
    });

    if (!hasMeasurements) {
      lines.push("\nNo measurements recorded yet.");
    }

    lines.push("\nThank you for choosing Mma Inspire! 🙏");

    const message = lines.join("\n");
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  }

  if (loading) {
    return <div className="text-cream font-body">Loading customer...</div>;
  }

  if (!customer) {
    return <div className="text-red-400 font-body">Customer not found.</div>;
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6 md:mb-8">
        <button
          onClick={() => router.push("/admin/customers")}
          className="flex items-center gap-2 text-muted hover:text-cream transition-colors font-body text-sm"
        >
          <ArrowLeft size={16} />
          Back
        </button>
        <div className="flex-1">
          <h1 className="font-display text-2xl md:text-3xl italic text-cream">{customer.name}</h1>
          <p className="font-body text-[10px] tracking-widest uppercase text-muted mt-1">
            Customer since{" "}
            {new Date(customer.createdAt).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/admin/orders?new=true&customer=${customer._id}`}
            className="flex items-center gap-2 font-body text-[10px] tracking-[0.3em] uppercase px-5 py-3 bg-brand text-canvas hover:bg-brand/85 transition-all"
          >
            <Plus size={14} />
            New Order
          </Link>
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 font-body text-[10px] tracking-[0.3em] uppercase px-4 py-3 border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-all"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {/* ── Section 1: Profile & Contact ── */}
      <div className="bg-surface border border-[rgba(255,255,255,0.08)] p-5 md:p-7 mb-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display text-lg italic text-cream">Contact Details</h2>
          <button
            onClick={() => {
              if (editingProfile) saveProfile();
              else setEditingProfile(true);
            }}
            disabled={saving}
            className="flex items-center gap-1.5 font-body text-[9px] tracking-[0.3em] uppercase text-brand hover:text-brand/80 transition-colors disabled:opacity-50"
          >
            {editingProfile ? (
              <>
                <Save size={13} /> {saving ? "Saving..." : "Save"}
              </>
            ) : (
              <>
                <Pencil size={13} /> Edit
              </>
            )}
          </button>
        </div>

        {editingProfile ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block font-body text-[8px] tracking-[0.4em] uppercase text-muted mb-1.5">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-transparent border-b border-[rgba(255,255,255,0.18)] focus:border-brand text-cream font-body text-sm py-2 outline-none"
              />
            </div>
            <div>
              <label className="block font-body text-[8px] tracking-[0.4em] uppercase text-muted mb-1.5">Phone</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-transparent border-b border-[rgba(255,255,255,0.18)] focus:border-brand text-cream font-body text-sm py-2 outline-none"
              />
            </div>
            <div>
              <label className="block font-body text-[8px] tracking-[0.4em] uppercase text-muted mb-1.5">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-b border-[rgba(255,255,255,0.18)] focus:border-brand text-cream font-body text-sm py-2 outline-none"
              />
            </div>
            <div>
              <label className="block font-body text-[8px] tracking-[0.4em] uppercase text-muted mb-1.5">Address</label>
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-transparent border-b border-[rgba(255,255,255,0.18)] focus:border-brand text-cream font-body text-sm py-2 outline-none"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block font-body text-[8px] tracking-[0.4em] uppercase text-muted mb-1.5">Notes</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                className="w-full bg-transparent border-b border-[rgba(255,255,255,0.18)] focus:border-brand text-cream font-body text-sm py-2 outline-none resize-none"
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <Phone size={15} className="text-brand/60" />
              <a href={`tel:${customer.phone}`} className="font-body text-sm text-cream hover:text-brand transition-colors">
                {customer.phone}
              </a>
            </div>
            {customer.email && (
              <div className="flex items-center gap-3">
                <Mail size={15} className="text-brand/60" />
                <span className="font-body text-sm text-cream">{customer.email}</span>
              </div>
            )}
            {customer.address && (
              <div className="flex items-center gap-3">
                <MapPin size={15} className="text-brand/60" />
                <span className="font-body text-sm text-cream">{customer.address}</span>
              </div>
            )}
            <div className="flex items-center gap-3">
              <MessageCircle size={15} className="text-brand/60" />
              <a
                href={`https://wa.me/${customer.phone.replace(/^0/, "234").replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-sm text-brand hover:underline"
              >
                WhatsApp
              </a>
            </div>
            {customer.notes && (
              <p className="font-body text-xs text-muted sm:col-span-2 italic">{customer.notes}</p>
            )}
          </div>
        )}
      </div>

      {/* ── Section 2: Measurements ── */}
      <div className="bg-surface border border-[rgba(255,255,255,0.08)] p-5 md:p-7 mb-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display text-lg italic text-cream">Measurements</h2>
          <div className="flex items-center gap-4">
            <a
              href={getWhatsAppMeasurementsUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-body text-[9px] tracking-[0.3em] uppercase text-brand hover:text-brand/80 transition-colors"
            >
              <Send size={13} />
              Share
            </a>
            <button
              onClick={saveMeasurements}
              disabled={saving}
              className="flex items-center gap-1.5 font-body text-[9px] tracking-[0.3em] uppercase text-brand hover:text-brand/80 transition-colors disabled:opacity-50"
            >
              <Save size={13} />
              {saving ? "Saving..." : "Save Measurements"}
            </button>
          </div>
        </div>

        <div className="space-y-8">
          {MEASUREMENT_GROUPS.map((group) => (
            <div key={group.label}>
              <h3 className="font-body text-[9px] tracking-[0.4em] uppercase text-brand/80 mb-3 pb-2 border-b border-[rgba(255,255,255,0.06)]">
                {group.label}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-3">
                {group.fields.map((field) => (
                  <div key={field.key} className="flex flex-col">
                    <label className="font-body text-[8px] tracking-[0.3em] uppercase text-muted mb-1">
                      {field.label}
                    </label>
                    <input
                      type="text"
                      value={measurements[field.key] ?? ""}
                      onChange={(e) => updateMeasurement(field.key, e.target.value)}
                      placeholder="—"
                      className="w-full bg-surface2 border border-[rgba(255,255,255,0.06)] text-cream font-body text-sm py-2 px-3 outline-none focus:border-brand transition-colors text-center"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Section 3: Orders ── */}
      <div className="bg-surface border border-[rgba(255,255,255,0.08)] p-5 md:p-7">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display text-lg italic text-cream">Orders</h2>
          <Link
            href={`/admin/orders?new=true&customer=${customer._id}`}
            className="flex items-center gap-1.5 font-body text-[9px] tracking-[0.3em] uppercase text-brand hover:text-brand/80 transition-colors"
          >
            <Plus size={13} />
            New Order
          </Link>
        </div>

        {orders.length === 0 ? (
          <p className="font-body text-sm text-muted">No orders yet for this customer.</p>
        ) : (
          <div className="space-y-3">
            {orders.map((order) => (
              <Link
                key={order._id}
                href={`/admin/orders/${order._id}`}
                className="block bg-surface2 border border-[rgba(255,255,255,0.04)] p-4 hover:border-brand/20 transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="font-body text-[10px] tracking-wider text-cream">
                      INV-{order.invoiceNumber}
                    </span>
                    <span
                      className={`font-body text-[8px] tracking-[0.3em] uppercase px-2.5 py-0.5 ${
                        STATUS_COLORS[order.status] || "bg-muted/15 text-muted"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <span className="font-body text-[10px] text-muted">
                    {new Date(order.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-body text-xs text-muted">
                    {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                  </span>
                  <div className="flex items-center gap-4">
                    <span className="font-display text-sm text-cream">
                      ₦{(order.total ?? 0).toLocaleString()}
                    </span>
                    {(order.balance ?? 0) > 0 && (
                      <span className="font-body text-[10px] text-red-400">
                        Bal: ₦{(order.balance ?? 0).toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
