import { HeroSection } from "@/components/sections/HeroSection";
import { ValuePropsSection } from "@/components/sections/ValuePropsSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { FaqSection } from "@/components/sections/FaqSection";
import { FooterSection } from "@/components/sections/FooterSection";

export default function Home() {
  return (
    <>
      <main className="relative min-h-screen">
        <HeroSection />
        <ValuePropsSection />
        <AboutSection />
        <ServicesSection />
        <GallerySection />
        <FaqSection />
      </main>
      <FooterSection />
    </>
  );
}
