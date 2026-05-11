import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Clothing from "@/lib/models/Clothing";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    
    await connectToDatabase();
    
    let query = {};
    if (category) {
      query = { category };
    }
    
    const clothes = await Clothing.find(query).sort({ createdAt: -1 });
    return NextResponse.json(clothes);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch clothes" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    await connectToDatabase();
    
    const clothing = await Clothing.create(body);
    return NextResponse.json(clothing, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create clothing" }, { status: 500 });
  }
}
