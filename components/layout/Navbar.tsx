"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Collections", href: "/collections" },
  { label: "About Us", href: "/about" },
  { label: "Make an Enquiry", href: "/contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-canvas/96 backdrop-blur-sm border-b border-[rgba(255,255,255,0.07)]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-16">
          {/* Left links — desktop */}
          <nav className="hidden md:flex items-center gap-10" aria-label="Primary navigation left">
            <Link
              href="/"
              className="font-body text-[9px] tracking-[0.35em] uppercase text-cream/65 hover:text-brand transition-colors duration-300"
            >
              Home
            </Link>
            <Link
              href="/collections"
              className="font-body text-[9px] tracking-[0.35em] uppercase text-cream/65 hover:text-brand transition-colors duration-300"
            >
              Collections
            </Link>
          </nav>

          {/* Logo — center */}
          <Link href="/" className="flex items-center gap-3 group" aria-label="MmaInspire Home">
            <Image
              src="https://res.cloudinary.com/mmainspire/image/upload/v1698277749/mmainspire/eralwmthytkztkwamzfs.png"
              alt="MmaInspire Logo"
              width={44}
              height={44}
              className="object-contain"
              priority
            />
            <span className="hidden sm:block font-body text-[9px] tracking-[0.45em] uppercase text-cream/75 group-hover:text-cream transition-colors duration-300">
              Mma Inspire
            </span>
          </Link>

          {/* Right links — desktop */}
          <nav className="hidden md:flex items-center gap-10" aria-label="Primary navigation right">
            <Link
              href="/about"
              className="font-body text-[9px] tracking-[0.35em] uppercase text-cream/65 hover:text-brand transition-colors duration-300"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="font-body text-[9px] tracking-[0.35em] uppercase text-cream/65 border border-brand/50 px-5 py-2.5 hover:bg-brand hover:text-canvas hover:border-brand transition-all duration-300"
            >
              Make an Enquiry
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-cream/75 hover:text-cream transition-colors p-1"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </header>

      {/* Mobile full-screen overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-100 bg-canvas flex flex-col items-center justify-center gap-10">
          <button
            className="absolute top-5 right-6 text-cream/60 hover:text-cream transition-colors"
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation menu"
          >
            <X size={24} />
          </button>

          <Link href="/" onClick={() => setMobileOpen(false)} className="mb-2">
            <Image
              src="https://res.cloudinary.com/mmainspire/image/upload/v1698277749/mmainspire/eralwmthytkztkwamzfs.png"
              alt="MmaInspire"
              width={64}
              height={64}
              className="object-contain"
            />
          </Link>

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-display text-4xl italic text-cream/80 hover:text-brand transition-colors duration-300"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          <div className="absolute bottom-10 font-body text-[9px] tracking-[0.4em] uppercase text-muted">
            Onitsha, Nigeria
          </div>
        </div>
      )}
    </>
  );
}
