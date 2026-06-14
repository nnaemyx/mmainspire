"use client";

import { useEffect, useState } from "react";
import { Plus, X, Users, Mail, Trash2, Key, UserPlus, Edit } from "lucide-react";

type AdminUser = {
  _id: string;
  name: string;
  email: string;
  permissions?: string[];
  createdAt: string;
};

export default function ManageAdmins() {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingAdminId, setEditingAdminId] = useState<string | null>(null);

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [permissions, setPermissions] = useState<string[]>(["orders"]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchAdmins();
  }, []);

  async function fetchAdmins() {
    try {
      const res = await fetch("/api/admins");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setAdmins(data);
        } else {
          setAdmins([]);
        }
      }
    } catch (err) {
      console.error("Failed to load admins:", err);
      setAdmins([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email) return;
    if (!editingAdminId && !password) return;

    setSubmitting(true);
    try {
      const isEditing = !!editingAdminId;
      const url = isEditing ? `/api/admins/${editingAdminId}` : "/api/admins";
      const method = isEditing ? "PUT" : "POST";

      const bodyData: any = { name, email, permissions };
      if (password) bodyData.password = password;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || `Failed to ${isEditing ? "update" : "create"} admin`);
      }

      // Reset form
      setName("");
      setEmail("");
      setPassword("");
      setPermissions(["orders"]);
      setEditingAdminId(null);
      setShowForm(false);
      fetchAdmins();
    } catch (err: any) {
      console.error(err);
      alert(err.message || `Failed to ${editingAdminId ? "update" : "register"} admin.`);
    } finally {
      setSubmitting(false);
    }
  }

  function handleEditClick(admin: AdminUser) {
    setName(admin.name);
    setEmail(admin.email);
    setPassword("");
    setPermissions(admin.permissions && admin.permissions.length > 0 ? admin.permissions : ["orders"]);
    setEditingAdminId(admin._id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this admin account?")) return;

    try {
      const res = await fetch(`/api/admins/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete admin");
      setAdmins((prev) => prev.filter((a) => a._id !== id));
      if (editingAdminId === id) {
        // Reset form if we were editing the deleted admin
        setName("");
        setEmail("");
        setPassword("");
        setPermissions(["orders"]);
        setEditingAdminId(null);
        setShowForm(false);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to delete admin.");
    }
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 md:mb-8">
        <h1 className="font-display text-2xl md:text-3xl italic text-cream">Admin Accounts</h1>
        <button
          onClick={() => {
            if (showForm) {
              setName("");
              setEmail("");
              setPassword("");
              setPermissions(["orders"]);
              setEditingAdminId(null);
              setShowForm(false);
            } else {
              setShowForm(true);
            }
          }}
          className="flex items-center gap-2 font-body text-[10px] tracking-[0.35em] uppercase px-6 py-3 bg-brand text-canvas hover:bg-brand/85 transition-all duration-300"
        >
          {showForm ? (
            <>
              <X size={14} /> Cancel
            </>
          ) : (
            <>
              <UserPlus size={14} /> Register Admin
            </>
          )}
        </button>
      </div>

      {/* Add / Edit Admin Form */}
      {showForm && (
        <div className="bg-surface p-6 md:p-8 border border-[rgba(255,255,255,0.08)] mb-8">
          <h2 className="font-display text-xl italic text-cream mb-6">
            {editingAdminId ? `Edit Tasks for ${name}` : "Create New Admin Account"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label className="block font-body text-[9px] tracking-[0.4em] uppercase text-muted mb-2">
                  Full Name *
                </label>
                <input
                  required
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Chinedu Eze"
                  className="w-full bg-transparent border-b border-[rgba(255,255,255,0.18)] focus:border-brand text-cream font-body text-sm py-3 outline-none"
                />
              </div>
              <div>
                <label className="block font-body text-[9px] tracking-[0.4em] uppercase text-muted mb-2">
                  Email Address *
                </label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. chinedu@mmainspire.com"
                  className="w-full bg-transparent border-b border-[rgba(255,255,255,0.18)] focus:border-brand text-cream font-body text-sm py-3 outline-none"
                />
              </div>
              <div>
                <label className="block font-body text-[9px] tracking-[0.4em] uppercase text-muted mb-2">
                  {editingAdminId ? "Password (Leave blank to keep unchanged)" : "Password *"}
                </label>
                <input
                  required={!editingAdminId}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={editingAdminId ? "Enter new password or leave blank" : "Minimum 6 characters"}
                  minLength={6}
                  className="w-full bg-transparent border-b border-[rgba(255,255,255,0.18)] focus:border-brand text-cream font-body text-sm py-3 outline-none"
                />
              </div>
            </div>
            
            <div className="bg-surface2/40 p-4 border border-[rgba(255,255,255,0.04)]">
              <label className="block font-body text-[9px] tracking-[0.4em] uppercase text-brand mb-3.5">
                Assigned Tasks / Permissions
              </label>
              <div className="flex flex-col sm:flex-row gap-5">
                <label className="flex items-center gap-2.5 font-body text-xs text-cream cursor-pointer">
                  <input
                    type="checkbox"
                    checked={permissions.includes("clothes")}
                    onChange={(e) => {
                      if (e.target.checked) setPermissions([...permissions, "clothes"]);
                      else setPermissions(permissions.filter((p) => p !== "clothes"));
                    }}
                    className="accent-brand w-4 h-4"
                  />
                  Manage Clothes (Upload, Edit, Delete)
                </label>
                <label className="flex items-center gap-2.5 font-body text-xs text-cream cursor-pointer">
                  <input
                    type="checkbox"
                    checked={permissions.includes("customers")}
                    onChange={(e) => {
                      if (e.target.checked) setPermissions([...permissions, "customers"]);
                      else setPermissions(permissions.filter((p) => p !== "customers"));
                    }}
                    className="accent-brand w-4 h-4"
                  />
                  Manage Customers (Register, Measurements)
                </label>
                <label className="flex items-center gap-2.5 font-body text-xs text-cream cursor-pointer">
                  <input
                    type="checkbox"
                    checked={permissions.includes("orders")}
                    onChange={(e) => {
                      if (e.target.checked) setPermissions([...permissions, "orders"]);
                      else setPermissions(permissions.filter((p) => p !== "orders"));
                    }}
                    className="accent-brand w-4 h-4"
                  />
                  Manage Orders & Invoices
                </label>
              </div>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="font-body text-[10px] tracking-[0.35em] uppercase px-8 py-4 bg-brand text-canvas hover:bg-brand/85 transition-all duration-300 disabled:opacity-50"
            >
              {submitting
                ? (editingAdminId ? "Saving..." : "Registering...")
                : (editingAdminId ? "Save Changes" : "Register Admin")}
            </button>
          </form>
        </div>
      )}

      {/* Admin List */}
      {loading ? (
        <p className="text-muted font-body">Loading admin accounts...</p>
      ) : admins.length === 0 ? (
        <div className="text-center py-16">
          <Users size={48} className="mx-auto text-muted/30 mb-4" />
          <p className="text-muted font-body">No other admins registered yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {admins.map((admin) => (
            <div
              key={admin._id}
              className="bg-surface border border-[rgba(255,255,255,0.08)] p-5 hover:border-brand/30 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between">
                <div className="min-w-0 pr-2">
                  <h3 className="font-display text-lg italic text-cream group-hover:text-brand transition-colors truncate">
                    {admin.name}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-1 text-muted">
                    <Mail size={11} />
                    <span className="font-body text-xs truncate">{admin.email}</span>
                  </div>
                  <div className="mt-3.5 flex flex-wrap gap-1.5">
                    {(admin.permissions || []).map((p) => (
                      <span key={p} className="font-body text-[7px] tracking-widest uppercase text-brand bg-brand/10 px-2 py-0.5 border border-brand/20 capitalize">
                        {p}
                      </span>
                    ))}
                    {(!admin.permissions || admin.permissions.length === 0) && (
                      <span className="font-body text-[7px] tracking-widest uppercase text-muted bg-surface2 px-2 py-0.5">
                        No Tasks
                      </span>
                    )}
                  </div>
                  <div className="mt-2 text-[9px] font-body text-muted">
                    Created: {new Date(admin.createdAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </div>
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  <button
                    onClick={() => handleEditClick(admin)}
                    className="w-8 h-8 rounded-full border border-brand/20 hover:bg-brand/10 text-brand flex items-center justify-center transition-all cursor-pointer"
                    title="Edit Admin Tasks/Permissions"
                  >
                    <Edit size={13} />
                  </button>
                  <button
                    onClick={() => handleDelete(admin._id)}
                    className="w-8 h-8 rounded-full border border-red-500/20 hover:bg-red-500/10 text-red-400/80 hover:text-red-400 flex items-center justify-center transition-all cursor-pointer"
                    title="Delete Admin"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
