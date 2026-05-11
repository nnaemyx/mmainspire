import HeroSection from "@/components/sections/HeroSection";
import CollectionsSection from "@/components/sections/CollectionsSection";
import AboutSection from "@/components/sections/AboutSection";
import EnquirySection from "@/components/sections/EnquirySection";
import { FadeIn } from "@/components/ui/AnimateOnView";
import connectToDatabase from "@/lib/db";
import SiteAsset from "@/lib/models/SiteAsset";
import { getAssetUrl } from "@/lib/default-assets";

export const revalidate = 60; // revalidate at most every 60 seconds

export default async function Home() {
  await connectToDatabase();
  const rawAssets = await SiteAsset.find().lean();
  const assets = rawAssets.map((a: any) => ({ key: a.key, imageUrl: a.imageUrl }));

  const img = (key: string) => getAssetUrl(key, assets);

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
      <FadeIn>
        <AboutSection aboutImage={img("home-about")} />
      </FadeIn>
      <FadeIn>
        <EnquirySection bgImage={img("home-enquiry")} />
      </FadeIn>
    </>
  );
}
