import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Order from "@/lib/models/Order";
import Customer from "@/lib/models/Customer";
import Admin from "@/lib/models/Admin";

import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;
    const verified = token ? await verifyToken(token) : null;

    const { searchParams } = new URL(req.url);
    const customerId = searchParams.get("customer");
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: any = {};
    if (customerId) query.customer = customerId;
    if (status) query.status = status;

    // No order-level filtering by assignedTo; if the admin has the "orders" permission, they can view all orders.

    let orders = await Order.find(query)
      .populate("customer", "name phone")
      .populate("assignedTo", "name email")
      .sort({ createdAt: -1 });

    // Client-side-like search on populated fields
    if (search) {
      const s = search.toLowerCase();
      orders = orders.filter(
        (o: any) =>
          o.invoiceNumber?.includes(s) ||
          o.customer?.name?.toLowerCase().includes(s) ||
          o.customer?.phone?.includes(s)
      );
    }

    return NextResponse.json(orders);
  } catch (error: any) {
    console.error("GET orders error:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    await connectToDatabase();

    // Verify customer exists
    const customer = await Customer.findById(body.customer);
    if (!customer) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 });
    }

    const order = new Order(body);
    await order.save(); // Triggers pre-save hook for invoice number + totals

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("Create order error:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
