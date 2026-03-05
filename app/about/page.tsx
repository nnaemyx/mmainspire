import type { Metadata } from "next";
import Link from "next/link";
import { FadeUp, SlideInLeft, SlideInRight, StaggerChildren, StaggerItem } from "@/components/ui/AnimateOnView";

export const metadata: Metadata = {
  title: "Our Story — MmaInspire",
  description:
    "Learn about MmaInspire — a premium bespoke fashion house rooted in the cultural heritage of Anambra State, Nigeria.",
};

const values = [
  {
    title: "Cultural Pride",
    description:
      "Every stitch is an act of cultural celebration. We honor the richness of Nigerian heritage in every design we create.",
  },
  {
    title: "Bespoke Craftsmanship",
    description:
      "No two pieces are alike. Each garment is custom-tailored with precision and care, ensuring a perfect fit and finish.",
  },
  {
    title: "Timeless Elegance",
    description:
      "We design for longevity. Our pieces transcend trends — they are heirlooms crafted for the most meaningful moments of your life.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-canvas">
      {/* ── Hero ──────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ minHeight: "70vh", display: "flex", alignItems: "flex-end" }}
      >
        <img
          src="https://images.pexels.com/photos/29133855/pexels-photo-29133855.jpeg"
          alt="Stylish African woman presenting chic fashion outdoors in Nigeria — Darkshade Photos on Pexels"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-canvas via-black/50 to-transparent" />

        <div className="relative z-10 px-8 md:px-20 pb-20 max-w-3xl">
          <span className="font-body text-[9px] tracking-[0.5em] uppercase text-brand mb-5 block">
            About MmaInspire
          </span>
          <h1
            className="font-display italic text-cream leading-tight"
            style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}
          >
            Rooted in culture.
            <br />
            Inspired by you.
          </h1>
        </div>
      </section>

      {/* ── Our Story ─────────────────────────────────────── */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-8 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-28 items-center">
          <SlideInLeft>
            <div className="relative">
              <div
                className="absolute border border-brand/25"
                style={{ top: "-20px", left: "-20px", width: "100%", height: "100%" }}
                aria-hidden="true"
              />
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/16669744/pexels-photo-16669744.jpeg"
                  alt="African woman in vibrant patterned outfit posing confidently in studio — Ali Drabo on Pexels"
                  className="w-full object-cover"
                  style={{ aspectRatio: "3/4" }}
                  loading="lazy"
                />
              </div>
            </div>
          </SlideInLeft>

          <SlideInRight>
            <div>
              <span className="font-body text-[9px] tracking-[0.5em] uppercase text-brand mb-6 block">
                Our Story
              </span>
              <h2
                className="font-display italic text-cream leading-tight mb-6"
                style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
              >
                Where heritage meets haute couture.
              </h2>
              <div className="w-10 h-px bg-brand mb-8" />
              <p className="font-body text-sm text-muted leading-loose tracking-wide mb-5">
                MmaInspire was born from a simple yet powerful belief — that African fashion deserves to be seen, celebrated, and worn with pride. Founded in the heart of Onitsha, Anambra State, we began as a small atelier with a big dream: to dress African women in garments that make them feel beautiful, powerful, and deeply connected to their roots.
              </p>
              <p className="font-body text-sm text-muted leading-loose tracking-wide mb-5">
                Over the years, we have grown into a premium bespoke fashion house trusted by brides, families, and fashion enthusiasts across Nigeria and beyond. Our collections span Traditional Wear, Asoebi, and Wedding Gowns — each category reflecting our commitment to quality, authenticity, and artistry.
              </p>
              <p className="font-body text-sm text-muted leading-loose tracking-wide">
                We believe that clothing is more than fabric — it is a language, a memory, and a legacy. At MmaInspire, we help you speak yours beautifully.
              </p>
            </div>
          </SlideInRight>
        </div>
      </section>

      {/* ── CEO / Founder Section ─────────────────────────── */}
      <section className="py-20 md:py-28 border-t border-[rgba(255,255,255,0.07)]">
        <div className="max-w-7xl mx-auto px-8 md:px-16">
          <FadeUp className="text-center mb-16">
            <span className="font-body text-[9px] tracking-[0.5em] uppercase text-brand mb-5 block">
              Meet the Founder
            </span>
            <h2
              className="font-display italic text-cream"
              style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)" }}
            >
              The Vision Behind MmaInspire
            </h2>
            <div className="w-10 h-px bg-brand mx-auto mt-6" />
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-24 items-center">
            {/* CEO Portrait Placeholder */}
            <SlideInLeft>
              <div className="relative">
                {/* Decorative border offset */}
                <div
                  className="absolute border border-brand/25"
                  style={{ top: "-20px", right: "-20px", width: "100%", height: "100%" }}
                  aria-hidden="true"
                />
                <div className="relative">
                  {/* Placeholder frame — engineer will replace with actual CEO photo */}
                  <div
                    className="w-full bg-surface border border-cream/10 flex flex-col items-center justify-center gap-5"
                    style={{ aspectRatio: "3/4" }}
                  >
                    {/* Monogram ring */}
                    <div className="w-24 h-24 border border-brand/40 flex items-center justify-center">
                      <span
                        className="font-display italic text-cream/30"
                        style={{ fontSize: "2.5rem" }}
                      >
                        M
                      </span>
                    </div>
                    <div className="text-center">
                      <p className="font-body text-[9px] tracking-[0.5em] uppercase text-muted mb-1">
                        Photo Coming Soon
                      </p>
                      <p className="font-body text-[8px] tracking-[0.3em] uppercase text-muted/50">
                        CEO Portrait
                      </p>
                    </div>
                  </div>
                  {/* Brand left accent line */}
                  <div className="absolute top-0 left-0 bottom-0 w-0.5 bg-brand/60" aria-hidden="true" />
                </div>
              </div>
            </SlideInLeft>

            {/* CEO Info */}
            <SlideInRight>
              <div>
                <span className="font-body text-[9px] tracking-[0.5em] uppercase text-brand mb-5 block">
                  Founder & Creative Director
                </span>
                <h3
                  className="font-display italic text-cream leading-tight mb-4"
                  style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
                >
                  [CEO Name]
                </h3>
                <div className="w-10 h-px bg-brand mb-8" />
                <p className="font-body text-sm text-muted leading-loose tracking-wide mb-5">
                  The visionary founder of MmaInspire, she built this fashion house from a deep passion for celebrating African elegance and cultural identity. With years of expertise in bespoke fashion design, she has dressed some of the most distinguished women across Nigeria and beyond.
                </p>
                <p className="font-body text-sm text-muted leading-loose tracking-wide mb-5">
                  A skilled artisan and creative entrepreneur, she combines an eye for detail with a profound respect for cultural heritage — resulting in pieces that are not merely beautiful, but deeply meaningful.
                </p>
                <p className="font-body text-sm text-muted leading-loose tracking-wide mb-10">
                  Her philosophy is simple: every woman deserves to feel extraordinary. Through MmaInspire, she continues to make that vision a reality — one bespoke piece at a time.
                </p>
                <Link
                  href="/contact"
                  className="inline-block font-body text-[10px] tracking-[0.35em] uppercase px-8 py-4 border border-brand text-brand hover:bg-brand hover:text-canvas transition-all duration-300"
                >
                  Work With Us
                </Link>
              </div>
            </SlideInRight>
          </div>
        </div>
      </section>

      {/* ── Values ────────────────────────────────────────── */}
      <section className="py-20 md:py-28 border-t border-[rgba(255,255,255,0.07)]">
        <div className="max-w-7xl mx-auto px-8 md:px-16">
          <FadeUp className="text-center mb-16">
            <span className="font-body text-[9px] tracking-[0.5em] uppercase text-brand mb-5 block">
              What We Stand For
            </span>
            <h2
              className="font-display italic text-cream"
              style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)" }}
            >
              Our Values
            </h2>
          </FadeUp>
          <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            {values.map((val) => (
              <StaggerItem key={val.title}>
                <div className="border-t border-brand/30 pt-8">
                  <h3 className="font-display text-2xl italic text-cream mb-4">{val.title}</h3>
                  <p className="font-body text-sm text-muted leading-loose tracking-wide">
                    {val.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-t border-[rgba(255,255,255,0.07)]">
        <img
          src="https://images.pexels.com/photos/14452561/pexels-photo-14452561.jpeg"
          alt="Stylish African woman in traditional dress in studio — Ali Drabo on Pexels"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/75" />
        <FadeUp className="relative z-10 py-28 px-8 text-center">
          <span className="font-body text-[9px] tracking-[0.5em] uppercase text-brand mb-5 block">
            Let's Work Together
          </span>
          <h2
            className="font-display italic text-cream mb-10"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
          >
            Ready to create something beautiful?
          </h2>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link
              href="/collections"
              className="inline-block font-body text-[10px] tracking-[0.35em] uppercase px-10 py-4 border border-cream text-cream hover:bg-cream hover:text-canvas transition-all duration-300"
            >
              View Collections
            </Link>
            <Link
              href="/contact"
              className="inline-block font-body text-[10px] tracking-[0.35em] uppercase px-10 py-4 border border-brand text-brand hover:bg-brand hover:text-canvas transition-all duration-300"
            >
              Make an Enquiry
            </Link>
          </div>
        </FadeUp>
      </section>
    </div>
  );
}
