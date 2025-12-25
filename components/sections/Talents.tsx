"use client";

import { useCallback, useEffect, useState, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Heart, ArrowRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { PopupForm } from "@/components/sections/Popupform";
import Autoplay from "embla-carousel-autoplay";
import { useThemeStore } from "@/lib/store/useThemeStore";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const LikeButton = () => {
  const [liked, setLiked] = useState(false);

  return (
    <motion.button
      onClick={() => setLiked(!liked)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.8 }}
      className={cn(
        "absolute top-4 left-4 w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center transition-all duration-300 border",
        liked
          ? "bg-[#2C9F85]/20 border-[#2C9F85]/50 text-[#2C9F85]"
          : "bg-black/20 text-white border-white/10 hover:bg-black/40"
      )}
    >
      <motion.div
        animate={liked ? { scale: [1, 1.4, 1] } : { scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Heart className={cn("w-5 h-5", liked && "fill-current")} />
      </motion.div>
    </motion.button>
  );
};

type TalentSection = {
  id: number;
  title: string;
  category: string;
  description: string;
  price: string;
  image: string;
};

const talentSections: TalentSection[] = [
  {
    id: 1,
    title: "AI Web Development",
    category: "Intelligent & Scalable",
    description: "Handcrafted in micro-batches. Small-batch development captures the pure essence of AI-driven web growth.",
    price: "$5,000+",
    image: "/images/talents/ai.jpg",
  },
  {
    id: 2,
    title: "Mobile App Creation",
    category: "iOS & Android",
    description: "Seamless cross-platform experiences designed to engage users and drive conversions effectively.",
    price: "$8,000+",
    image: "/images/talents/mobile.jpg",
  },
  {
    id: 3,
    title: "E-Commerce Solutions",
    category: "Shopify & Custom",
    description: "Robust online stores with integrated AI sales agents to maximize your revenue around the clock.",
    price: "$6,500+",
    image: "/images/talents/ecom.jpg",
  },
  {
    id: 4,
    title: "Custom AI Agents",
    category: "Automation Bots",
    description: "Tailor-made AI assistants that automate your workflows and enhance customer support efficiency.",
    price: "$4,000+",
    image: "/images/talents/ai2.jpg",
  },
];

// 90-Degree Inverted Corner Curve (Same as PricingSection)
const CornerCurve = ({ className, fill }: { className?: string; fill: string }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    preserveAspectRatio="none"
  >
    <path
      d="M0 0 Q 0 100 100 100 L 0 100 Z"
      fill={fill}
    />
  </svg>
);

export function Talents() {
  const [autoplay] = useState(() =>
    Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "start",
      loop: true,
      slidesToScroll: 1,
      breakpoints: {
        "(min-width: 1024px)": { slidesToScroll: 1 },
        "(min-width: 768px)": { slidesToScroll: 2 },
        "(min-width: 640px)": { slidesToScroll: 1 },
      },
    },
    [autoplay]
  );

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const { theme } = useThemeStore();
  const [isDark, setIsDark] = useState(false);

  // Sync theme with DOM on mount and when theme changes
  useEffect(() => {
    const checkTheme = () => {
      if (typeof window !== "undefined") {
        const savedTheme = localStorage.getItem("theme");
        const isDarkMode = savedTheme
          ? savedTheme === "dark"
          : document.documentElement.classList.contains("dark");
        setIsDark(isDarkMode);
      }
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    if (typeof window !== "undefined") {
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      });
    }

    return () => observer.disconnect();
  }, [theme]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  useEffect(() => {
    return () => {
      autoplay.stop();
    };
  }, [autoplay]);

  return (
    <section className="pb-24 md:pb-36 px-4 sm:px-6 lg:pl-8 lg:pr-0 bg-background transition-colors duration-300 overflow-hidden">
      <div className="mx-auto max-w-[1800px]">
        {/* Section Header */}
        <div className="mb-12 px-2 text-center">
          <p
            className="text-xs mb-3 font-bold tracking-[0.2em] uppercase opacity-70"
            style={{ color: isDark ? "#ffffff" : "#000000" }}
          >
            OUR SERVICES
          </p>
          <h2
            className="text-3xl md:text-5xl font-black tracking-tighter"
            style={{ color: isDark ? "#ffffff" : "#000000" }}
          >
            Explore our <span className="text-[#2C9F85]">Solutions</span>
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <div className="overflow-hidden p-8 -m-8 pb-12" ref={emblaRef}>
            <div className="flex -ml-6 sm:-ml-8">
              {talentSections.map((section: TalentSection) => (
                <div
                  key={section.id}
                  className="flex-[0_0_100%] sm:flex-[0_0_60%] lg:flex-[0_0_40%] min-w-0 pl-6 sm:pl-8"
                >
                  {/* --- CARD WITH CUSTOM SHAPE --- */}
                  <div className="relative w-full min-h-[400px] md:min-h-[500px] flex flex-col group">

                    {/* Background & Shape */}
                    <div className="absolute inset-0 z-0 drop-shadow-xl transition-transform duration-300 group-hover:-translate-y-2">
                      {/* 1. Main Body */}
                      <div
                        className="absolute bottom-0 left-0 w-full rounded-b-[2.5rem] rounded-tr-[2.5rem] transition-colors duration-300"
                        style={{
                          backgroundColor: isDark ? "#1A1A1A" : "#FFFFFF",
                          height: 'calc(100% - 5rem)' // tabHeight 5rem
                        }}
                      />

                      {/* 2. Top-Left Tab */}
                      <div
                        className="absolute top-0 left-0 transition-colors duration-300"
                        style={{
                          backgroundColor: isDark ? "#1A1A1A" : "#FFFFFF",
                          width: '60%', // tabWidth
                          height: '5rem',
                          borderTopLeftRadius: '2.5rem',
                          borderTopRightRadius: '1.5rem',
                        }}
                      />

                      {/* 3. Connector */}
                      <div
                        className="absolute transition-colors duration-300"
                        style={{
                          top: '2.5rem', // curveTop (5rem - 2.5rem)
                          left: '60%',
                          width: '2.5rem',
                          height: '2.5rem',
                        }}
                      >
                        <CornerCurve fill={isDark ? "#1A1A1A" : "#FFFFFF"} className="w-full h-full block" />
                      </div>

                      {/* 4. Filler */}
                      <div
                        className="absolute left-0 transition-colors duration-300"
                        style={{
                          top: '4rem',
                          width: '60%',
                          height: '5rem',
                          backgroundColor: isDark ? "#1A1A1A" : "#FFFFFF"
                        }}
                      />
                    </div>

                    {/* Content Layer */}
                    <div className="relative z-10 h-full flex flex-col p-8 pt-10">

                      {/* Header Area (in Tab) */}
                      <div className="flex justify-between items-start mb-6">
                        <span
                          className="text-xs font-bold tracking-widest uppercase opacity-60 bg-black/5 dark:bg-white/10 px-3 py-1.5 rounded-full"
                          style={{ color: isDark ? "#ffffff" : "#000000" }}
                        >
                          {section.category}
                        </span>

                        {/* Action Button (Centered in the "Empty" Space) */}
                        <div
                          className="absolute top-0 right-0 h-[5rem] flex items-center justify-center z-20 pointer-events-none"
                          style={{ width: '40%' }} // The remaining space next to the 60% tab
                        >
                          <div className="pointer-events-auto">
                            <PopupForm
                              trigger={
                                <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#2C9F85] text-white text-xs font-bold tracking-wide shadow-lg transition-transform hover:scale-105 active:scale-95">
                                  Get Started <ArrowRight className="w-3.5 h-3.5" />
                                </button>
                              }
                            />
                          </div>
                        </div>
                      </div>

                      {/* Title & Desc */}
                      <div className="mb-6 relative z-10">
                        <h3
                          className="text-3xl font-black tracking-tight mb-3"
                          style={{ color: isDark ? "#ffffff" : "#000000" }}
                        >
                          {section.title}
                        </h3>
                        <p className={cn("text-base leading-relaxed opacity-70", isDark ? "text-neutral-300" : "text-neutral-600")}>
                          {section.description}
                        </p>
                      </div>

                      {/* Image Area */}
                      <div className="mt-auto relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-500">
                        <Image
                          src={section.image}
                          alt={section.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <LikeButton />
                      </div>

                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
