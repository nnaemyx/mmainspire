import { NextResponse } from "next/server";
import { signToken } from "@/lib/auth";
import connectToDatabase from "@/lib/db";
import Admin from "@/lib/models/Admin";
import { hashPassword } from "@/lib/crypto";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const normalizedEmail = email ? email.toLowerCase().trim() : "";

    const adminEmail = process.env.ADMIN_EMAIL || "admin@mmainspire.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

    let payload: any = null;

    if (normalizedEmail === adminEmail.toLowerCase().trim() && password === adminPassword) {
      payload = { role: "superadmin", email: normalizedEmail, name: "Super Admin", permissions: ["clothes", "customers", "orders"] };
    } else {
      await connectToDatabase();
      const admin = await Admin.findOne({ email: normalizedEmail });
      if (admin && admin.password === hashPassword(password)) {
        const perms = admin.permissions && admin.permissions.length > 0
          ? Array.from(admin.permissions)
          : ["orders"];
        payload = { role: "admin", email: normalizedEmail, id: admin._id.toString(), name: admin.name, permissions: perms };
      }
    }

    if (payload) {
      const token = await signToken(payload);

      const response = NextResponse.json({ success: true, user: payload });
      response.cookies.set({
        name: "admin_token",
        value: token,
        httpOnly: true,
        path: "/",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24, // 1 day
      });

      return response;
    } else {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
