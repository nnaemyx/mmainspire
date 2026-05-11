"use client";

import { useState } from "react";

interface ItemCardProps {
  id?: string;
  name: string;
  tag: string;
  image: string;
  attribution?: string;
}

export default function ItemCard({ name, tag, image, attribution }: ItemCardProps) {
  const [loading, setLoading] = useState(false);

  async function handleEnquire() {
    setLoading(true);
    try {
      // 1. Save Enquiry to DB
      await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Anonymous User",
          email: "enquiry@whatsapp.link",
          message: `I clicked "Enquire" on the item: ${name} (${tag})`,
          collection: tag.toLowerCase(),
        }),
      });

      // 2. Format WhatsApp Message
      const adminPhone = process.env.NEXT_PUBLIC_ADMIN_WHATSAPP || "2348000000000"; 
      const text = `Hello MmaInspire, I am interested in this item:
Name: ${name}
Collection: ${tag}
Image: ${image}`;

      const waUrl = `https://wa.me/${adminPhone}?text=${encodeURIComponent(text)}`;
      
      // 3. Open WhatsApp in new tab
      window.open(waUrl, "_blank");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="group">
      {/* Image container */}
      <div
        className="relative overflow-hidden bg-surface"
        style={{ aspectRatio: "3/4" }}
      >
        <img
          src={image}
          alt={`MmaInspire — ${name} — ${attribution || ""}`}
          className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Enquire button — appears on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
          <button
            onClick={handleEnquire}
            disabled={loading}
            className="w-full block font-body text-[9px] tracking-[0.35em] uppercase py-3 border border-cream text-cream text-center hover:bg-cream hover:text-canvas transition-all duration-300 disabled:opacity-50"
          >
            {loading ? "Please wait..." : "Enquire via WhatsApp"}
          </button>
        </div>
      </div>

      {/* Caption */}
      <div className="pt-4">
        <p className="font-body text-[8px] tracking-[0.45em] uppercase text-brand mb-1.5">
          {tag}
        </p>
        <h4 className="font-display italic text-cream text-lg leading-snug">
          {name}
        </h4>
      </div>
    </div>
  );
}
