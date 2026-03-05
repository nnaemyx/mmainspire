import type { Metadata } from "next";
import Link from "next/link";
import ItemCard from "@/components/ui/ItemCard";
import { collectionItems } from "@/lib/mock-items";

export const metadata: Metadata = {
  title: "Collections — MmaInspire",
  description:
    "Explore MmaInspire's curated collections: Traditional Wear, Asoebi, and Wedding Gowns. Bespoke fashion crafted in Onitsha, Nigeria.",
};

const collections = [
  {
    id: "traditional-wear",
    href: "/collections/traditional-wear",
    title: "Traditional Wear",
    tagline: "Rooted in heritage, crafted for today.",
    description:
      "Our Traditional Wear collection is a vibrant celebration of Nigerian cultural identity. Each piece is meticulously hand-crafted using premium fabrics — Ankara, George, Aso-oke, and Adire — interpreted through a contemporary lens. Whether for a naming ceremony, outing, or cultural festival, our traditional wear ensures you stand out with grace and authenticity.",
    details: [
      "Custom-tailored to your measurements",
      "Premium imported and locally sourced fabrics",
      "Available for all occasions",
      "Gele and headwrap styling available",
    ],
    image: "https://images.pexels.com/photos/32703119/pexels-photo-32703119.jpeg",
    imageAlt:
      "Striking portrait of a woman in colorful traditional attire and headwrap — Okiki Onipede on Pexels",
    image2: "https://images.pexels.com/photos/28733460/pexels-photo-28733460.jpeg",
    image2Alt:
      "A model in elegant traditional attire styled with green rollers outdoors in Abuja, Nigeria — Abdullahi Santuraki on Pexels",
  },
  {
    id: "asoebi",
    href: "/collections/asoebi",
    title: "Asoebi",
    tagline: "Unity in elegance. Celebration in style.",
    description:
      "The Asoebi collection is designed for those beautiful moments when families and friends come together. We specialize in bespoke asoebi styling for weddings, engagement ceremonies, and social events — creating coordinated looks that unify your group while allowing each individual to shine. Our lace, aso-oke, and tulle creations are nothing short of spectacular.",
    details: [
      "Group asoebi packages available",
      "Lace, aso-oke, and mixed fabrics",
      "Coordination for bridal trains & guests",
      "Express delivery for time-sensitive events",
    ],
    image: "https://images.pexels.com/photos/12118377/pexels-photo-12118377.jpeg",
    imageAlt:
      "Two women in elegant red asoebi dresses and gele headwraps showcasing traditional African style — Korede Adenola on Pexels",
    image2: "https://images.pexels.com/photos/29046518/pexels-photo-29046518.jpeg",
    image2Alt:
      "Beautiful Nigerian bride in red lace dress holding a rose — Darkshade Photos on Pexels",
  },
  {
    id: "wedding-gowns",
    href: "/collections/wedding-gowns",
    title: "Wedding Gowns",
    tagline: "Your dream gown, brought to life.",
    description:
      "Every bride deserves a gown as unique as her love story. Our Wedding Gowns collection combines timeless bridal silhouettes with modern craftsmanship and exquisite detailing. From hand-beaded bodices to dramatic cathedral trains, each gown is a masterpiece — designed in close collaboration with the bride to ensure it fits perfectly in every way.",
    details: [
      "One-on-one bridal consultations",
      "Multiple fittings included",
      "Beaded, lace, and silk options",
      "Matching accessories and veils",
    ],
    image: "https://images.pexels.com/photos/8271275/pexels-photo-8271275.jpeg",
    imageAlt:
      "Beautiful African bride posing elegantly in a stunning wedding gown — Deffo Manizo on Pexels",
    image2: "https://images.pexels.com/photos/11086563/pexels-photo-11086563.jpeg",
    image2Alt:
      "Stunning African bride in white traditional dress with turban — S and S Love Story on Pexels",
  },
];

