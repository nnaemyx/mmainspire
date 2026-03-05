import Link from "next/link";

interface ItemCardProps {
  name: string;
  tag: string;
  image: string;
  attribution: string;
}

export default function ItemCard({ name, tag, image, attribution }: ItemCardProps) {
  return (
    <div className="group">
      {/* Image container */}
      <div
        className="relative overflow-hidden bg-surface"
        style={{ aspectRatio: "3/4" }}
      >
        <img
          src={image}
          alt={`MmaInspire — ${name} — ${attribution}`}
          className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Enquire button — appears on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
          <Link
            href="/contact"
            className="block font-body text-[9px] tracking-[0.35em] uppercase py-3 border border-cream text-cream text-center hover:bg-cream hover:text-canvas transition-all duration-300"
          >
            Enquire
          </Link>
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
    </div>
  );
}
