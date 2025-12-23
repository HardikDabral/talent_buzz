"use client";

import { useCallback, useEffect, useState, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Heart, ArrowRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { PopupForm } from "@/components/sections/Popupform";
import Autoplay from "embla-carousel-autoplay";
import { useThemeStore } from "@/lib/store/useThemeStore";

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
    <section className="pb-24 px-4 sm:px-6 lg:pl-8 lg:pr-0 bg-background transition-colors duration-300">
      <div className="mx-auto max-w-[1800px]">
        {/* Section Header */}
        <div className="mb-12 px-2 text-center">
          <p
            className="text-xs mb-2 font-medium tracking-wider uppercase"
            style={{ color: isDark ? "#ffffff" : "#000000" }}
          >
            OUR SERVICES
          </p>
          <h2
            className="text-3xl md:text-4xl font-semibold"
            style={{ color: isDark ? "#ffffff" : "#000000" }}
          >
            Explore our solutions
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <div className="overflow-hidden pb-10" ref={emblaRef}>
            <div className="flex -ml-6 sm:-ml-8">
              {talentSections.map((section: TalentSection) => (
                <div
                  key={section.id}
                  className="flex-[0_0_100%] sm:flex-[0_0_60%] lg:flex-[0_0_40%] min-w-0 pl-6 sm:pl-8"
                >
                  <div className="flex flex-col h-full">

                    {/* Top: Text Content */}
                    <div className="mb-6">
                      <span
                        className="text-xs font-semibold tracking-wide opacity-60 uppercase mb-2 block"
                        style={{ color: isDark ? "#ffffff" : "#000000" }}
                      >
                        {section.category}
                      </span>
                      <h3
                        className="text-2xl sm:text-3xl font-bold mb-3 leading-tight"
                        style={{ color: isDark ? "#ffffff" : "#000000" }}
                      >
                        {section.title}
                      </h3>
                      <p
                        className="text-sm sm:text-base leading-relaxed opacity-80 max-w-md"
                        style={{ color: isDark ? "#ffffff" : "#000000" }}
                      >
                        {section.description}
                      </p>
                    </div>

                    {/* Bottom: Image Card */}
                    <div
                      className="group relative flex flex-col rounded-[2rem] overflow-hidden transition-all duration-300 hover:shadow-2xl"
                      style={{
                        boxShadow: isDark ? "0 4px 30px rgba(0,0,0,0.5)" : "0 4px 30px rgba(0,0,0,0.1)"
                      }}
                    >
                      {/* Image Container */}
                      <div className="relative w-full aspect-[16/10] overflow-hidden">
                        <Image
                          src={section.image}
                          alt={section.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />

                        {/* Heart Icon Overlay */}
                        <button className="absolute top-4 left-4 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-white transition-colors hover:bg-black/40 border border-white/10">
                          <Heart className="w-5 h-5" />
                        </button>

                        {/* Bottom Bar Content Overlay */}
                        <div className="absolute bottom-4 left-4 right-4 bg-black/30 backdrop-blur-xl rounded-2xl p-2 sm:p-4 flex items-center justify-between border border-white/10">
                          <span className="text-white text-sm sm:text-lg font-bold">
                            {section.price}
                          </span>

                          <PopupForm
                            trigger={
                              <button
                                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white text-black flex items-center justify-center transition-transform hover:scale-110"
                              >
                                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                              </button>
                            }
                          />
                        </div>
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
