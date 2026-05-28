import type { Metadata } from "next";
import Link from "next/link";
import ItemCard from "@/components/ui/ItemCard";
import connectToDatabase from "@/lib/db";
import Clothing from "@/lib/models/Clothing";
import SiteAsset from "@/lib/models/SiteAsset";
import { getAssetUrl } from "@/lib/default-assets";
import { FadeUp, StaggerChildren, StaggerItem } from "@/components/ui/AnimateOnView";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Wedding Gowns — MmaInspire Collections",
  description:
    "Explore MmaInspire's Wedding Gowns collection — bespoke bridal gowns with hand-beaded bodices, cathedral trains and exquisite detailing.",
};

const details = [
  "One-on-one bridal consultations",
  "Multiple fittings included",
  "Beaded, lace, and silk options",
  "Matching accessories and veils",
];

export default async function WeddingGownsPage() {
  await connectToDatabase();
  const [dbItems, rawAssets] = await Promise.all([
    Clothing.find({ category: "wedding-gowns" }).sort({ createdAt: -1 }),
    SiteAsset.find({ key: { $in: ["wedding-hero", "wedding-cta"] } }).lean(),
  ]);

  const assets = (rawAssets as any[]).map((a) => ({ key: a.key, imageUrl: a.imageUrl }));
  const heroImage = getAssetUrl("wedding-hero", assets);
  const ctaImage = getAssetUrl("wedding-cta", assets);

  const items = dbItems.map((item) => ({
    id: item._id.toString(),
    name: item.title,
    tag: "Wedding Gowns",
    image: item.imageUrl,
    category: "wedding-gowns" as string,
    attribution: "MmaInspire",
  }));

  return (
    <div className="bg-canvas">
      {/* ── Hero ──────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ minHeight: "75vh", display: "flex", alignItems: "flex-end" }}
      >
        <img
          src={heroImage}
          alt="Wedding Gowns — MmaInspire"
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
            Wedding Gowns
          </h1>
          <p className="font-display italic text-cream/60 text-xl md:text-2xl">
            Your dream gown, brought to life.
          </p>
        </div>
      </section>

      {/* ── Description ───────────────────────────────────── */}
      <FadeUp>
        <section className="py-16 md:py-20 border-b border-[rgba(255,255,255,0.07)]">
          <div className="max-w-7xl mx-auto px-8 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-start">
            <div>
              <p className="font-body text-sm text-muted leading-loose tracking-wide">
                Every bride deserves a gown as unique as her love story. Our Wedding Gowns collection combines timeless bridal silhouettes with modern craftsmanship and exquisite detailing. From hand-beaded bodices to dramatic cathedral trains, each gown is a masterpiece — designed in close collaboration with the bride to ensure it fits perfectly in every way.
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
            All Wedding Gowns
          </h2>
          <div className="w-10 h-px bg-brand mt-5" />
        </FadeUp>

        {items.length === 0 ? (
          <p className="font-body text-sm text-muted py-8">No pieces have been added to this collection yet. Check back soon.</p>
        ) : (
          <StaggerChildren className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
            {items.map((item) => (
              <StaggerItem key={item.id}>
                <ItemCard {...item} />
              </StaggerItem>
            ))}
          </StaggerChildren>
        )}
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-t border-[rgba(255,255,255,0.07)]">
        <img
          src={ctaImage}
          alt="Begin your bridal journey — MmaInspire"
          className="absolute inset-0 w-full h-full object-cover object-center"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/25" />
        <FadeUp className="relative z-10 py-24 md:py-32 px-8 md:px-20">
          <span className="font-body text-[9px] tracking-[0.5em] uppercase text-brand mb-5 block">
            Begin Your Bridal Journey
          </span>
          <h2
            className="font-display italic text-cream mb-10 max-w-lg"
            style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
          >
            Book your bridal consultation today.
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
