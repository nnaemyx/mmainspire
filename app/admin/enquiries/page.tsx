"use client";

import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";

type Enquiry = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  collection?: string;
  eventDate?: string;
  message: string;
  status: string;
  createdAt: string;
};

export default function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  async function fetchEnquiries() {
    try {
      const res = await fetch("/api/enquiries");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setEnquiries(data);
        } else {
          setEnquiries([]);
        }
      }
    } catch (err) {
      console.error(err);
      setEnquiries([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this enquiry?")) return;

    try {
      const res = await fetch(`/api/enquiries/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete enquiry");
      setEnquiries((prev) => prev.filter((e) => e._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete enquiry.");
    }
  }

  return (
    <div>
      <h1 className="font-display text-2xl md:text-3xl italic text-cream mb-6 md:mb-8">Enquiries</h1>

      {loading ? (
        <p className="text-muted font-body">Loading...</p>
      ) : enquiries.length === 0 ? (
        <p className="text-muted font-body">No enquiries received yet.</p>
      ) : (
        <>
          {/* ── Card layout for tablet and below ── */}
          <div className="lg:hidden space-y-4">
            {enquiries.map((enquiry) => (
              <div
                key={enquiry._id}
                className="bg-surface border border-[rgba(255,255,255,0.08)] p-5"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-body text-sm text-cream font-medium">{enquiry.name}</h3>
                    <p className="font-body text-[10px] text-muted mt-0.5">
                      {new Date(enquiry.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {enquiry.collection && (
                      <span className="font-body text-[8px] tracking-[0.3em] uppercase text-brand bg-brand/10 px-2.5 py-1 capitalize">
                        {enquiry.collection.replace("-", " ")}
                      </span>
                    )}
                    <button
                      onClick={() => handleDelete(enquiry._id)}
                      className="w-8 h-8 rounded-full border border-red-500/20 hover:bg-red-500/10 text-red-400/80 hover:text-red-400 flex items-center justify-center transition-all cursor-pointer"
                      title="Delete Enquiry"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>

                <div className="space-y-2 mb-3">
                  <a
                    href={`mailto:${enquiry.email}`}
                    className="block font-body text-xs text-brand hover:underline break-all"
                  >
                    {enquiry.email}
                  </a>
                  {enquiry.phone && (
                    <a
                      href={`tel:${enquiry.phone}`}
                      className="block font-body text-xs text-muted hover:text-cream"
                    >
                      {enquiry.phone}
                    </a>
                  )}
                </div>

                <p className="font-body text-xs text-cream/80 leading-relaxed line-clamp-3">
                  {enquiry.message}
                </p>
              </div>
            ))}
          </div>

          {/* ── Table layout for large screens ── */}
          <div className="hidden lg:block bg-surface border border-[rgba(255,255,255,0.08)] overflow-x-auto">
            <table className="w-full text-left font-body text-sm text-cream whitespace-nowrap">
              <thead>
                <tr className="border-b border-[rgba(255,255,255,0.08)]">
                  <th className="p-4 font-normal text-muted uppercase tracking-widest text-[9px]">Date</th>
                  <th className="p-4 font-normal text-muted uppercase tracking-widest text-[9px]">Name</th>
                  <th className="p-4 font-normal text-muted uppercase tracking-widest text-[9px]">Contact</th>
                  <th className="p-4 font-normal text-muted uppercase tracking-widest text-[9px]">Collection</th>
                  <th className="p-4 font-normal text-muted uppercase tracking-widest text-[9px]">Message</th>
                  <th className="p-4 font-normal text-muted uppercase tracking-widest text-[9px]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {enquiries.map((enquiry) => (
                  <tr key={enquiry._id} className="border-b border-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.02)] transition-colors">
                    <td className="p-4">{new Date(enquiry.createdAt).toLocaleDateString()}</td>
                    <td className="p-4">{enquiry.name}</td>
                    <td className="p-4">
                      <div className="flex flex-col gap-1">
                        <a href={`mailto:${enquiry.email}`} className="text-brand hover:underline">{enquiry.email}</a>
                        {enquiry.phone && <a href={`tel:${enquiry.phone}`} className="text-xs text-muted hover:text-cream">{enquiry.phone}</a>}
                      </div>
                    </td>
                    <td className="p-4 capitalize">{enquiry.collection ? enquiry.collection.replace("-", " ") : "N/A"}</td>
                    <td className="p-4 max-w-xs truncate" title={enquiry.message}>{enquiry.message}</td>
                    <td className="p-4">
                      <button
                        onClick={() => handleDelete(enquiry._id)}
                        className="w-8 h-8 rounded-full border border-red-500/20 hover:bg-red-500/10 text-red-400/80 hover:text-red-400 flex items-center justify-center transition-all cursor-pointer"
                        title="Delete Enquiry"
                      >
                        <Trash2 size={13} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
