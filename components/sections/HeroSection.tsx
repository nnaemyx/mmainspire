import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="bg-canvas overflow-hidden" style={{ minHeight: "100svh" }}>
      <div
        className="relative grid grid-cols-1 md:grid-cols-2"
        style={{ minHeight: "100svh" }}
      >
        {/* ── LEFT: Editorial text ─────────────────────────── */}
        <div
          className="relative z-10 flex flex-col justify-center px-8 md:px-14 lg:px-20 py-32 md:py-0 bg-canvas"
          style={{ minHeight: "100svh" }}
        >
          {/* Mobile: image as background */}
          <div className="md:hidden absolute inset-0 -z-10">
            <img
              src="https://res.cloudinary.com/mmainspire/image/upload/v1698521215/mmainspire/kc3pudrbh3aij5i57ryk.jpg"
              alt="MmaInspire fashion model"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-canvas/85 via-canvas/65 to-canvas/90" />
          </div>

          {/* Eyebrow */}
          <span className="font-body text-[9px] tracking-[0.55em] uppercase text-brand mb-8 block">
            Premium Bespoke Fashion
          </span>

          {/* Main headline — oversized editorial */}
          <h1
            className="font-display italic text-cream leading-[0.88] mb-8"
            style={{ fontSize: "clamp(4.5rem, 11vw, 11rem)" }}
          >
            Mma
            <br />
            Inspire
          </h1>

          {/* Accent line */}
          <div className="w-16 h-px bg-brand mb-8" />

          {/* Subtext */}
          <p className="font-body text-[10px] text-muted tracking-[0.35em] uppercase mb-12 leading-loose max-w-xs">
            Traditional Wear &nbsp;·&nbsp; Asoebi &nbsp;·&nbsp; Wedding Gowns
          </p>

          {/* CTA */}
          <div className="flex flex-wrap gap-4">
            <Link
              href="/collections"
              className="inline-block font-body text-[10px] tracking-[0.35em] uppercase px-10 py-4 border border-cream text-cream hover:bg-cream hover:text-canvas transition-all duration-300"
            >
              View Collections
            </Link>
            <Link
              href="/contact"
              className="inline-block font-body text-[10px] tracking-[0.35em] uppercase px-10 py-4 border border-brand/50 text-brand hover:bg-brand hover:text-canvas transition-all duration-300"
            >
              Make an Enquiry
            </Link>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-8 md:left-14 flex flex-col items-center gap-2">
            <span className="font-body text-[8px] tracking-[0.4em] uppercase text-cream/25">
              Scroll
            </span>
            <div className="w-px h-10 bg-gradient-to-b from-cream/25 to-transparent" />
          </div>

          {/* Vertical rule separating left and right — desktop */}
          <div className="hidden md:block absolute right-0 top-16 bottom-16 w-px bg-brand/15" />
        </div>

        {/* ── RIGHT: Model photo ───────────────────────────── */}
        <div className="hidden md:block relative overflow-hidden">
          <img
            src="https://res.cloudinary.com/mmainspire/image/upload/v1698521215/mmainspire/kc3pudrbh3aij5i57ryk.jpg"
            alt="MmaInspire fashion model in stunning bespoke attire"
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
          {/* Left edge fade to blend with dark left panel */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-canvas to-transparent" />
          {/* Subtle bottom fade */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-canvas/60 to-transparent" />
        </div>
      </div>
    </section>
  );
}
