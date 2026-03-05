import Link from "next/link";

export default function AboutSection() {
  return (
    <section className="bg-canvas py-24 md:py-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-28 items-center">
        {/* Text */}
        <div>
          <span className="font-body text-[9px] tracking-[0.5em] uppercase text-brand mb-6 block">
            Our Story
          </span>
          <h2
            className="font-display italic text-cream leading-tight mb-6"
            style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)" }}
          >
            Dressed in culture,
            <br />
            inspired by you.
          </h2>
          <div className="w-10 h-px bg-brand mb-8" />
          <p className="font-body text-sm text-muted leading-loose tracking-wide mb-5 max-w-md">
            MmaInspire is a premium fashion house rooted in the rich cultural heritage of Anambra State, Nigeria. Founded with a deep passion for celebrating African elegance, we craft bespoke pieces that honor tradition while embracing modernity.
          </p>
          <p className="font-body text-sm text-muted leading-loose tracking-wide mb-12 max-w-md">
            From intricate traditional wear to breathtaking wedding gowns and stunning asoebi ensembles, every piece is lovingly tailored to tell your unique story.
          </p>
          <Link
            href="/about"
            className="inline-block font-body text-[10px] tracking-[0.35em] uppercase px-10 py-4 border border-brand text-brand hover:bg-brand hover:text-canvas transition-all duration-300"
          >
            Our Story
          </Link>
        </div>

        {/* Image with decorative accent */}
        <div className="relative">
          {/* Decorative border behind image */}
          <div
            className="absolute border border-brand/30"
            style={{
              bottom: "-20px",
              right: "-20px",
              width: "100%",
              height: "100%",
            }}
            aria-hidden="true"
          />
          {/* Image */}
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/14452561/pexels-photo-14452561.jpeg"
              alt="Stylish African woman in traditional dress in professional studio — Ali Drabo on Pexels"
              className="w-full object-cover"
              style={{ aspectRatio: "3/4" }}
              loading="lazy"
            />
            {/* Subtle brand green left accent */}
            <div className="absolute top-0 left-0 bottom-0 w-0.5 bg-brand/60" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
