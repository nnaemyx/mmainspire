import Link from "next/link";

interface CollectionCardProps {
  title: string;
  description: string;
  image: string;
  attribution: string;
  href: string;
}

export default function CollectionCard({
  title,
  description,
  image,
  attribution,
  href,
}: CollectionCardProps) {
  return (
    <Link
      href={href}
      className="group relative block overflow-hidden bg-surface"
      style={{ aspectRatio: "3/4" }}
    >
      <img
        src={image}
        alt={`MmaInspire ${title} — ${attribution}`}
        className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
        loading="lazy"
      />

      {/* Gradient overlay — always visible at bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-1 group-hover:translate-y-0 transition-transform duration-500 ease-out">
        <span className="block font-body text-[9px] tracking-[0.45em] uppercase text-brand mb-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75">
          Explore Collection
        </span>
        <h3 className="font-display text-3xl md:text-4xl italic text-cream leading-tight mb-3">
          {title}
        </h3>
        <p className="font-body text-xs text-cream/55 leading-relaxed tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-500 max-w-[260px]">
          {description}
        </p>
      </div>
    </Link>
  );
}
