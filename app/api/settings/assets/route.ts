import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import SiteAsset from "@/lib/models/SiteAsset";

export async function GET() {
  try {
    await connectToDatabase();
    const assets = await SiteAsset.find();
    return NextResponse.json(assets);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch assets" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { key, imageUrl } = await req.json();
    if (!key || !imageUrl) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    await connectToDatabase();
    
    const asset = await SiteAsset.findOneAndUpdate(
      { key },
      { imageUrl },
      { new: true, upsert: true }
    );
    
    return NextResponse.json(asset);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update asset" }, { status: 500 });
  }
}
