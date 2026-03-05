import HeroSection from "@/components/sections/HeroSection";
import CollectionsSection from "@/components/sections/CollectionsSection";
import AboutSection from "@/components/sections/AboutSection";
import EnquirySection from "@/components/sections/EnquirySection";
import { FadeIn } from "@/components/ui/AnimateOnView";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FadeIn>
        <CollectionsSection />
      </FadeIn>
      <FadeIn>
        <AboutSection />
      </FadeIn>
      <FadeIn>
        <EnquirySection />
      </FadeIn>
    </>
  );
}
