import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./lib/auth";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  if (path.startsWith("/admin") && path !== "/admin/login") {
    const token = request.cookies.get("admin_token")?.value;
    
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    // Since we are in Edge runtime, we use jose which supports Edge
    const verified = await verifyToken(token);
    if (!verified) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // Also protect API routes related to admin tasks
  if (path.startsWith("/api/clothes") && request.method !== "GET") {
    const token = request.cookies.get("admin_token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  if (path.startsWith("/api/enquiries") && request.method === "GET") {
    const token = request.cookies.get("admin_token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  if (path.startsWith("/api/settings")) {
    const token = request.cookies.get("admin_token")?.value;
    if (!token) {
      // In this specific site, assets are read publicly via server components or fetch GET
      if (request.method !== "GET") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/clothes/:path*", "/api/enquiries/:path*", "/api/settings/:path*"],
};