export default function CollectionsPage() {
  return (
    <div className="bg-canvas">
      {/* ── Page Header ──────────────────────────────────────── */}
      <section className="py-28 md:py-36 text-center px-8">
        <span className="font-body text-[9px] tracking-[0.5em] uppercase text-brand mb-5 block">
          MmaInspire
        </span>
        <h1
          className="font-display italic text-cream mb-6"
          style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}
        >
          Our Collections
        </h1>
        <div className="w-12 h-px bg-brand mx-auto mb-8" />
        <p className="font-body text-sm text-muted tracking-wide max-w-lg mx-auto leading-loose">
          Explore our carefully curated collections — each piece a celebration of African
          elegance, culture, and artistry.
        </p>
      </section>

      {/* ── Collection Sections ──────────────────────────────── */}
      {collections.map((col, index) => {
        const items = collectionItems.filter((item) => item.collectionId === col.id);

        return (
          <section
            key={col.id}
            id={col.id}
            className="border-t border-[rgba(255,255,255,0.07)]"
          >
            {/* ── Overview: image + description ── */}
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Image side */}
              <div
                className={`relative overflow-hidden ${index % 2 !== 0 ? "md:order-last" : ""}`}
                style={{ minHeight: "60vh" }}
              >
                <img
                  src={col.image}
                  alt={col.imageAlt}
                  className="w-full h-full object-cover"
                  style={{ position: "absolute", inset: 0 }}
                  loading="lazy"
                />
                {/* Secondary corner image */}
                <div className="absolute bottom-6 right-6 w-32 md:w-44 border-2 border-canvas overflow-hidden">
                  <img
                    src={col.image2}
                    alt={col.image2Alt}
                    className="w-full aspect-square object-cover"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Text side */}
              <div
                className={`bg-surface flex flex-col justify-center px-10 md:px-14 lg:px-20 py-16 ${index % 2 !== 0 ? "md:order-first" : ""}`}
              >
                <span className="font-body text-[9px] tracking-[0.5em] uppercase text-brand mb-5 block">
                  Collection
                </span>
                <h2
                  className="font-display italic text-cream leading-tight mb-4"
                  style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
                >
                  {col.title}
                </h2>
                <p className="font-display italic text-muted text-lg mb-6">{col.tagline}</p>
                <div className="w-8 h-px bg-brand mb-8" />
                <p className="font-body text-sm text-muted leading-loose tracking-wide mb-8">
                  {col.description}
                </p>
                <ul className="space-y-3 mb-10">
                  {col.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-3">
                      <span className="text-brand mt-1 text-xs">✦</span>
                      <span className="font-body text-xs text-muted tracking-wide">
                        {detail}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href={col.href ?? `/collections/${col.id}`}
                    className="inline-block font-body text-[10px] tracking-[0.35em] uppercase px-8 py-4 border border-cream text-cream hover:bg-cream hover:text-canvas transition-all duration-300"
                  >
                    View Collection
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-block font-body text-[10px] tracking-[0.35em] uppercase px-8 py-4 border border-brand text-brand hover:bg-brand hover:text-canvas transition-all duration-300"
                  >
                    Enquire Now
                  </Link>
                </div>
              </div>
            </div>

            {/* ── Items Grid ───────────────────────────────────── */}
            {items.length > 0 && (
              <div className="bg-canvas px-8 md:px-14 lg:px-20 py-14 border-t border-[rgba(255,255,255,0.07)]">
                {/* Sub-header */}
                <div className="flex items-center justify-between mb-10">
                  <div>
                    <span className="font-body text-[8px] tracking-[0.5em] uppercase text-brand block mb-2">
                      {col.title}
                    </span>
                    <h3
                      className="font-display italic text-cream"
                      style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
                    >
                      Pieces from this Collection
                    </h3>
                  </div>
                  <Link
                    href="/contact"
                    className="hidden md:inline-block font-body text-[9px] tracking-[0.35em] uppercase px-6 py-3 border border-cream/30 text-cream/50 hover:border-brand hover:text-brand transition-all duration-300"
                  >
                    Enquire for Custom
                  </Link>
                </div>

                {/* 4-column item grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
                  {items.map((item) => (
                    <ItemCard key={item.id} {...item} />
                  ))}
                </div>

                {/* Mobile enquiry CTA */}
                <div className="mt-8 md:hidden">
                  <Link
                    href="/contact"
                    className="block text-center font-body text-[9px] tracking-[0.35em] uppercase px-6 py-3 border border-cream/30 text-cream/50 hover:border-brand hover:text-brand transition-all duration-300"
                  >
                    Enquire for a Custom Piece
                  </Link>
                </div>
              </div>
            )}
          </section>
        );
      })}

      {/* ── Bottom CTA ──────────────────────────────────────── */}
      <section className="py-24 md:py-32 text-center px-8 border-t border-[rgba(255,255,255,0.07)]">
        <span className="font-body text-[9px] tracking-[0.5em] uppercase text-brand mb-5 block">
          Let's Create Together
        </span>
        <h2
          className="font-display italic text-cream mb-8"
          style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
        >
          Ready to Begin Your Journey?
        </h2>
        <Link
          href="/contact"
          className="inline-block font-body text-[10px] tracking-[0.35em] uppercase px-12 py-4 border border-cream text-cream hover:bg-cream hover:text-canvas transition-all duration-300"
        >
          Make an Enquiry
        </Link>
      </section>
    </div>
  );
}
