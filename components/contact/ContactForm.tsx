"use client";

import { useState } from "react";
import { Mail, MapPin, Instagram, CheckCircle } from "lucide-react";

const collectionOptions = [
  { value: "", label: "Select a collection" },
  { value: "traditional-wear", label: "Traditional Wear" },
  { value: "asoebi", label: "Asoebi" },
  { value: "wedding-gowns", label: "Wedding Gowns" },
  { value: "other", label: "Other / General Enquiry" },
];

interface FormData {
  name: string;
  email: string;
  phone: string;
  collection: string;
  eventDate: string;
  message: string;
}

const initialForm: FormData = {
  name: "",
  email: "",
  phone: "",
  collection: "",
  eventDate: "",
  message: "",
};

export default function ContactForm() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  }

  const inputClass =
    "w-full bg-transparent border-b border-[rgba(255,255,255,0.18)] focus:border-brand text-cream font-body text-sm tracking-wide py-4 outline-none transition-colors duration-300 placeholder:text-muted/60";

  const labelClass =
    "block font-body text-[9px] tracking-[0.45em] uppercase text-muted mb-2";

  if (submitted) {
    return (
      <div className="py-24 flex flex-col items-center text-center">
        <CheckCircle size={48} className="text-brand mb-6" />
        <h2 className="font-display text-4xl italic text-cream mb-4">Thank You</h2>
        <p className="font-body text-sm text-muted leading-loose tracking-wide mb-10 max-w-md">
          Your enquiry has been received. We will get back to you within 24–48 hours.
        </p>
        <button
          onClick={() => {
            setForm(initialForm);
            setSubmitted(false);
          }}
          className="font-body text-[10px] tracking-[0.35em] uppercase px-10 py-4 border border-brand text-brand hover:bg-brand hover:text-canvas transition-all duration-300"
        >
          Send Another Enquiry
        </button>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-8 md:px-16 pb-28 grid grid-cols-1 lg:grid-cols-5 gap-16 md:gap-20">
      {/* Form */}
      <form onSubmit={handleSubmit} className="lg:col-span-3" noValidate>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
          <div>
            <label htmlFor="name" className={labelClass}>Full Name *</label>
            <input id="name" name="name" type="text" required value={form.name} onChange={handleChange} placeholder="Your full name" className={inputClass} />
          </div>
          <div>
            <label htmlFor="email" className={labelClass}>Email Address *</label>
            <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} placeholder="your@email.com" className={inputClass} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
          <div>
            <label htmlFor="phone" className={labelClass}>Phone Number</label>
            <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+234 800 000 0000" className={inputClass} />
          </div>
          <div>
            <label htmlFor="eventDate" className={labelClass}>Event / Delivery Date</label>
            <input id="eventDate" name="eventDate" type="date" value={form.eventDate} onChange={handleChange} className={inputClass} style={{ colorScheme: "dark" }} />
          </div>
        </div>

        <div className="mb-8">
          <label htmlFor="collection" className={labelClass}>Collection Interest *</label>
          <select
            id="collection" name="collection" required
            value={form.collection} onChange={handleChange}
            className={`${inputClass} cursor-pointer`}
            style={{ appearance: "none" }}
          >
            {collectionOptions.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-surface text-cream">
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-12">
          <label htmlFor="message" className={labelClass}>Your Message *</label>
          <textarea
            id="message" name="message" required rows={6}
            value={form.message} onChange={handleChange}
            placeholder="Tell us about your vision, occasion, preferred fabrics, or any specific requests..."
            className={`${inputClass} resize-none`}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="font-body text-[10px] tracking-[0.35em] uppercase px-12 py-4 bg-brand text-canvas hover:bg-brand/85 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Sending..." : "Send Enquiry"}
        </button>
      </form>

      {/* Contact Info sidebar */}
      <aside className="lg:col-span-2 flex flex-col gap-10 lg:pt-4">
        <div>
          <h3 className="font-display text-2xl italic text-cream mb-6">Contact Information</h3>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <MapPin size={14} className="text-brand mt-1 shrink-0" />
              <div>
                <p className="font-body text-[9px] tracking-[0.4em] uppercase text-brand mb-1">Location</p>
                <p className="font-body text-sm text-muted tracking-wide leading-relaxed">Onitsha, Anambra State, Nigeria</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Mail size={14} className="text-brand mt-1 shrink-0" />
              <div>
                <p className="font-body text-[9px] tracking-[0.4em] uppercase text-brand mb-1">Email</p>
                <a href="mailto:hello@mmainspire.com" className="font-body text-sm text-muted hover:text-brand transition-colors tracking-wide">
                  hello@mmainspire.com
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Instagram size={14} className="text-brand mt-1 shrink-0" />
              <div>
                <p className="font-body text-[9px] tracking-[0.4em] uppercase text-brand mb-1">Instagram</p>
                <a href="https://instagram.com/mmainspire" target="_blank" rel="noopener noreferrer" className="font-body text-sm text-muted hover:text-brand transition-colors tracking-wide">
                  @mmainspire
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[rgba(255,255,255,0.08)] pt-10">
          <h4 className="font-body text-[9px] tracking-[0.4em] uppercase text-brand mb-4">Response Time</h4>
          <p className="font-body text-sm text-muted leading-loose tracking-wide">
            We typically respond within 24–48 hours. For urgent requests, please reach out via Instagram DM.
          </p>
        </div>

        <div className="bg-surface border border-[rgba(255,255,255,0.07)] p-6">
          <p className="font-body text-[9px] tracking-[0.4em] uppercase text-brand mb-3">✦ Worldwide Shipping</p>
          <p className="font-body text-xs text-muted leading-loose tracking-wide">
            We ship bespoke pieces to clients across Nigeria and internationally. Delivery timelines are discussed during consultation.
          </p>
        </div>
      </aside>
    </section>
  );
}
