"use client";

import Link from "next/link";

interface ItemCardProps {
  id: string;
  name: string;
  tag: string;
  image: string;
  category: string;
  attribution?: string;
}

export default function ItemCard({ id, name, tag, image, category, attribution }: ItemCardProps) {
  return (
    <Link href={`/collections/${category}/${id}`} className="group block">
      {/* Image container */}
      <div
        className="relative overflow-hidden bg-surface"
        style={{ aspectRatio: "3/4" }}
      >
        <img
          src={image}
          alt={`MmaInspire — ${name} — ${attribution || ""}`}
          className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* View Details — appears on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
          <span className="w-full block font-body text-[9px] tracking-[0.35em] uppercase py-3 border border-cream text-cream text-center hover:bg-cream hover:text-canvas transition-all duration-300">
            View Details
          </span>
        </div>
      </div>

      {/* Caption */}
      <div className="pt-4">
        <p className="font-body text-[8px] tracking-[0.45em] uppercase text-brand mb-1.5">
          {tag}
        </p>
        <h4 className="font-display italic text-cream text-lg leading-snug">
          {name}
        </h4>
      </div>
    </Link>
  );
}
