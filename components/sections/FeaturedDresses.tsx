"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import ItemCard from "@/components/ui/ItemCard";
import { FadeUp } from "@/components/ui/AnimateOnView";

interface FeaturedItem {
  id: string;
  name: string;
  tag: string;
  image: string;
  category: string;
  attribution: string;
}

interface FeaturedDressesProps {
  collections: {
    id: string;
    label: string;
    tagline: string;
    items: FeaturedItem[];
  }[];
}

export default function FeaturedDresses({ collections }: FeaturedDressesProps) {
  const [activeTab, setActiveTab] = useState("all");

  // Only show collections that have items
  const activeCollections = collections.filter((c) => c.items.length > 0);

  if (activeCollections.length === 0) return null;

  // Flatten all items for the "All Pieces" view
  const allItems = activeCollections.flatMap((c) => c.items);

  // Define tabs dynamically based on collections that actually have items
  const tabs = [
    { id: "all", label: "All Pieces" },
    ...activeCollections.map((c) => ({ id: c.id, label: c.label })),
  ];

  // Filter items based on active tab
  const filteredItems = activeTab === "all"
    ? allItems
    : allItems.filter((item) => item.category === activeTab);

  // Get tagline for active collection
  const activeTagline = activeTab === "all"
    ? "A curated selection of our finest couture"
    : activeCollections.find((c) => c.id === activeTab)?.tagline || "";

  return (
    <section className="bg-canvas py-16 md:py-24 border-t border-[rgba(255,255,255,0.05)]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <FadeUp className="text-center mb-12">
          <span className="font-body text-[9px] tracking-[0.5em] uppercase text-brand mb-5 block">
            Explore Our Collections
          </span>
          <h2
            className="font-display italic text-cream mb-4"
            style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)" }}
          >
            Curated Creations
          </h2>
          <p className="font-body text-xs text-muted/65 italic tracking-wider max-w-md mx-auto">
            {activeTagline}
          </p>
          <div className="w-12 h-px bg-brand mx-auto mt-6" />
        </FadeUp>

        {/* Dynamic Navigation Tabs */}
        <FadeUp delay={0.1} className="flex flex-wrap justify-center gap-x-8 gap-y-4 border-b border-[rgba(255,255,255,0.06)] pb-px mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative pb-4 font-body text-[10px] tracking-[0.3em] uppercase transition-colors duration-300 ${
                activeTab === tab.id ? "text-brand" : "text-muted hover:text-cream"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </button>
          ))}
        </FadeUp>

        {/* Grid display with layout animations */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6 min-h-[400px]"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <ItemCard {...item} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Dynamic Bottom CTA Link */}
        <FadeUp delay={0.2} className="flex justify-center mt-16">
          <Link
            href={activeTab === "all" ? "/collections" : `/collections/${activeTab}`}
            className="font-body text-[10px] tracking-[0.35em] uppercase px-8 py-4 border border-cream/20 text-cream hover:border-brand hover:text-brand transition-all duration-300"
          >
            {activeTab === "all" ? "Explore Full Collection" : `Explore All ${tabs.find((t) => t.id === activeTab)?.label}`}
          </Link>
        </FadeUp>
      </div>
    </section>
  );
}
