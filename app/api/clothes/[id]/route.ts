import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Clothing from "@/lib/models/Clothing";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { id } = await params;

    const clothing = await Clothing.findById(id);
    if (!clothing) {
      return NextResponse.json({ error: "Clothing not found" }, { status: 404 });
    }
    return NextResponse.json(clothing);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch clothing" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { id } = await params;

    const deletedClothing = await Clothing.findByIdAndDelete(id);
    if (!deletedClothing) {
      return NextResponse.json({ error: "Clothing not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete clothing" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const body = await req.json();

    const updatedClothing = await Clothing.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!updatedClothing) {
      return NextResponse.json({ error: "Clothing not found" }, { status: 404 });
    }
    return NextResponse.json(updatedClothing);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update clothing" }, { status: 500 });
  }
}
