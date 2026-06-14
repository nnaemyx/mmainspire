import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import connectToDatabase from "@/lib/db";
import Order from "@/lib/models/Order";
import Admin from "@/lib/models/Admin";
import Customer from "@/lib/models/Customer";
import { verifyToken } from "@/lib/auth";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;
    const verified = token ? await verifyToken(token) : null;

    if (!verified) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const order = await Order.findById(id).populate("customer").populate("assignedTo", "name email");
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // If the admin has the "orders" permission, they are allowed to view details of any order.

    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch order" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;
    const verified = token ? await verifyToken(token) : null;

    if (!verified) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();

    const order = await Order.findById(id);
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Standard admin cannot re-assign work to other admins
    if (verified.role === "admin" && body.assignedTo !== undefined) {
      delete body.assignedTo;
    }

    // Update fields
    if (body.items !== undefined) order.items = body.items;
    if (body.status !== undefined) order.status = body.status;
    if (body.collectionDate !== undefined) order.collectionDate = body.collectionDate;
    if (body.designImages !== undefined) order.designImages = body.designImages;
    if (body.notes !== undefined) order.notes = body.notes;
    if (body.payments !== undefined) order.payments = body.payments;
    if (body.date !== undefined) order.date = body.date;
    
    // Only superadmin can assign order to admin
    if (verified.role === "superadmin" && body.assignedTo !== undefined) {
      order.assignedTo = body.assignedTo || undefined;
    }

    await order.save(); // Triggers pre-save hook to recalculate totals

    const populated = await Order.findById(id).populate("customer").populate("assignedTo", "name email");
    return NextResponse.json(populated);
  } catch (error) {
    console.error("Update order error:", error);
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;
    const verified = token ? await verifyToken(token) : null;

    if (!verified) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (verified.role !== "superadmin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;

    const deleted = await Order.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete order" }, { status: 500 });
  }
}
