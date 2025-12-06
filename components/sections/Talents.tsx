"use client";

import { useCallback, useEffect, useState, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useThemeStore } from "@/lib/store/useThemeStore";

type TalentSection = {
  id: number;
  number: string;
  title: string;
  description: string;
  bigImage: string;
  smallImage: string;
  cardContent: {
    title?: string;
    subtitle?: string;
    age?: string;
    message?: string;
    items?: Array<{ score: string; label: string } | string>;
    recommendations?: Array<{ category: string; item: string }>;
  };
};

const talentSections: TalentSection[] = [
  {
    id: 1,
    number: "[1]",
    title: "Your talent, showcased",
    description: "Get insights into your performance, skills, and potential - know exactly where your talent shines across different categories.",
    bigImage: "/images/talents/bigImage1.jpg",
    smallImage: "/images/talents/smallImage1.jpg",
    cardContent: {
        title: "TALENT LEVEL",
        age: "Pro",
        message: "Ready for professional opportunities.",
      },
  },
  {
    id: 2,
    number: "[2]",
    title: "Your potential, unlocked",
    description: "Experience level is surface-level. True potential reveals how far your talent can really take you.",
    bigImage: "/images/talents/bigImage5.jpg",
    smallImage: "/images/talents/smallImage2.jpg",
    cardContent: {
      title: "TALENT LEVEL",
      age: "Pro",
      message: "Ready for professional opportunities.",
    },
  },
  {
    id: 3,
    number: "[3]",
    title: "Next steps, simplified",
    description: "We've analyzed your profile, translated it to a clear understanding of your talent, goals, and next steps.",
    bigImage: "/images/talents/bigImage3.jpg",
    smallImage: "/images/talents/smallImage3.jpg",
    cardContent: {
        title: "TALENT LEVEL",
        age: "Pro",
        message: "Ready for professional opportunities.",
      },
  },
  {
    id: 4,
    number: "[4]",
    title: "Discover your talent",
    description: "Explore opportunities across different talent categories and find the perfect match for your skills.",
    bigImage: "/images/talents/bigImage4.jpg",
    smallImage: "/images/talents/smallImage4.jpg",
    cardContent: {
        title: "TALENT LEVEL",
        age: "Pro",
        message: "Ready for professional opportunities.",
      },
  },
];

