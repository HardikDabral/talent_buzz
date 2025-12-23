"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useThemeStore } from "@/lib/store/useThemeStore";

import "swiper/css";
import "swiper/css/autoplay";

type AboutUsCard = {
  id: number;
  title: string;
  description: string;
  bigImage: string;
  subTitle?: string;
};

const aboutUsCards: AboutUsCard[] = [
  {
    id: 1,
    title: "GLASSMORPHISM",
    subTitle: "MODERN UI",
    description: "Sleek, Translucent, Premium",
    bigImage: "/images/talents/glassy.jpg",
  },
  {
    id: 2,
    title: "ANDROID APPS",
    subTitle: "MOBILE FIRST",
    description: "Native, Fast, Scalable",
    bigImage: "/images/talents/android.jpg",
  },
  {
    id: 3,
    title: "BETTING APPS",
    subTitle: "HIGH PERFORMANCE",
    description: "Real-time, Secure, robust",
    bigImage: "/images/talents/bet.jpg",
  },
  {
    id: 4,
    title: "E-COMMERCE",
    subTitle: "SHOPIFY & CUSTOM",
    description: "Sales-driven, Optimized, Clean",
    bigImage: "/images/talents/ecomm.jpg",
  },
  {
    id: 5,
    title: "SaaS PLATFORMS",
    subTitle: "SCALABLE",
    description: "Multi-tenant, Cloud-native, Secure",
    bigImage: "/images/talents/saas.jpg",
  },
  {
    id: 6,
    title: "PORTFOLIOS",
    subTitle: "PERSONAL BRAND",
    description: "Unique, Creative, Minimalist",
    bigImage: "/images/talents/port.jpg",
  },
];

export default function AboutUs() {
  const { theme } = useThemeStore();
  const [isDark, setIsDark] = useState(false);

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

  return (
    <section id="about" className="py-24 px-4 sm:px-6 bg-background overflow-hidden relative w-full transition-colors duration-300">
      <div className="mx-auto max-w-[1800px] relative">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p
            className="text-xs mb-2 font-medium tracking-wider uppercase"
            style={{ color: isDark ? "#ffffff" : "#000000" }}
          >
            WHAT WE BUILD
          </p>
          <h2
            className="text-3xl md:text-4xl font-semibold"
            style={{ color: isDark ? "#ffffff" : "#000000" }}
          >
            Crafting Digital Excellence
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative z-10 w-full">
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            loop={true}
            speed={800}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
            modules={[Autoplay]}
            className="w-full !overflow-visible py-10"
            wrapperClass="!ease-[cubic-bezier(0.25,0.1,0.25,1)] flex items-center"
          >
            {aboutUsCards.map((card: AboutUsCard) => (
              <SwiperSlide key={card.id} className="!h-auto !flex !justify-center !items-center group/slide z-10 hover:z-40 transition-all duration-500">
                <div
                  className="w-full flex justify-center pl-4"
                >
                  {/* 
                      Expanded Card
                      Default: h-72 w-72 (Circle)
                      Hover: w-[480px] (Pill)
                  */}
                  <div className={`relative flex items-center rounded-full transition-all duration-500 cubic-bezier(0.25, 0.46, 0.45, 0.94) h-72 w-72 group-hover/slide:w-[480px] skew-x-0 transform-gpu ${isDark ? 'bg-black' : 'bg-white'}`}>

                    {/* Image Container 
                        Start: w-full (72) -> Full Circle
                        Hover: w-36 (Half of 72) -> Semi Circle
                    */}
                    <div className={`relative h-full w-full group-hover/slide:w-36 shrink-0 overflow-hidden rounded-full group-hover/slide:rounded-r-none transition-[width] duration-500 ease-in-out z-10 ${isDark ? 'bg-black' : 'bg-white'}`}>
                      <Image
                        src={card.bigImage}
                        alt={card.title}
                        width={288}
                        height={288}
                        className="h-full w-[288px] max-w-none object-cover transition-transform duration-700 group-hover/slide:scale-110"
                      />
                    </div>

                    {/* Text Content - Right Side */}
                    <div className="absolute right-0 top-0 bottom-0 flex flex-col justify-center w-[calc(100%-9rem)] pl-6 pr-8 opacity-0 group-hover/slide:opacity-100 transition-opacity duration-300 delay-150">
                      <div className="flex flex-col items-start gap-1 text-left">
                        <h3 className={`text-xl font-bold leading-none tracking-tight mb-0.5 whitespace-nowrap ${isDark ? 'text-white' : 'text-black'}`}>
                          {card.title}
                        </h3>
                        {card.subTitle && (
                          <span className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-3 ${isDark ? 'text-gray-400' : 'text-neutral-500'}`}>
                            {card.subTitle}
                          </span>
                        )}

                        <div className="flex flex-col gap-1">
                          {card.description.split(',').map((tag, i) => (
                            <span key={i} className={`text-[10px] font-medium tracking-wide ${isDark ? 'text-gray-300' : 'text-neutral-600'}`}>
                              {tag.trim()}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
