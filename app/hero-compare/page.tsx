import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import HeroSectionLight from "@/components/sections/HeroSectionLight";

export const metadata: Metadata = {
  title: "Hero Comparison — MmaInspire",
  description: "Side-by-side comparison of hero design variants.",
};

export default function HeroComparePage() {
  return (
    <div>
      {/* ── Variant A: Dark Overlay ─────────────────────── */}
      <div className="relative">
        {/* Label badge */}
        <div className="absolute top-20 right-6 z-20 bg-canvas/80 backdrop-blur-sm border border-cream/20 px-5 py-2.5">
          <p className="font-body text-[8px] tracking-[0.4em] uppercase text-cream/60">
            Variant A
          </p>
          <p className="font-body text-[10px] tracking-[0.25em] uppercase text-cream mt-0.5">
            Dark Overlay
          </p>
        </div>
        <HeroSection />
      </div>

      {/* Divider */}
      <div className="bg-canvas flex items-center gap-6 px-8 py-6 border-t border-b border-cream/10">
        <div className="flex-1 h-px bg-cream/10" />
        <span className="font-body text-[8px] tracking-[0.45em] uppercase text-cream/30">
          vs
        </span>
        <div className="flex-1 h-px bg-cream/10" />
      </div>

      {/* ── Variant B: Light / Ivory ────────────────────── */}
      <div className="relative">
        {/* Label badge */}
        <div className="absolute top-20 right-6 z-20 bg-ivory/85 backdrop-blur-sm border border-charcoal/15 px-5 py-2.5">
          <p
            className="font-body text-[8px] tracking-[0.4em] uppercase"
            style={{ color: "rgba(26,23,20,0.45)" }}
          >
            Variant B
          </p>
          <p className="font-body text-[10px] tracking-[0.25em] uppercase text-charcoal mt-0.5">
            White / Ivory
          </p>
        </div>
        <HeroSectionLight />
      </div>
    </div>
  );
}
