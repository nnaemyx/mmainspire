import HeroSection from "@/components/sections/HeroSection";
import CollectionsSection from "@/components/sections/CollectionsSection";
import FeaturedDresses from "@/components/sections/FeaturedDresses";
import AboutSection from "@/components/sections/AboutSection";
import EnquirySection from "@/components/sections/EnquirySection";
import { FadeIn } from "@/components/ui/AnimateOnView";
import connectToDatabase from "@/lib/db";
import Clothing from "@/lib/models/Clothing";
import SiteAsset from "@/lib/models/SiteAsset";
import { getAssetUrl } from "@/lib/default-assets";

export const revalidate = 60; // revalidate at most every 60 seconds

const collectionsConfig = [
  { id: "traditional-wear", label: "Traditional Wear", tagline: "Rooted in heritage, crafted for today" },
  { id: "asoebi", label: "Asoebi", tagline: "Unity in elegance, celebration in style" },
  { id: "wedding-gowns", label: "Wedding Gowns", tagline: "Your dream gown, brought to life" },
];

export default async function Home() {
  await connectToDatabase();
  const [rawAssets, allClothes] = await Promise.all([
    SiteAsset.find().lean(),
    Clothing.find().sort({ createdAt: -1 }).lean(),
  ]);

  const assets = (rawAssets as any[]).map((a: any) => ({ key: a.key, imageUrl: a.imageUrl }));
  const img = (key: string) => getAssetUrl(key, assets);

  // Group items by category, limited to 4 per category
  const featuredCollections = collectionsConfig.map((col) => {
    const categoryItems = (allClothes as any[])
      .filter((item) => item.category === col.id)
      .slice(0, 4)
      .map((item) => ({
        id: item._id.toString(),
        name: item.title,
        tag: col.label,
        image: item.imageUrl,
        category: item.category,
        attribution: "MmaInspire",
      }));

    return {
      ...col,
      items: categoryItems,
    };
  });

  return (
    <>
      <HeroSection heroImage={img("home-hero")} />
      <FadeIn>
        <CollectionsSection
          images={{
            traditional: img("collection-card-traditional"),
            asoebi: img("collection-card-asoebi"),
            wedding: img("collection-card-wedding"),
          }}
        />
      </FadeIn>
      <FeaturedDresses collections={featuredCollections} />
      <FadeIn>
        <AboutSection aboutImage={img("home-about")} />
      </FadeIn>
      <FadeIn>
        <EnquirySection bgImage={img("home-enquiry")} />
      </FadeIn>
    </>
  );
}
