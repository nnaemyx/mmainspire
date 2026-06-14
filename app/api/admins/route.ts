import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import connectToDatabase from "@/lib/db";
import Admin from "@/lib/models/Admin";
import { verifyToken } from "@/lib/auth";
import { hashPassword } from "@/lib/crypto";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;
    const verified = token ? await verifyToken(token) : null;

    if (!verified || verified.role !== "superadmin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await connectToDatabase();
    // Exclude passwords
    const admins = await Admin.find({}).select("-password").sort({ createdAt: -1 });
    return NextResponse.json(admins);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch admins" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;
    const verified = token ? await verifyToken(token) : null;

    if (!verified || verified.role !== "superadmin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { name, email, password, permissions } = await req.json();
    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    await connectToDatabase();

    // Check if email already exists
    const existing = await Admin.findOne({ email: normalizedEmail });
    if (existing) {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 });
    }

    const hashedPassword = hashPassword(password);
    const newAdmin = new Admin({
      name,
      email: normalizedEmail,
      password: hashedPassword,
      role: "admin",
      permissions: permissions || ["orders"],
    });

    await newAdmin.save();

    // Remove password before returning
    const returned = newAdmin.toObject();
    delete returned.password;

    return NextResponse.json(returned, { status: 201 });
  } catch (error) {
    console.error("Create admin error:", error);
    return NextResponse.json({ error: "Failed to create admin" }, { status: 500 });
  }
}
