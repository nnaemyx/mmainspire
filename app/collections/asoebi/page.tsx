import type { Metadata } from "next";
import Link from "next/link";
import ItemCard from "@/components/ui/ItemCard";
import { collectionItems } from "@/lib/mock-items";
import { FadeUp, StaggerChildren, StaggerItem } from "@/components/ui/AnimateOnView";

export const metadata: Metadata = {
  title: "Asoebi — MmaInspire Collections",
  description:
    "Explore MmaInspire's Asoebi collection — bespoke lace, aso-oke and tulle creations for weddings, engagement ceremonies and social events.",
};

const items = collectionItems.filter((i) => i.collectionId === "asoebi");

const details = [
  "Group asoebi packages available",
  "Lace, aso-oke, and mixed fabrics",
  "Coordination for bridal trains & guests",
  "Express delivery for time-sensitive events",
];

export default function AsoebiPage() {
  return (
    <div className="bg-canvas">
      {/* ── Hero ──────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ minHeight: "75vh", display: "flex", alignItems: "flex-end" }}
      >
        <img
          src="https://images.pexels.com/photos/12118377/pexels-photo-12118377.jpeg"
          alt="Two women in elegant red asoebi dresses and gele headwraps — Korede Adenola on Pexels"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-canvas via-black/55 to-black/20" />

        <div className="relative z-10 px-8 md:px-20 pb-20 max-w-4xl">
          <span className="font-body text-[9px] tracking-[0.5em] uppercase text-brand mb-5 block">
            MmaInspire Collections
          </span>
          <h1
            className="font-display italic text-cream leading-tight mb-4"
            style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
          >
            Asoebi
          </h1>
          <p className="font-display italic text-cream/60 text-xl md:text-2xl">
            Unity in elegance. Celebration in style.
          </p>
        </div>
      </section>

      {/* ── Description ───────────────────────────────────── */}
      <FadeUp>
        <section className="py-16 md:py-20 border-b border-[rgba(255,255,255,0.07)]">
          <div className="max-w-7xl mx-auto px-8 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-start">
            <div>
              <p className="font-body text-sm text-muted leading-loose tracking-wide">
                The Asoebi collection is designed for those beautiful moments when families and friends come together. We specialize in bespoke asoebi styling for weddings, engagement ceremonies, and social events — creating coordinated looks that unify your group while allowing each individual to shine. Our lace, aso-oke, and tulle creations are nothing short of spectacular.
              </p>
            </div>
            <ul className="space-y-3">
              {details.map((d) => (
                <li key={d} className="flex items-start gap-3">
                  <span className="text-brand mt-1 text-xs">✦</span>
                  <span className="font-body text-xs text-muted tracking-wide">{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </FadeUp>

      {/* ── Items Grid ────────────────────────────────────── */}
      <section className="py-16 md:py-20 px-8 md:px-16 max-w-7xl mx-auto">
        <FadeUp className="mb-12">
          <span className="font-body text-[9px] tracking-[0.5em] uppercase text-brand mb-3 block">
            The Pieces
          </span>
          <h2
            className="font-display italic text-cream"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            All Asoebi Pieces
          </h2>
          <div className="w-10 h-px bg-brand mt-5" />
        </FadeUp>

        <StaggerChildren className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
          {items.map((item) => (
            <StaggerItem key={item.id}>
              <ItemCard {...item} />
            </StaggerItem>
          ))}
        </StaggerChildren>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-t border-[rgba(255,255,255,0.07)]">
        <img
          src="https://images.pexels.com/photos/29046518/pexels-photo-29046518.jpeg"
          alt="Beautiful Nigerian bride in red lace dress holding a rose — Darkshade Photos on Pexels"
          className="absolute inset-0 w-full h-full object-cover object-center"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/25" />
        <FadeUp className="relative z-10 py-24 md:py-32 px-8 md:px-20">
          <span className="font-body text-[9px] tracking-[0.5em] uppercase text-brand mb-5 block">
            Commission a Group Order
          </span>
          <h2
            className="font-display italic text-cream mb-10 max-w-lg"
            style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
          >
            Planning an event? Let's dress your tribe.
          </h2>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-block font-body text-[10px] tracking-[0.35em] uppercase px-10 py-4 border border-cream text-cream hover:bg-cream hover:text-canvas transition-all duration-300"
            >
              Make an Enquiry
            </Link>
            <Link
              href="/collections"
              className="inline-block font-body text-[10px] tracking-[0.35em] uppercase px-10 py-4 border border-cream/30 text-cream/50 hover:border-brand hover:text-brand transition-all duration-300"
            >
              All Collections
            </Link>
          </div>
        </FadeUp>
      </section>
    </div>
  );
}
