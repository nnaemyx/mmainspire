"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  MessageSquare,
  Image as ImageIcon,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Users,
  ClipboardList,
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close sidebar on route change
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Customers", href: "/admin/customers", icon: Users },
    { name: "Orders", href: "/admin/orders", icon: ClipboardList },
    { name: "Clothes", href: "/admin/clothes", icon: ShoppingBag },
    { name: "Enquiries", href: "/admin/enquiries", icon: MessageSquare },
    { name: "Site Images", href: "/admin/settings", icon: ImageIcon },
  ];

  return (
    <div className="min-h-screen bg-canvas flex flex-col lg:flex-row">
      {/* ── Mobile / Tablet Top Bar ── */}
      <header className="lg:hidden flex items-center justify-between px-5 py-4 bg-surface border-b border-[rgba(255,255,255,0.08)] sticky top-0 z-40">
        <div>
          <h2 className="font-display text-xl italic text-cream">Admin Panel</h2>
          <p className="font-body text-[8px] tracking-widest uppercase text-brand mt-0.5">MmaInspire</p>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="w-10 h-10 flex items-center justify-center text-cream hover:text-brand transition-colors"
          aria-label="Toggle navigation"
        >
          {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      {/* ── Backdrop (mobile/tablet) ── */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-72 bg-surface border-r border-[rgba(255,255,255,0.08)]
          flex flex-col z-50
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:w-64 lg:z-auto
        `}
      >
        {/* Sidebar Header — visible on desktop, hidden on mobile/tablet (top bar used instead) */}
        <div className="hidden lg:block p-6 mb-4">
          <h2 className="font-display text-2xl italic text-cream">Admin Panel</h2>
          <p className="font-body text-[10px] tracking-widest uppercase text-brand mt-1">MmaInspire</p>
        </div>

        {/* Close button inside sidebar on mobile/tablet */}
        <div className="lg:hidden flex items-center justify-between p-5 border-b border-[rgba(255,255,255,0.08)]">
          <span className="font-display text-lg italic text-cream">Navigation</span>
          <button
            onClick={() => setSidebarOpen(false)}
            className="w-8 h-8 flex items-center justify-center text-muted hover:text-cream transition-colors"
            aria-label="Close navigation"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 p-4 lg:px-6 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3.5 text-sm font-body tracking-wide transition-colors rounded-sm ${
                  isActive
                    ? "bg-brand/10 text-brand border-l-2 border-brand"
                    : "text-muted hover:text-cream hover:bg-[rgba(255,255,255,0.02)]"
                }`}
              >
                <item.icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto p-4 lg:p-6 border-t border-[rgba(255,255,255,0.08)] space-y-1">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-4 py-3 text-sm font-body tracking-wide text-muted hover:text-cream transition-colors"
          >
            <ExternalLink size={18} />
            View Site
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-body tracking-wide text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-colors"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main className="flex-1 p-5 md:p-8 lg:p-10 overflow-y-auto min-h-0">
        {children}
      </main>
    </div>
  );
}
