import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import connectToDatabase from "@/lib/db";
import Clothing from "@/lib/models/Clothing";
import ProductDetailClient from "./ProductDetailClient";

interface Props {
  params: Promise<{ category: string; id: string }>;
}

const categoryLabels: Record<string, string> = {
  "traditional-wear": "Traditional Wear",
  asoebi: "Asoebi",
  "wedding-gowns": "Wedding Gowns",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  await connectToDatabase();
  const { id } = await params;

  try {
    const item = await Clothing.findById(id).lean();
    if (!item) return { title: "Not Found — MmaInspire" };

    const i = item as any;
    return {
      title: `${i.title} — ${categoryLabels[i.category] || i.category} — MmaInspire`,
      description: i.description?.slice(0, 160) || `View ${i.title} from MmaInspire's ${categoryLabels[i.category]} collection.`,
    };
  } catch {
    return { title: "Not Found — MmaInspire" };
  }
}

export const revalidate = 60;

export default async function ProductDetailPage({ params }: Props) {
  await connectToDatabase();
  const { category, id } = await params;

  let item: any;
  try {
    const doc = await Clothing.findById(id).lean();
    if (!doc) notFound();
    item = {
      ...doc as any,
      _id: (doc as any)._id.toString(),
    };
  } catch {
    notFound();
  }

  // Get related items from the same category (excluding the current item)
  const relatedDocs = await Clothing.find({
    category: item.category,
    _id: { $ne: item._id },
  })
    .sort({ createdAt: -1 })
    .limit(4)
    .lean();

  const relatedItems = (relatedDocs as any[]).map((r) => ({
    id: r._id.toString(),
    name: r.title,
    tag: categoryLabels[r.category] || r.category,
    image: r.imageUrl,
    category: r.category,
    attribution: "MmaInspire",
  }));

  const categoryLabel = categoryLabels[item.category] || item.category;

  // Build the array of all images for the gallery
  const allImages: string[] = item.images && item.images.length > 0
    ? item.images
    : [item.imageUrl];

  const whatsappNumber = process.env.NEXT_PUBLIC_ADMIN_WHATSAPP || "2348060065236";

  return (
    <ProductDetailClient
      item={{
        _id: item._id,
        title: item.title,
        description: item.description,
        imageUrl: item.imageUrl,
        images: allImages,
        category: item.category,
        price: item.price,
      }}
      categoryLabel={categoryLabel}
      relatedItems={relatedItems}
      whatsappNumber={whatsappNumber}
    />
  );
}
