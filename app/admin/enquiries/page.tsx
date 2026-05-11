"use client";

import { useEffect, useState } from "react";

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
      const data = await res.json();
      setEnquiries(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1 className="font-display text-3xl italic text-cream mb-8">Enquiries</h1>

      {loading ? (
        <p className="text-muted font-body">Loading...</p>
      ) : enquiries.length === 0 ? (
        <p className="text-muted font-body">No enquiries received yet.</p>
      ) : (
        <div className="bg-surface border border-[rgba(255,255,255,0.08)] overflow-x-auto">
          <table className="w-full text-left font-body text-sm text-cream whitespace-nowrap">
            <thead>
              <tr className="border-b border-[rgba(255,255,255,0.08)]">
                <th className="p-4 font-normal text-muted uppercase tracking-widest text-[9px]">Date</th>
                <th className="p-4 font-normal text-muted uppercase tracking-widest text-[9px]">Name</th>
                <th className="p-4 font-normal text-muted uppercase tracking-widest text-[9px]">Contact</th>
                <th className="p-4 font-normal text-muted uppercase tracking-widest text-[9px]">Collection</th>
                <th className="p-4 font-normal text-muted uppercase tracking-widest text-[9px]">Message</th>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
