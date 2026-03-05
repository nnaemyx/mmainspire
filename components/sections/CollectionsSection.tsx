"use client";

import Link from "next/link";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FadeUp, StaggerChildren, StaggerItem } from "@/components/ui/AnimateOnView";

const collections = [
  {
    title: "Traditional Wear",
    description:
      "Celebrating culture with vibrant, authentic Nigerian traditional attire crafted for every occasion.",
    image: "https://images.pexels.com/photos/32703119/pexels-photo-32703119.jpeg",
    attribution: "Okiki Onipede on Pexels",
    href: "/collections/traditional-wear",
  },
  {
    title: "Asoebi",
    description:
      "Elegant lace and aso-oke designs that unify and celebrate at weddings, ceremonies, and events.",
    image: "https://images.pexels.com/photos/12118377/pexels-photo-12118377.jpeg",
    attribution: "Korede Adenola on Pexels",
    href: "/collections/asoebi",
  },
  {
    title: "Wedding Gowns",
    description:
      "Bespoke bridal gowns that transform dreams into breathtaking reality on your most special day.",
    image: "https://images.pexels.com/photos/8271275/pexels-photo-8271275.jpeg",
    attribution: "Deffo Manizo on Pexels",
    href: "/collections/wedding-gowns",
  },
];

export default function CollectionsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  function scroll(dir: "left" | "right") {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.85;
    scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  }

  return (
    <section id="collections" className="bg-canvas overflow-hidden">
      {/* Section header */}
      <FadeUp className="text-center py-20 px-8">
        <span className="font-body text-[9px] tracking-[0.5em] uppercase text-brand mb-5 block">
          Our Collections
        </span>
        <h2
          className="font-display italic text-cream"
          style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
        >
          Shop the Collection
        </h2>
        <div className="w-12 h-px bg-brand mx-auto mt-7" />
      </FadeUp>

      {/* ── Horizontal scroll — mobile + tablet ─────────────────── */}
      <div className="relative">
        {/* Scroll arrows — tablet+ */}
        <button
          onClick={() => scroll("left")}
          className="hidden md:flex lg:hidden absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 items-center justify-center bg-canvas/80 border border-cream/20 text-cream/60 hover:text-brand hover:border-brand transition-all duration-300 backdrop-blur-sm"
          aria-label="Scroll left"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          onClick={() => scroll("right")}
          className="hidden md:flex lg:hidden absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 items-center justify-center bg-canvas/80 border border-cream/20 text-cream/60 hover:text-brand hover:border-brand transition-all duration-300 backdrop-blur-sm"
          aria-label="Scroll right"
        >
          <ChevronRight size={16} />
        </button>

        {/* Cards — horizontal scroll on mobile/tablet, 3-col grid on desktop */}
        <StaggerChildren>
          <div
            ref={scrollRef}
            className="flex lg:grid lg:grid-cols-3 overflow-x-auto snap-x snap-mandatory lg:overflow-x-visible"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {collections.map((col) => (
              <StaggerItem
                key={col.title}
                className="snap-start shrink-0 w-[82vw] sm:w-[60vw] md:w-[48vw] lg:w-auto"
              >
                <Link
                  href={col.href}
                  className="group relative block overflow-hidden bg-surface"
                  style={{ aspectRatio: "3/4" }}
                >
                  <img
                    src={col.image}
                    alt={`MmaInspire ${col.title} — ${col.attribution}`}
                    className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Always-visible bottom gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />

                  {/* Bottom content */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-1 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <span className="block font-body text-[9px] tracking-[0.45em] uppercase text-brand mb-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75">
                      Explore Collection
                    </span>
                    <h3 className="font-display text-3xl md:text-4xl italic text-cream leading-tight mb-3">
                      {col.title}
                    </h3>
                    <p className="font-body text-xs text-cream/55 leading-relaxed tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-500 max-w-[260px]">
                      {col.description}
                    </p>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </div>
        </StaggerChildren>

        {/* Mobile drag hint */}
        <div className="flex lg:hidden justify-center gap-1.5 pt-5 pb-2">
          {collections.map((_, i) => (
            <div key={i} className="w-1 h-1 rounded-full bg-cream/20" />
          ))}
        </div>
      </div>
    </section>
  );
}
