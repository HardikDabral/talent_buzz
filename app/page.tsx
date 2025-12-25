import { Suspense } from "react";
import dynamic from "next/dynamic";
import { HeroSection } from "@/components/sections/HeroSection";
import { Talents } from "@/components/sections/Talents";

const WhoAreWe = dynamic(() => import("@/components/sections/WhoAreWe").then((mod) => mod.WhoAreWe), {
  loading: () => <div className="min-h-[400px]" />,
});

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

const PricingSection = dynamic(() => import("@/components/sections/PricingSection").then((mod) => mod.PricingSection), {
  loading: () => <div className="min-h-[400px]" />,
});

const UiKit = dynamic(() => import("@/components/sections/UiKit").then((mod) => mod.UiKit), {
  loading: () => <div className="min-h-[400px]" />,
});

const ContactUs = dynamic(() => import("@/components/sections/ContactUs").then((mod) => mod.ContactUs), {
  loading: () => <div className="min-h-[400px]" />,
});

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Above the fold - loaded immediately */}
      <HeroSection />

      <Suspense fallback={<div className="min-h-[400px]" />}>
        <WhoAreWe />
      </Suspense>

      {/* Below the fold - lazy loaded */}
      <Suspense fallback={<div className="min-h-[400px]" />}>
        <AboutUs />
      </Suspense>

      <Suspense fallback={<div className="min-h-[400px]" />}>
        <Talents />
      </Suspense>

      <Suspense fallback={<div className="min-h-[400px]" />}>
        <PricingSection />
      </Suspense>

      <Suspense fallback={<div className="min-h-[400px]" />}>
        <UiKit />
      </Suspense>

      <Suspense fallback={<div className="min-h-[400px]" />}>
        <Testimonials />
      </Suspense>

      <Suspense fallback={<div className="min-h-[400px]" />}>
        <Faq />
      </Suspense>

      <Suspense fallback={<div className="min-h-[400px]" />}>
        <ContactUs />
      </Suspense>
    </div>
  );
}
