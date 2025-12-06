import { Suspense } from "react";
import dynamic from "next/dynamic";
import { HeroSection } from "@/components/sections/HeroSection";
import { Talents } from "@/components/sections/Talents";

// Lazy load below-the-fold components for better performance
const AboutUs = dynamic(() => import("@/components/sections/AboutUs"), {
  loading: () => <div className="min-h-[400px]" />,
});

const OurTalents = dynamic(() => import("@/components/sections/OurTalents"), {
  loading: () => <div className="min-h-[400px]" />,
});

const Testimonials = dynamic(() => import("@/components/sections/Testimonials"), {
  loading: () => <div className="min-h-[400px]" />,
});

const Faq = dynamic(() => import("@/components/sections/Faq"), {
  loading: () => <div className="min-h-[400px]" />,
});

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Above the fold - loaded immediately */}
      <HeroSection />
      
      {/* Below the fold - lazy loaded */}
      <Suspense fallback={<div className="min-h-[400px]" />}>
        <AboutUs />
      </Suspense>
      
      <Talents />
      
      <Suspense fallback={<div className="min-h-[400px]" />}>
        <OurTalents />
      </Suspense>
      
      <Suspense fallback={<div className="min-h-[400px]" />}>
        <Testimonials />
      </Suspense>
      
      <Suspense fallback={<div className="min-h-[400px]" />}>
        <Faq />
      </Suspense>
    </div>
  );
}
