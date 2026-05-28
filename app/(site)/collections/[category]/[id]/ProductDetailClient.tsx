"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, MessageCircle, ArrowLeft, Maximize2 } from "lucide-react";
import ItemCard from "@/components/ui/ItemCard";
import { FadeUp, FadeIn, StaggerChildren, StaggerItem } from "@/components/ui/AnimateOnView";

interface ProductItem {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  images: string[];
  category: string;
  price?: number;
}

interface RelatedItem {
  id: string;
  name: string;
  tag: string;
  image: string;
  category: string;
  attribution: string;
}

interface Props {
  item: ProductItem;
  categoryLabel: string;
  relatedItems: RelatedItem[];
  whatsappNumber: string;
}

export default function ProductDetailClient({
  item,
  categoryLabel,
  relatedItems,
  whatsappNumber,
}: Props) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  function handleWhatsApp() {
    const text = `Hello MmaInspire, I am interested in this piece:\n\nName: ${item.title}\nCollection: ${categoryLabel}\nLink: ${typeof window !== "undefined" ? window.location.href : ""}`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  }

  function nextImage() {
    setSelectedImage((prev) => (prev + 1) % item.images.length);
  }

  function prevImage() {
    setSelectedImage((prev) => (prev - 1 + item.images.length) % item.images.length);
  }

  const formattedPrice = item.price
    ? `₦${item.price.toLocaleString()}`
    : null;

  return (
    <div className="bg-canvas min-h-screen">
      {/* ── Breadcrumb ─────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-6 pb-2">
        <nav className="flex items-center gap-2 font-body text-[9px] tracking-[0.3em] uppercase text-muted">
          <Link href="/" className="hover:text-brand transition-colors duration-200">Home</Link>
          <span className="text-cream/20">/</span>
          <Link href="/collections" className="hover:text-brand transition-colors duration-200">Collections</Link>
          <span className="text-cream/20">/</span>
          <Link href={`/collections/${item.category}`} className="hover:text-brand transition-colors duration-200">{categoryLabel}</Link>
          <span className="text-cream/20">/</span>
          <span className="text-cream/50">{item.title}</span>
        </nav>
      </div>

      {/* ── Product Content ────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-8 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14">
          {/* ── Left: Image Gallery ── */}
          <FadeIn>
            <div className="flex flex-col gap-4">
              {/* Main Image */}
              <div
                className="relative w-full overflow-hidden bg-surface group cursor-zoom-in"
                style={{ aspectRatio: "3/4" }}
                onClick={() => setIsZoomed(!isZoomed)}
              >
                <img
                  src={item.images[selectedImage]}
                  alt={item.title}
                  className={`w-full h-full object-cover transition-transform duration-700 ease-out ${isZoomed ? "scale-150" : "scale-100"}`}
                />

                {/* Zoom hint */}
                <div className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-black/50 backdrop-blur-sm text-cream/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Maximize2 size={14} />
                </div>

                {/* Navigation arrows — only if multiple images */}
                {item.images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => { e.stopPropagation(); prevImage(); }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/50 backdrop-blur-sm text-cream/80 hover:text-brand hover:bg-black/70 transition-all duration-200 opacity-0 group-hover:opacity-100"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); nextImage(); }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/50 backdrop-blur-sm text-cream/80 hover:text-brand hover:bg-black/70 transition-all duration-200 opacity-0 group-hover:opacity-100"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </>
                )}

                {/* Image counter */}
                {item.images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm px-3 py-1.5 font-body text-[9px] tracking-[0.2em] text-cream/70">
                    {selectedImage + 1} / {item.images.length}
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {item.images.length > 1 && (
                <div className="flex gap-2.5 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
                  {item.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => { setSelectedImage(index); setIsZoomed(false); }}
                      className={`shrink-0 w-16 h-20 md:w-20 md:h-24 overflow-hidden transition-all duration-300 ${
                        selectedImage === index
                          ? "border-2 border-brand opacity-100"
                          : "border border-[rgba(255,255,255,0.1)] opacity-50 hover:opacity-80"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${item.title} — Image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </FadeIn>

          {/* ── Right: Product Info ── */}
          <FadeUp>
            <div className="flex flex-col justify-center lg:py-6">
              {/* Category Badge */}
              <Link
                href={`/collections/${item.category}`}
                className="inline-block self-start font-body text-[8px] tracking-[0.5em] uppercase text-brand border border-brand/30 px-4 py-1.5 mb-6 hover:bg-brand/10 transition-all duration-200"
              >
                {categoryLabel}
              </Link>

              {/* Title */}
              <h1
                className="font-display italic text-cream leading-tight mb-4"
                style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
              >
                {item.title}
              </h1>

              {/* Price */}
              {formattedPrice ? (
                <p className="font-display text-2xl text-brand mb-6">{formattedPrice}</p>
              ) : (
                <p className="font-body text-xs tracking-[0.3em] uppercase text-muted mb-6">
                  Contact for Price
                </p>
              )}

              {/* Divider */}
              <div className="w-10 h-px bg-brand mb-8" />

              {/* Description */}
              <p className="font-body text-sm text-muted leading-loose tracking-wide mb-10 max-w-md">
                {item.description}
              </p>

              {/* WhatsApp CTA */}
              <button
                onClick={handleWhatsApp}
                className="group/btn flex items-center justify-center gap-3 w-full md:w-auto font-body text-[10px] tracking-[0.35em] uppercase px-10 py-4 bg-brand text-canvas hover:bg-brand/90 transition-all duration-300"
              >
                <MessageCircle size={16} className="transition-transform duration-300 group-hover/btn:scale-110" />
                Enquire via WhatsApp
              </button>

              {/* Secondary CTA */}
              <Link
                href={`/collections/${item.category}`}
                className="flex items-center gap-2 mt-5 font-body text-[9px] tracking-[0.3em] uppercase text-cream/50 hover:text-brand transition-colors duration-200 self-start"
              >
                <ArrowLeft size={13} />
                Back to {categoryLabel}
              </Link>

              {/* Details */}
              <div className="mt-12 border-t border-[rgba(255,255,255,0.07)] pt-8">
                <h3 className="font-body text-[9px] tracking-[0.4em] uppercase text-cream mb-4">Details</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-brand mt-0.5 text-xs">✦</span>
                    <span className="font-body text-xs text-muted tracking-wide">Hand-crafted with premium fabrics</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-brand mt-0.5 text-xs">✦</span>
                    <span className="font-body text-xs text-muted tracking-wide">Custom-tailored to your measurements</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-brand mt-0.5 text-xs">✦</span>
                    <span className="font-body text-xs text-muted tracking-wide">Worldwide shipping available</span>
                  </li>
                </ul>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Related Pieces ──────────────────────────────── */}
      {relatedItems.length > 0 && (
        <section className="border-t border-[rgba(255,255,255,0.07)] py-16 md:py-20 px-6 md:px-12 max-w-7xl mx-auto">
          <FadeUp className="mb-12">
            <span className="font-body text-[9px] tracking-[0.5em] uppercase text-brand mb-3 block">
              You May Also Like
            </span>
            <h2
              className="font-display italic text-cream"
              style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)" }}
            >
              Related Pieces
            </h2>
            <div className="w-10 h-px bg-brand mt-5" />
          </FadeUp>

          <StaggerChildren className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
            {relatedItems.map((r) => (
              <StaggerItem key={r.id}>
                <ItemCard {...r} />
              </StaggerItem>
            ))}
          </StaggerChildren>
        </section>
      )}
    </div>
  );
}
