import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Order from "@/lib/models/Order";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const { amount, note } = await req.json();

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: "Invalid payment amount" }, { status: 400 });
    }

    const order = await Order.findById(id);
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    order.payments.push({
      amount,
      date: new Date(),
      note: note || "",
    });

    await order.save(); // Recalculates advance & balance via pre-save hook

    const populated = await Order.findById(id).populate("customer");
    return NextResponse.json(populated);
  } catch (error) {
    console.error("Add payment error:", error);
    return NextResponse.json({ error: "Failed to add payment" }, { status: 500 });
  }
}
