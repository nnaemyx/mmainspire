import Link from "next/link";

export default function HeroSectionLight() {
  return (
    <section
      className="relative overflow-hidden bg-ivory"
      style={{ minHeight: "100svh" }}
    >
      {/* Wedding dress image — full on mobile, right 55% on desktop */}
      <div className="absolute inset-0 md:left-[45%] md:right-0 md:top-0 md:bottom-0">
        <img
          src="https://images.pexels.com/photos/34151497/pexels-photo-34151497.jpeg"
          alt="Stunning African bride in an elegant lace bridal gown — Mensa Bonsu on Pexels"
          className="w-full h-full object-cover object-top"
        />
        {/* Mobile: ivory tint so text stays readable */}
        <div
          className="md:hidden absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,253,249,0.88) 0%, rgba(255,253,249,0.6) 50%, rgba(255,253,249,0.88) 100%)",
          }}
        />
      </div>

      {/* Desktop: solid ivory left panel */}
      <div className="hidden md:block absolute left-0 top-0 bottom-0 w-[45%] bg-ivory" />

      {/* Vertical brand accent line — desktop only */}
      <div className="hidden md:block absolute top-12 bottom-12 left-[45%] w-px bg-brand/20" />

      {/* Text content */}
      <div
        className="relative z-10 flex flex-col justify-center items-center md:items-start text-center md:text-left px-8 md:px-16 lg:px-24 md:w-[45%]"
        style={{ minHeight: "100svh", paddingTop: "5rem", paddingBottom: "5rem" }}
      >
        {/* Eyebrow */}
        <span className="font-body text-[9px] tracking-[0.55em] uppercase text-brand mb-7 block">
          Welcome to
        </span>

        {/* Main headline */}
        <h1
          className="font-display font-black italic text-charcoal leading-none mb-5"
          style={{ fontSize: "clamp(3.5rem, 7.5vw, 7rem)" }}
        >
          Mma Inspire
        </h1>

        {/* Accent divider */}
        <div className="w-14 h-px bg-brand mb-7" />

        {/* Subheading */}
        <p
          className="font-body text-xs tracking-[0.35em] uppercase mb-12 max-w-xs leading-loose"
          style={{ color: "var(--color-charcoal-muted)" }}
        >
          Bespoke Fashion House · Traditional Wear · Asoebi · Wedding Gowns
        </p>

        {/* CTA */}
        <Link
          href="/collections"
          className="inline-block font-body text-[10px] tracking-[0.35em] uppercase px-10 py-4 border border-charcoal text-charcoal hover:bg-charcoal hover:text-ivory transition-all duration-300"
        >
          View Collections
        </Link>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 md:left-24 -translate-x-1/2 md:translate-x-0 flex flex-col items-center gap-2 z-10">
        <span
          className="font-body text-[8px] tracking-[0.4em] uppercase"
          style={{ color: "rgba(26,23,20,0.3)" }}
        >
          Scroll
        </span>
        <div
          className="w-px h-10"
          style={{
            background: "linear-gradient(to bottom, rgba(26,23,20,0.25), transparent)",
          }}
        />
      </div>
    </section>
  );
}
