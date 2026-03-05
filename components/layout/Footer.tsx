import Link from "next/link";
import Image from "next/image";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Collections", href: "/collections" },
  { label: "About Us", href: "/about" },
  { label: "Make an Enquiry", href: "/contact" },
];

const collectionLinks = [
  { label: "Traditional Wear", href: "/collections/traditional-wear" },
  { label: "Asoebi", href: "/collections/asoebi" },
  { label: "Wedding Gowns", href: "/collections/wedding-gowns" },
];

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-[rgba(255,255,255,0.07)]">
      <div className="max-w-7xl mx-auto px-8 md:px-16 pt-16 pb-12 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
        {/* Brand Column */}
        <div>
          <Link href="/" className="inline-block mb-5">
            <Image
              src="https://res.cloudinary.com/mmainspire/image/upload/v1698277749/mmainspire/eralwmthytkztkwamzfs.png"
              alt="MmaInspire"
              width={52}
              height={52}
              className="object-contain"
            />
          </Link>
          <p className="font-body text-xs text-muted leading-loose tracking-wide mb-6 max-w-xs">
            Premium bespoke fashion house rooted in the rich cultural heritage of Anambra State, Nigeria.
          </p>
          <div className="flex items-center gap-5">
            <a
              href="https://instagram.com/mmainspire"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow MmaInspire on Instagram"
              className="text-muted hover:text-brand transition-colors duration-300"
            >
              <Instagram size={15} />
            </a>
            <a
              href="mailto:hello@mmainspire.com"
              aria-label="Email MmaInspire"
              className="text-muted hover:text-brand transition-colors duration-300"
            >
              <Mail size={15} />
            </a>
            <a
              href="tel:+2348000000000"
              aria-label="Call MmaInspire"
              className="text-muted hover:text-brand transition-colors duration-300"
            >
              <Phone size={15} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-body text-[9px] tracking-[0.4em] uppercase text-cream mb-7">
            Quick Links
          </h3>
          <ul className="space-y-4">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-body text-xs text-muted hover:text-brand transition-colors duration-300 tracking-wide"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Collections + Contact */}
        <div>
          <h3 className="font-body text-[9px] tracking-[0.4em] uppercase text-cream mb-7">
            Collections
          </h3>
          <ul className="space-y-4 mb-10">
            {collectionLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-body text-xs text-muted hover:text-brand transition-colors duration-300 tracking-wide"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-start gap-2.5 text-muted">
            <MapPin size={13} className="shrink-0 mt-0.5" />
            <span className="font-body text-xs tracking-wide leading-relaxed">
              Onitsha, Anambra State, Nigeria
            </span>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[rgba(255,255,255,0.07)] px-8 md:px-16 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
        <p className="font-body text-[9px] tracking-[0.35em] uppercase text-muted">
          © {new Date().getFullYear()} MmaInspire. All Rights Reserved.
        </p>
        <p className="font-body text-[9px] tracking-[0.35em] uppercase text-muted">
          Worldwide Shipping Available
        </p>
      </div>
    </footer>
  );
}
