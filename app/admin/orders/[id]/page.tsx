"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  Upload,
  X,
  FileText,
  Send,
  Pencil,
  CreditCard,
  Image as ImageIcon,
} from "lucide-react";

type OrderItem = {
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
};

type Payment = {
  _id?: string;
  amount: number;
  date: string;
  note?: string;
};

type CustomerInfo = {
  _id: string;
  name: string;
  phone: string;
  email?: string;
};

type OrderData = {
  _id: string;
  invoiceNumber: string;
  customer: CustomerInfo;
  date: string;
  items: OrderItem[];
  total: number;
  payments: Payment[];
  advance: number;
  balance: number;
  collectionDate?: string;
  designImages: string[];
  status: string;
  notes?: string;
  assignedTo?: { _id: string; name: string; email: string } | string;
  expenses?: { _id: string; amount: number; date: string; description: string }[];
};

const STATUS_OPTIONS = ["Pending", "In Progress", "Ready", "Delivered"];
const STATUS_COLORS: Record<string, string> = {
  Pending: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  "In Progress": "bg-blue-500/15 text-blue-400 border-blue-500/30",
  Ready: "bg-brand/15 text-brand border-brand/30",
  Delivered: "bg-muted/15 text-muted border-muted/30",
};

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Editable items
  const [items, setItems] = useState<OrderItem[]>([]);
  const [status, setStatus] = useState("Pending");
  const [collectionDate, setCollectionDate] = useState("");
  const [notes, setNotes] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [userRole, setUserRole] = useState("admin");
  const [admins, setAdmins] = useState<{ _id: string; name: string }[]>([]);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated && data.user) {
          setUserRole(data.user.role);
          if (data.user.role === "superadmin") {
            fetch("/api/admins")
              .then((res) => res.json())
              .then((adminsData) => setAdmins(adminsData))
              .catch((err) => console.error(err));
          }
        }
      })
      .catch((err) => console.error(err));
  }, []);

  // Payment form
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentNote, setPaymentNote] = useState("");
  const [addingPayment, setAddingPayment] = useState(false);

  // Expense form
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseDescription, setExpenseDescription] = useState("");
  const [addingExpense, setAddingExpense] = useState(false);

  // Design upload
  const designInputRef = useRef<HTMLInputElement>(null);
  const [uploadingDesign, setUploadingDesign] = useState(false);

  useEffect(() => {
    fetchOrder();
  }, [id]);

  async function fetchOrder() {
    try {
      const res = await fetch(`/api/orders/${id}`);
      const data = await res.json();
      setOrder(data);
      setItems(data.items || []);
      setStatus(data.status);
      setCollectionDate(data.collectionDate ? data.collectionDate.split("T")[0] : "");
      setNotes(data.notes || "");
      setAssignedTo(data.assignedTo?._id || data.assignedTo || "");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function saveOrder() {
    setSaving(true);
    try {
      // Recalculate item amounts before saving
      const updatedItems = items.map((item) => ({
        ...item,
        amount: item.quantity * item.unitPrice,
      }));

      const res = await fetch(`/api/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: updatedItems,
          status,
          collectionDate: collectionDate || undefined,
          notes,
          assignedTo: assignedTo || null,
        }),
      });
      if (!res.ok) throw new Error("Failed to save");
      const updated = await res.json();
      setOrder(updated);
      setItems(updated.items || []);
    } catch (err) {
      console.error(err);
      alert("Failed to save order.");
    } finally {
      setSaving(false);
    }
  }

  async function addPayment(e: React.FormEvent) {
    e.preventDefault();
    if (!paymentAmount || Number(paymentAmount) <= 0) return;

    setAddingPayment(true);
    try {
      const res = await fetch(`/api/orders/${id}/payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: Number(paymentAmount),
          note: paymentNote,
        }),
      });
      if (!res.ok) throw new Error("Failed to add payment");
      const updated = await res.json();
      setOrder(updated);
      setPaymentAmount("");
      setPaymentNote("");
      setShowPaymentForm(false);
    } catch (err) {
      console.error(err);
      alert("Failed to add payment.");
    } finally {
      setAddingPayment(false);
    }
  }

  async function addExpense(e: React.FormEvent) {
    e.preventDefault();
    if (!expenseAmount || Number(expenseAmount) <= 0 || !expenseDescription) return;

    setAddingExpense(true);
    try {
      const res = await fetch(`/api/orders/${id}/expense`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: Number(expenseAmount),
          description: expenseDescription,
        }),
      });
      if (!res.ok) throw new Error("Failed to add expense");
      const updated = await res.json();
      setOrder(updated);
      setExpenseAmount("");
      setExpenseDescription("");
      setShowExpenseForm(false);
    } catch (err) {
      console.error(err);
      alert("Failed to add expense.");
    } finally {
      setAddingExpense(false);
    }
  }

  async function deleteExpense(expenseId: string) {
    if (!confirm("Are you sure you want to delete this expense?")) return;

    try {
      const res = await fetch(`/api/orders/${id}/expense?expenseId=${expenseId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete expense");
      const updated = await res.json();
      setOrder(updated);
    } catch (err) {
      console.error(err);
      alert("Failed to delete expense.");
    }
  }

  async function handleDesignUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingDesign(true);
    try {
      // Upload to Cloudinary
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: reader.result }),
        });
        if (!uploadRes.ok) throw new Error("Upload failed");
        const { url } = await uploadRes.json();

        // Add to order
        const currentImages = order?.designImages || [];
        const res = await fetch(`/api/orders/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            designImages: [...currentImages, url],
          }),
        });
        if (!res.ok) throw new Error("Failed to save");
        const updated = await res.json();
        setOrder(updated);
        setUploadingDesign(false);
      };
    } catch (err) {
      console.error(err);
      alert("Failed to upload design.");
      setUploadingDesign(false);
    }

    if (designInputRef.current) designInputRef.current.value = "";
  }

  async function removeDesignImage(url: string) {
    try {
      const updatedImages = (order?.designImages || []).filter((img) => img !== url);
      const res = await fetch(`/api/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ designImages: updatedImages }),
      });
      if (!res.ok) throw new Error("Failed to save");
      const updated = await res.json();
      setOrder(updated);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDeleteOrder() {
    if (!confirm("Are you sure? This will permanently delete this order and all payments.")) return;
    try {
      await fetch(`/api/orders/${id}`, { method: "DELETE" });
      router.push("/admin/orders");
    } catch (err) {
      console.error(err);
    }
  }

  function addItem() {
    setItems((prev) => [
      ...prev,
      { description: "", quantity: 1, unitPrice: 0, amount: 0 },
    ]);
  }

  function updateItem(index: number, field: keyof OrderItem, value: string | number) {
    setItems((prev) => {
      const copy = [...prev];
      const item = { ...copy[index] };

      if (field === "description") {
        item.description = value as string;
      } else {
        item[field] = Number(value) || 0;
      }

      // Auto-calculate amount
      item.amount = item.quantity * item.unitPrice;
      copy[index] = item;
      return copy;
    });
  }

  function removeItem(index: number) {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }

  function getWhatsAppShareUrl() {
    if (!order?.customer?.phone) return "#";
    const phone = order.customer.phone.replace(/^0/, "234").replace(/\D/g, "");
    const invoiceUrl = `${window.location.origin}/admin/orders/${order._id}/invoice`;
    const message = `Hi ${order.customer.name}, here is your invoice (INV-${order.invoiceNumber}) from Mma Inspire Fashion Allure.\n\nTotal: ₦ ${(order.total ?? 0).toLocaleString()}\nAdvance Paid: ₦ ${(order.advance ?? 0).toLocaleString()}\nBalance: ₦ ${(order.balance ?? 0).toLocaleString()}\n\nView your invoice: ${invoiceUrl}`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  }

  if (loading) return <div className="text-cream font-body">Loading order...</div>;
  if (!order) return <div className="text-red-400 font-body">Order not found.</div>;

  const computedTotal = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-6">
        <button
          onClick={() => router.push("/admin/orders")}
          className="flex items-center gap-2 text-muted hover:text-cream transition-colors font-body text-sm"
        >
          <ArrowLeft size={16} />
          Back
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="font-display text-2xl md:text-3xl italic text-cream">
              INV-{order.invoiceNumber}
            </h1>
            <span
              className={`font-body text-[8px] tracking-[0.3em] uppercase px-3 py-1 border ${
                STATUS_COLORS[order.status] || ""
              }`}
            >
              {order.status}
            </span>
          </div>
          <p className="font-body text-sm text-muted mt-1">
            <Link
              href={`/admin/customers/${order.customer?._id}`}
              className="text-brand hover:underline"
            >
              {order.customer?.name}
            </Link>
            {" · "}
            {new Date(order.date).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href={`/admin/orders/${order._id}/invoice`}
            className="flex items-center gap-1.5 font-body text-[9px] tracking-[0.25em] uppercase px-4 py-2.5 border border-brand/30 text-brand hover:bg-brand/10 transition-colors"
          >
            <FileText size={13} />
            Invoice
          </Link>
          <a
            href={getWhatsAppShareUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-body text-[9px] tracking-[0.25em] uppercase px-4 py-2.5 bg-[#25D366] text-white hover:bg-[#20BD5A] transition-colors"
          >
            <Send size={13} />
            WhatsApp
          </a>
          <button
            onClick={handleDeleteOrder}
            className="flex items-center gap-1.5 font-body text-[9px] tracking-[0.25em] uppercase px-3 py-2.5 border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>

      {/* Status & Date Controls */}
      <div className="bg-surface border border-[rgba(255,255,255,0.08)] p-5 md:p-7 mb-5">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
          <div>
            <label className="block font-body text-[8px] tracking-[0.4em] uppercase text-muted mb-2">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full bg-surface2 border border-[rgba(255,255,255,0.08)] text-cream font-body text-sm py-2.5 px-3 outline-none focus:border-brand"
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-body text-[8px] tracking-[0.4em] uppercase text-muted mb-2">
              Collection Date
            </label>
            <input
              type="date"
              value={collectionDate}
              onChange={(e) => setCollectionDate(e.target.value)}
              className="w-full bg-surface2 border border-[rgba(255,255,255,0.08)] text-cream font-body text-sm py-2.5 px-3 outline-none focus:border-brand"
            />
          </div>
          <div>
            <label className="block font-body text-[8px] tracking-[0.4em] uppercase text-muted mb-2">
              Notes
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Rush order"
              className="w-full bg-surface2 border border-[rgba(255,255,255,0.08)] text-cream font-body text-sm py-2.5 px-3 outline-none focus:border-brand"
            />
          </div>
          <div>
            <label className="block font-body text-[8px] tracking-[0.4em] uppercase text-muted mb-2">
              Assigned To
            </label>
            {userRole === "superadmin" ? (
              <select
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                className="w-full bg-surface2 border border-[rgba(255,255,255,0.08)] text-cream font-body text-sm py-2.5 px-3 outline-none focus:border-brand"
              >
                <option value="">Unassigned</option>
                {admins.map((a) => (
                  <option key={a._id} value={a._id}>
                    {a.name}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                readOnly
                value={order.assignedTo && typeof order.assignedTo === "object" ? order.assignedTo.name : "Unassigned"}
                className="w-full bg-surface2/50 border border-[rgba(255,255,255,0.04)] text-muted font-body text-sm py-2.5 px-3 outline-none"
              />
            )}
          </div>
        </div>
      </div>

      {/* ── Fabric Items Table ── */}
      <div className="bg-surface border border-[rgba(255,255,255,0.08)] p-5 md:p-7 mb-5">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display text-lg italic text-cream">Fabric Items</h2>
          <button
            onClick={addItem}
            className="flex items-center gap-1.5 font-body text-[9px] tracking-[0.3em] uppercase text-brand hover:text-brand/80 transition-colors"
          >
            <Plus size={13} />
            Add Item
          </button>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-8">
            <p className="font-body text-sm text-muted mb-3">No items added yet.</p>
            <button
              onClick={addItem}
              className="font-body text-[10px] tracking-[0.3em] uppercase px-6 py-3 border border-brand/30 text-brand hover:bg-brand/10 transition-colors"
            >
              <Plus size={13} className="inline mr-2" />
              Add First Item
            </button>
          </div>
        ) : (
          <>
            {/* Desktop/Tablet Table */}
            <div className="overflow-x-auto">
              <table className="w-full font-body text-sm text-cream">
                <thead>
                  <tr className="border-b border-[rgba(255,255,255,0.08)]">
                    <th className="text-left p-2 font-normal text-muted text-[8px] tracking-[0.3em] uppercase w-8">
                      NO.
                    </th>
                    <th className="text-left p-2 font-normal text-muted text-[8px] tracking-[0.3em] uppercase">
                      Description of Fabrics
                    </th>
                    <th className="text-center p-2 font-normal text-muted text-[8px] tracking-[0.3em] uppercase w-20">
                      QTY
                    </th>
                    <th className="text-right p-2 font-normal text-muted text-[8px] tracking-[0.3em] uppercase w-28">
                      Unit Price
                    </th>
                    <th className="text-right p-2 font-normal text-muted text-[8px] tracking-[0.3em] uppercase w-28">
                      Amount (₦)
                    </th>
                    <th className="w-10"></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, i) => (
                    <tr key={i} className="border-b border-[rgba(255,255,255,0.04)]">
                      <td className="p-2 text-muted text-xs">{i + 1}</td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) => updateItem(i, "description", e.target.value)}
                          placeholder="e.g. Ankara fabric"
                          className="w-full bg-transparent text-cream text-sm outline-none border-b border-transparent focus:border-brand py-1"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateItem(i, "quantity", e.target.value)}
                          className="w-full bg-transparent text-cream text-sm outline-none border-b border-transparent focus:border-brand py-1 text-center"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="number"
                          min="0"
                          value={item.unitPrice || ""}
                          onChange={(e) => updateItem(i, "unitPrice", e.target.value)}
                          placeholder="0"
                          className="w-full bg-transparent text-cream text-sm outline-none border-b border-transparent focus:border-brand py-1 text-right"
                        />
                      </td>
                      <td className="p-2 text-right font-display text-sm">
                        ₦{(item.quantity * item.unitPrice).toLocaleString()}
                      </td>
                      <td className="p-2">
                        <button
                          onClick={() => removeItem(i)}
                          className="text-red-400/60 hover:text-red-400 transition-colors"
                        >
                          <X size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="flex justify-end mt-4">
              <div className="w-full sm:w-64 space-y-2">
                <div className="flex justify-between font-body text-sm text-cream border-t border-[rgba(255,255,255,0.08)] pt-3">
                  <span className="text-muted text-xs tracking-wider uppercase">Total</span>
                  <span className="font-display text-lg">₦{computedTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Save Button */}
      <div className="flex justify-end mb-5">
        <button
          onClick={saveOrder}
          disabled={saving}
          className="flex items-center gap-2 font-body text-[10px] tracking-[0.35em] uppercase px-8 py-4 bg-brand text-canvas hover:bg-brand/85 transition-all duration-300 disabled:opacity-50"
        >
          <Save size={14} />
          {saving ? "Saving..." : "Save Order"}
        </button>
      </div>

      {/* ── Payments Section ── */}
      <div className="bg-surface border border-[rgba(255,255,255,0.08)] p-5 md:p-7 mb-5">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display text-lg italic text-cream">Payments</h2>
          <button
            onClick={() => setShowPaymentForm(!showPaymentForm)}
            className="flex items-center gap-1.5 font-body text-[9px] tracking-[0.3em] uppercase text-brand hover:text-brand/80 transition-colors"
          >
            {showPaymentForm ? (
              <>
                <X size={13} /> Cancel
              </>
            ) : (
              <>
                <CreditCard size={13} /> Add Payment
              </>
            )}
          </button>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          <div className="bg-surface2 p-4 text-center">
            <p className="font-body text-[8px] tracking-[0.4em] uppercase text-muted mb-1">Total</p>
            <p className="font-display text-lg text-cream">₦{(order.total ?? 0).toLocaleString()}</p>
          </div>
          <div className="bg-surface2 p-4 text-center">
            <p className="font-body text-[8px] tracking-[0.4em] uppercase text-muted mb-1">Advance</p>
            <p className="font-display text-lg text-brand">₦{(order.advance ?? 0).toLocaleString()}</p>
          </div>
          <div className="bg-surface2 p-4 text-center">
            <p className="font-body text-[8px] tracking-[0.4em] uppercase text-muted mb-1">Balance</p>
            <p className={`font-display text-lg ${(order.balance ?? 0) > 0 ? "text-red-400" : "text-brand"}`}>
              ₦{(order.balance ?? 0).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Add Payment Form */}
        {showPaymentForm && (
          <form onSubmit={addPayment} className="bg-surface2 p-5 mb-5 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-body text-[8px] tracking-[0.4em] uppercase text-muted mb-1.5">
                  Amount (₦) *
                </label>
                <input
                  required
                  type="number"
                  min="1"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  placeholder="e.g. 25000"
                  className="w-full bg-transparent border-b border-[rgba(255,255,255,0.18)] focus:border-brand text-cream font-body text-sm py-2 outline-none"
                />
              </div>
              <div>
                <label className="block font-body text-[8px] tracking-[0.4em] uppercase text-muted mb-1.5">
                  Note (Optional)
                </label>
                <input
                  type="text"
                  value={paymentNote}
                  onChange={(e) => setPaymentNote(e.target.value)}
                  placeholder="e.g. Initial deposit"
                  className="w-full bg-transparent border-b border-[rgba(255,255,255,0.18)] focus:border-brand text-cream font-body text-sm py-2 outline-none"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={addingPayment}
              className="font-body text-[10px] tracking-[0.3em] uppercase px-6 py-3 bg-brand text-canvas hover:bg-brand/85 transition-all disabled:opacity-50"
            >
              {addingPayment ? "Adding..." : "Record Payment"}
            </button>
          </form>
        )}

        {/* Payment History */}
        {(order.payments || []).length > 0 && (
          <div className="space-y-2">
            <h3 className="font-body text-[8px] tracking-[0.4em] uppercase text-muted mb-2">
              Payment History
            </h3>
            {(order.payments || []).map((payment, i) => (
              <div
                key={payment._id || i}
                className="flex items-center justify-between py-2 border-b border-[rgba(255,255,255,0.04)]"
              >
                <div className="flex items-center gap-3">
                  <span className="font-body text-xs text-muted">
                    {new Date(payment.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                  {payment.note && (
                    <span className="font-body text-xs text-muted italic">{payment.note}</span>
                  )}
                </div>
                <span className="font-display text-sm text-brand">
                  +₦{payment.amount.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Expenses Section ── */}
      <div className="bg-surface border border-[rgba(255,255,255,0.08)] p-5 md:p-7 mb-5">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display text-lg italic text-cream">Expenses</h2>
          <button
            onClick={() => setShowExpenseForm(!showExpenseForm)}
            className="flex items-center gap-1.5 font-body text-[9px] tracking-[0.3em] uppercase text-brand hover:text-brand/80 transition-colors"
          >
            {showExpenseForm ? (
              <>
                <X size={13} /> Cancel
              </>
            ) : (
              <>
                <CreditCard size={13} /> Record Expense
              </>
            )}
          </button>
        </div>

        {/* Expenses Summary */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="bg-surface2 p-4 text-center">
            <p className="font-body text-[8px] tracking-[0.4em] uppercase text-muted mb-1">Order Revenue</p>
            <p className="font-display text-lg text-cream">₦{(order.total ?? 0).toLocaleString()}</p>
          </div>
          <div className="bg-surface2 p-4 text-center">
            <p className="font-body text-[8px] tracking-[0.4em] uppercase text-muted mb-1">Total Expenses</p>
            <p className="font-display text-lg text-red-400">
              ₦{(order.expenses || []).reduce((sum, e) => sum + e.amount, 0).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Add Expense Form */}
        {showExpenseForm && (
          <form onSubmit={addExpense} className="bg-surface2 p-5 mb-5 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-body text-[8px] tracking-[0.4em] uppercase text-muted mb-1.5">
                  Expense Amount (₦) *
                </label>
                <input
                  required
                  type="number"
                  min="1"
                  value={expenseAmount}
                  onChange={(e) => setExpenseAmount(e.target.value)}
                  placeholder="e.g. 5000"
                  className="w-full bg-transparent border-b border-[rgba(255,255,255,0.18)] focus:border-brand text-cream font-body text-sm py-2 outline-none"
                />
              </div>
              <div>
                <label className="block font-body text-[8px] tracking-[0.4em] uppercase text-muted mb-1.5">
                  Description *
                </label>
                <input
                  required
                  type="text"
                  value={expenseDescription}
                  onChange={(e) => setExpenseDescription(e.target.value)}
                  placeholder="e.g. Sewing thread, zip, transport"
                  className="w-full bg-transparent border-b border-[rgba(255,255,255,0.18)] focus:border-brand text-cream font-body text-sm py-2 outline-none"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={addingExpense}
              className="font-body text-[10px] tracking-[0.3em] uppercase px-6 py-3 bg-brand text-canvas hover:bg-brand/85 transition-all disabled:opacity-50"
            >
              {addingExpense ? "Recording..." : "Record Expense"}
            </button>
          </form>
        )}

        {/* Expense History */}
        {(order.expenses || []).length > 0 ? (
          <div className="space-y-2">
            <h3 className="font-body text-[8px] tracking-[0.4em] uppercase text-muted mb-2">
              Expense List
            </h3>
            {order.expenses?.map((expense) => (
              <div
                key={expense._id}
                className="flex items-center justify-between py-2 border-b border-[rgba(255,255,255,0.04)]"
              >
                <div className="flex items-center gap-3">
                  <span className="font-body text-xs text-muted">
                    {new Date(expense.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                  <span className="font-body text-xs text-cream">{expense.description}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-display text-sm text-red-400">
                    -₦{expense.amount.toLocaleString()}
                  </span>
                  <button
                    onClick={() => deleteExpense(expense._id)}
                    className="text-red-500/60 hover:text-red-500 transition-colors p-1 cursor-pointer"
                    title="Delete Expense"
                  >
                    <X size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="font-body text-xs text-muted italic">No expenses recorded yet for this order.</p>
        )}
      </div>

      {/* ── Design Illustrations ── */}
      <div className="bg-surface border border-[rgba(255,255,255,0.08)] p-5 md:p-7">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display text-lg italic text-cream">Design Illustrations</h2>
          <button
            onClick={() => designInputRef.current?.click()}
            disabled={uploadingDesign}
            className="flex items-center gap-1.5 font-body text-[9px] tracking-[0.3em] uppercase text-brand hover:text-brand/80 transition-colors disabled:opacity-50"
          >
            <Upload size={13} />
            {uploadingDesign ? "Uploading..." : "Upload Design"}
          </button>
        </div>

        <input
          type="file"
          ref={designInputRef}
          onChange={handleDesignUpload}
          accept="image/*"
          className="hidden"
        />

        {(order.designImages || []).length === 0 ? (
          <div
            onClick={() => designInputRef.current?.click()}
            className="w-full h-40 border-2 border-dashed border-[rgba(255,255,255,0.12)] hover:border-brand flex items-center justify-center cursor-pointer transition-colors"
          >
            <div className="flex flex-col items-center text-muted">
              <ImageIcon size={28} className="mb-2 text-brand/40" />
              <span className="font-body text-[10px] tracking-wide uppercase">
                Upload design sketch or illustration
              </span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {(order.designImages || []).map((url, i) => (
              <div key={i} className="relative group aspect-square bg-surface2 overflow-hidden border border-[rgba(255,255,255,0.06)]">
                <img src={url} alt={`Design ${i + 1}`} className="w-full h-full object-cover" />
                <button
                  onClick={() => removeDesignImage(url)}
                  className="absolute top-2 right-2 w-7 h-7 bg-red-500/90 text-white flex items-center justify-center rounded-full opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
            {/* Add more button */}
            <button
              onClick={() => designInputRef.current?.click()}
              className="aspect-square border-2 border-dashed border-[rgba(255,255,255,0.12)] hover:border-brand flex flex-col items-center justify-center cursor-pointer transition-colors"
            >
              <Plus size={20} className="text-muted mb-1" />
              <span className="font-body text-[8px] tracking-wide uppercase text-muted">Add More</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
