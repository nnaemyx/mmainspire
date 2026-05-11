import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Clothing from "@/lib/models/Clothing";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    
    // We await params due to Next.js recent changes where params might be a promise.
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