// 3D Card Component with mouse tracking
function Card3D({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 400, damping: 80 });
  const mouseYSpring = useSpring(y, { stiffness: 400, damping: 80 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["20deg", "-20deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-20deg", "20deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}

export function Talents() {
  const [autoplay] = useState(() =>
    Autoplay({ delay: 2000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "start",
      loop: true,
      slidesToScroll: 1,
      breakpoints: {
        "(min-width: 1024px)": { slidesToScroll: 1 },
        "(min-width: 768px)": { slidesToScroll: 1 },
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
        // First check localStorage, then DOM class
        const savedTheme = localStorage.getItem("theme");
        const isDarkMode = savedTheme 
          ? savedTheme === "dark"
          : document.documentElement.classList.contains("dark");
        setIsDark(isDarkMode);
      }
    };

    // Check immediately
    checkTheme();

    // Also check when theme changes
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
    <section className="py-16 px-4 sm:px-6 lg:pl-8 lg:pr-0 bg-white dark:bg-background overflow-visible">
      <div className="mx-auto overflow-visible">
        {/* Section Header */}
        <div className="mb-6">
          <p
            className="text-xs mb-1.5"
            style={{ color: isDark ? "#ffffff" : "#000000" }}
          >
            HOW IT WORKS
          </p>
          <h2
            className="text-xl sm:text-2xl md:text-3xl font-semibold"
            style={{ color: isDark ? "#ffffff" : "#000000" }}
          >
            Discover your talent potential
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <div className="overflow-hidden pb-24 sm:pb-28" ref={emblaRef}>
            <div className="flex">
              {talentSections.map((section: TalentSection) => (
                <div
                  key={section.id}
                  className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_40%] min-w-0 md:pl-4 lg:pl-6 overflow-visible"
                >
                  <div className="flex flex-col pb-16 sm:pb-20 h-full overflow-visible">
                    {/* Top: Text Div */}
                    <div className="mb-2.5">
                      <div
                        className="text-[10px] mb-1"
                        style={{ color: isDark ? "#ffffff" : "#000000" }}
                      >
                        {section.number}
                      </div>
                      <h3
                        className="text-base sm:text-lg md:text-xl font-semibold mb-1.5"
                        style={{ color: isDark ? "#ffffff" : "#000000" }}
                      >
                        {section.title}
                      </h3>
                      <p
                        className="text-xs sm:text-sm leading-relaxed max-w-[400px]"
                        style={{ color: isDark ? "#ffffff" : "#000000" }}
                      >
                        {section.description}
                      </p>
                    </div>

                    {/* Middle: Big Image (Relative) */}
                    <div className="relative w-full h-[200px] sm:h-[240px] md:h-[280px] rounded-2xl">
                      <Image
                        src={section.bigImage}
                        alt={section.title}
                        fill
                        className="object-cover rounded-lg"
                        priority={section.id === 1}
                      />

                      {/* Bottom: Small Image Card (Absolute with translate - centered) */}
                      <div 
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[35%] w-full max-w-[260px] sm:max-w-[300px] md:max-w-[340px] px-1.5"
                        style={{ perspective: "1000px" }}
                      >
                        <Card3D className="relative w-full aspect-square rounded-xl overflow-hidden backdrop-blur-xl border border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] flex flex-col" style={{ transformStyle: "preserve-3d" }}>
                          {/* Top: Text Content with Transparent Background */}
                          <div className="relative z-10 p-2 sm:p-2.5 bg-transparent" style={{ transform: "translateZ(30px)" }}>
                            {section.cardContent.title && (
                              <div className="flex justify-between items-start mb-1.5">
                                <h4 className="text-white text-[10px] sm:text-xs font-semibold">
                                  {section.cardContent.title}
                                </h4>
                                {section.cardContent.subtitle && (
                                  <span className="text-white/60 text-[9px] sm:text-[10px]">
                                    {section.cardContent.subtitle}
                                  </span>
                                )}
                                {section.cardContent.age && (
                                  <span className="text-white text-sm sm:text-base font-bold">
                                    {section.cardContent.age}
                                  </span>
                                )}
                              </div>
                            )}

                            {section.cardContent.items && (
                              <div className="grid grid-cols-2 gap-1 sm:gap-1.5">
                                {section.cardContent.items.map((item: { score: string; label: string } | string, idx: number) => {
                                  if (typeof item === "string") {
                                    return (
                                      <div
                                        key={idx}
                                        className="text-white text-[9px] sm:text-[10px]"
                                      >
                                        {item}
                                      </div>
                                    );
                                  }
                                  return (
                                    <div
                                      key={idx}
                                      className="flex items-center gap-0.5 sm:gap-1 text-white"
                                    >
                                      <span className="text-[10px] sm:text-xs font-semibold">{item.score}</span>
                                      <span className="text-[9px] sm:text-[10px]">{item.label}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            )}

                            {section.cardContent.message && (
                              <p className="text-white text-[9px] sm:text-[10px] mt-1.5">
                                {section.cardContent.message}
                              </p>
                            )}

                            {section.cardContent.recommendations && (
                              <div className="space-y-1 mt-1.5">
                                {section.cardContent.recommendations.map((rec: { category: string; item: string }, idx: number) => (
                                  <div key={idx} className="text-white">
                                    <p className="font-semibold text-[9px] sm:text-[10px] text-white/60">
                                      {rec.category}
                                    </p>
                                    <p className="text-[9px] sm:text-[10px]">{rec.item}</p>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                          
                          {/* Bottom: Image Container */}
                          <div className="relative flex-1 w-full" style={{ transform: "translateZ(20px)" }}>
                            <Image
                              src={section.smallImage}
                              alt={section.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </Card3D>
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
