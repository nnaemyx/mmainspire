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

    const verified = await verifyToken(token);
    if (!verified) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    // Restrict regular admin role based on permissions
    if (verified.role === "admin" && verified.id) {
      const permissions: string[] = (verified.permissions as string[]) && (verified.permissions as string[]).length > 0
        ? (verified.permissions as string[])
        : ["orders"];
      let isAllowed = false;

      if (permissions.includes("clothes") && (path === "/admin/clothes" || path.startsWith("/admin/clothes/"))) {
        isAllowed = true;
      }
      if (permissions.includes("customers") && (path === "/admin/customers" || path.startsWith("/admin/customers/"))) {
        isAllowed = true;
      }
      if (permissions.includes("orders") && (path === "/admin/orders" || path.startsWith("/admin/orders/"))) {
        isAllowed = true;
      }

      if (!isAllowed) {
        if (permissions.includes("clothes")) {
          return NextResponse.redirect(new URL("/admin/clothes", request.url));
        } else if (permissions.includes("customers")) {
          return NextResponse.redirect(new URL("/admin/customers", request.url));
        } else if (permissions.includes("orders")) {
          return NextResponse.redirect(new URL("/admin/orders", request.url));
        } else {
          return NextResponse.redirect(new URL("/admin/login", request.url));
        }
      }
    }
  }

  // Protect and restrict API routes
  const isAdminApi =
    path.startsWith("/api/clothes") ||
    path.startsWith("/api/enquiries") ||
    path.startsWith("/api/settings") ||
    path.startsWith("/api/customers") ||
    path.startsWith("/api/orders") ||
    path.startsWith("/api/admins") ||
    path.startsWith("/api/reports");

  if (isAdminApi) {
    const token = request.cookies.get("admin_token")?.value;
    
    // Some routes allow public GET access
    const isPublicGet =
      (path.startsWith("/api/clothes") && request.method === "GET") ||
      (path.startsWith("/api/settings") && request.method === "GET");

    if (!isPublicGet) {
      if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      const verified = await verifyToken(token);
      if (!verified) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      // Restrict regular admins from sensitive endpoints based on permissions
      if (verified.role === "admin") {
        const permissions: string[] = (verified.permissions as string[]) && (verified.permissions as string[]).length > 0
          ? (verified.permissions as string[])
          : ["orders"];
        let isAllowedApi = false;

        if (permissions.includes("clothes") && path.startsWith("/api/clothes")) {
          isAllowedApi = true;
        }
        if (permissions.includes("customers") && path.startsWith("/api/customers")) {
          isAllowedApi = true;
        }
        if (permissions.includes("orders") && path.startsWith("/api/orders")) {
          isAllowedApi = true;
        }

        if (!isAllowedApi && path !== "/api/auth/me") {
          return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/clothes/:path*",
    "/api/enquiries/:path*",
    "/api/settings/:path*",
    "/api/customers/:path*",
    "/api/orders/:path*",
    "/api/admins/:path*",
    "/api/reports/:path*",
  ],
};
