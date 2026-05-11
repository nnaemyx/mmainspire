import Link from "next/link";

interface EnquirySectionProps {
  bgImage: string;
}

export default function EnquirySection({ bgImage }: EnquirySectionProps) {
  return (
    <section className="relative overflow-hidden" style={{ minHeight: "70vh", display: "flex", alignItems: "center" }}>
      {/* Background image */}
      <img
        src={bgImage}
        alt="Elegant portrait of a woman in a lace dress"
        className="absolute inset-0 w-full h-full object-cover object-top"
        loading="lazy"
      />

      {/* Directional overlay — darker on left for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/25" />

      {/* Content */}
      <div className="relative z-10 px-8 md:px-24 lg:px-32 py-20 max-w-2xl flex flex-col items-center text-center md:items-start md:text-left mx-auto md:mx-0">
        <span className="font-body text-[9px] tracking-[0.5em] uppercase text-brand mb-6 block">
          Ready to Begin?
        </span>
        <h2
          className="font-display italic text-cream leading-tight mb-10"
          style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
        >
          Make an Enquiry
          <br />
          Today
        </h2>
        <Link
          href="/contact"
          className="inline-block font-body text-[10px] tracking-[0.35em] uppercase px-10 py-4 border border-cream text-cream hover:bg-cream hover:text-canvas transition-all duration-300"
        >
          Make an Enquiry
        </Link>
      </div>
    </section>
  );
}
