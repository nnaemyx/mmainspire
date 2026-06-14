import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import connectToDatabase from "@/lib/db";
import Admin from "@/lib/models/Admin";
import { verifyToken } from "@/lib/auth";
import { hashPassword } from "@/lib/crypto";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;
    const verified = token ? await verifyToken(token) : null;

    if (!verified || verified.role !== "superadmin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await connectToDatabase();
    const { id } = await params;

    const deleted = await Admin.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ error: "Admin not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete admin" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;
    const verified = token ? await verifyToken(token) : null;

    if (!verified || verified.role !== "superadmin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await connectToDatabase();
    const { id } = await params;
    const body = await req.json();

    const updateData: any = {};
    if (body.name !== undefined) updateData.name = body.name;
    if (body.email !== undefined) updateData.email = body.email.toLowerCase().trim();
    if (body.password) {
      updateData.password = hashPassword(body.password);
    }
    if (body.permissions !== undefined) {
      const validPermissions = ["clothes", "customers", "orders"];
      updateData.permissions = body.permissions.filter((p: string) => validPermissions.includes(p));
    }

    const updated = await Admin.findByIdAndUpdate(id, updateData, { new: true });
    if (!updated) {
      return NextResponse.json({ error: "Admin not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      admin: {
        _id: updated._id,
        name: updated.name,
        email: updated.email,
        permissions: updated.permissions,
        createdAt: updated.createdAt,
      }
    });
  } catch (error) {
    console.error("Update admin error:", error);
    return NextResponse.json({ error: "Failed to update admin" }, { status: 500 });
  }
}
