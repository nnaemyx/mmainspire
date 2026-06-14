"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Collections", href: "/collections" },
  { label: "About Us", href: "/about" },
  { label: "Make an Enquiry", href: "/contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b transition-all duration-500 ${
          scrolled
            ? "bg-canvas/98 backdrop-blur-md border-[rgba(255,255,255,0.09)] shadow-[0_1px_20px_rgba(0,0,0,0.4)]"
            : "bg-canvas/96 backdrop-blur-sm border-[rgba(255,255,255,0.07)]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-16">
          {/* Left links — desktop */}
          <nav className="hidden md:flex items-center gap-10" aria-label="Primary navigation left">
            <Link
              href="/"
              className={`relative font-body text-[9px] tracking-[0.35em] uppercase transition-colors duration-300 ${
                isActive("/")
                  ? "text-brand"
                  : "text-cream/65 hover:text-brand"
              }`}
            >
              Home
              {isActive("/") && (
                <span className="absolute -bottom-1 left-0 w-full h-px bg-brand" />
              )}
            </Link>
            <Link
              href="/collections"
              className={`relative font-body text-[9px] tracking-[0.35em] uppercase transition-colors duration-300 ${
                isActive("/collections")
                  ? "text-brand"
                  : "text-cream/65 hover:text-brand"
              }`}
            >
              Collections
              {isActive("/collections") && (
                <span className="absolute -bottom-1 left-0 w-full h-px bg-brand" />
              )}
            </Link>
          </nav>

          {/* Logo — center */}
          <Link href="/" className="flex items-center gap-3 group" aria-label="MmaInspire Home">
            <Image
              src="/logo.png"
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
              className={`relative font-body text-[9px] tracking-[0.35em] uppercase transition-colors duration-300 ${
                isActive("/about")
                  ? "text-brand"
                  : "text-cream/65 hover:text-brand"
              }`}
            >
              About Us
              {isActive("/about") && (
                <span className="absolute -bottom-1 left-0 w-full h-px bg-brand" />
              )}
            </Link>
            <Link
              href="/contact"
              className={`font-body text-[9px] tracking-[0.35em] uppercase border px-5 py-2.5 transition-all duration-300 ${
                isActive("/contact")
                  ? "border-brand bg-brand text-canvas"
                  : "border-brand/50 text-cream/65 hover:bg-brand hover:text-canvas hover:border-brand"
              }`}
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

      {/* Mobile overlay backdrop */}
      <div
        className={`fixed inset-0 z-[99] bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile slide-in panel */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-100 w-[80vw] max-w-sm bg-canvas border-l border-[rgba(255,255,255,0.07)] flex flex-col transition-transform duration-400 ease-out md:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-[rgba(255,255,255,0.07)]">
          <Link href="/" onClick={() => setMobileOpen(false)}>
            <Image
              src="/logo.png"
              alt="MmaInspire"
              width={40}
              height={40}
              className="object-contain"
            />
          </Link>
          <button
            className="text-cream/60 hover:text-cream transition-colors"
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation menu"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="flex flex-col px-6 pt-10 gap-8 flex-1">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-body text-[11px] tracking-[0.35em] uppercase transition-all duration-300 ${
                isActive(link.href) ? "text-brand" : "text-cream/80 hover:text-brand"
              }`}
              onClick={() => setMobileOpen(false)}
              style={{
                opacity: mobileOpen ? 1 : 0,
                transform: mobileOpen ? "translateX(0)" : "translateX(20px)",
                transition: `opacity 0.4s ease ${i * 0.08 + 0.15}s, transform 0.4s ease ${i * 0.08 + 0.15}s, color 0.3s`,
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="p-6 border-t border-[rgba(255,255,255,0.07)]">
          <p className="font-body text-[9px] tracking-[0.4em] uppercase text-muted">
            Onitsha, Nigeria
          </p>
        </div>
      </div>
    </>
  );
}
