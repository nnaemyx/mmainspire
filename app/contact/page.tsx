import type { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Make an Enquiry — MmaInspire",
  description:
    "Contact MmaInspire to commission your bespoke Traditional Wear, Asoebi or Wedding Gown. Based in Onitsha, Anambra State, Nigeria.",
};

export default function ContactPage() {
  return (
    <div className="bg-canvas">
      {/* Header */}
      <section className="py-24 md:py-32 px-8 text-center">
        <span className="font-body text-[9px] tracking-[0.5em] uppercase text-brand mb-5 block">
          Get in Touch
        </span>
        <h1
          className="font-display italic text-cream mb-6"
          style={{ fontSize: "clamp(3rem, 6vw, 5rem)" }}
        >
          Make an Enquiry
        </h1>
        <div className="w-12 h-px bg-brand mx-auto mb-8" />
        <p className="font-body text-sm text-muted tracking-wide max-w-md mx-auto leading-loose">
          Tell us about your vision and we will craft something extraordinary together.
        </p>
      </section>

      {/* Client-side form */}
      <ContactForm />
    </div>
  );
}
