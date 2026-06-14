import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import connectToDatabase from "@/lib/db";
import Order from "@/lib/models/Order";
import { verifyToken } from "@/lib/auth";

export async function POST(
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
    const { amount, description, date } = await req.json();

    if (!amount || amount <= 0 || !description) {
      return NextResponse.json({ error: "Amount and description are required" }, { status: 400 });
    }

    const order = await Order.findById(id);
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Allowed to add expense if the admin has the "orders" permission (enforced by middleware)

    order.expenses.push({
      amount: Number(amount),
      description,
      date: date ? new Date(date) : new Date(),
    });

    await order.save();

    const populated = await Order.findById(id).populate("customer").populate("assignedTo", "name email");
    return NextResponse.json(populated);
  } catch (error) {
    console.error("Add expense error:", error);
    return NextResponse.json({ error: "Failed to add expense" }, { status: 500 });
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

    const { id } = await params;
    const { searchParams } = new URL(req.url);
    const expenseId = searchParams.get("expenseId");

    if (!expenseId) {
      return NextResponse.json({ error: "Expense ID is required" }, { status: 400 });
    }

    const order = await Order.findById(id);
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Allowed to delete expense if the admin has the "orders" permission (enforced by middleware)

    order.expenses = order.expenses.filter((e: any) => e._id.toString() !== expenseId);
    await order.save();

    const populated = await Order.findById(id).populate("customer").populate("assignedTo", "name email");
    return NextResponse.json(populated);
  } catch (error) {
    console.error("Delete expense error:", error);
    return NextResponse.json({ error: "Failed to delete expense" }, { status: 500 });
  }
}
