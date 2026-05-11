"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, ShoppingBag, MessageSquare, Image as ImageIcon, LogOut, ExternalLink } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

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
    { name: "Clothes", href: "/admin/clothes", icon: ShoppingBag },
    { name: "Enquiries", href: "/admin/enquiries", icon: MessageSquare },
    { name: "Site Images", href: "/admin/settings", icon: ImageIcon },
  ];

  return (
    <div className="min-h-screen bg-canvas flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-surface border-r border-[rgba(255,255,255,0.08)] p-6 flex flex-col">
        <div className="mb-10">
          <h2 className="font-display text-2xl italic text-cream">Admin Panel</h2>
          <p className="font-body text-[10px] tracking-widest uppercase text-brand mt-1">MmaInspire</p>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-body tracking-wide transition-colors ${
                  isActive ? "bg-brand/10 text-brand border-l-2 border-brand" : "text-muted hover:text-cream hover:bg-[rgba(255,255,255,0.02)]"
                }`}
              >
                <item.icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-6 border-t border-[rgba(255,255,255,0.08)] space-y-2">
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

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
