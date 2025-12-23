"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, animate } from "framer-motion";
import { useThemeStore } from "@/lib/store/useThemeStore";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type Talent = {
  id: number;
  name: string;
  category: string;
  image: string;
  gridSpan: string; // CSS grid span classes
};

const services: Talent[] = [
  {
    id: 1,
    name: "AI/ML Solutions",
    category: "Intelligence",
    image: "/images/talents/aiml.jpg",
    gridSpan: "col-span-1 md:col-span-2 row-span-1 md:row-span-2",
  },
  {
    id: 2,
    name: "Payment Integration",
    category: "Fintech",
    image: "/images/talents/payment3.jpg",
    gridSpan: "col-span-1 md:col-span-1 row-span-1",
  },
  {
    id: 3,
    name: "Cloud Infra",
    category: "DevOps",
    image: "/images/talents/clouds2.jpg",
    gridSpan: "col-span-1 md:col-span-1 row-span-1",
  },
  {
    id: 4,
    name: "Web Development",
    category: "Full Stack",
    image: "/images/talents/web4.jpg",
    gridSpan: "col-span-1 md:col-span-2 row-span-1",
  },
  {
    id: 5,
    name: "Mobile Apps",
    category: "iOS & Android",
    image: "/images/talents/mobile3.jpg",
    gridSpan: "col-span-1 md:col-span-1 row-span-1",
  },
  {
    id: 6,
    name: "UI/UX Design",
    category: "Creative",
    image: "/images/talents/ui.jpg",
    gridSpan: "col-span-1 md:col-span-1 row-span-1",
  },
  {
    id: 7,
    name: "Data Analytics",
    category: "Big Data",
    image: "/images/talents/dataanalysis.jpg",
    gridSpan: "col-span-1 md:col-span-1 row-span-1",
  },
  {
    id: 8,
    name: "Cybersecurity",
    category: "Security",
    image: "/images/talents/cyber.jpg",
    gridSpan: "col-span-1 md:col-span-2 row-span-1",
  },
];

// Simple typewriter effect for hero quote text (desktop only use)
const TypewriterText = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index += 1;
      setDisplayed(text.slice(0, index));
      if (index >= text.length) {
        clearInterval(interval);
      }
    }, 35);

    return () => clearInterval(interval);
  }, [text]);

  return <span className={className}>{displayed}</span>;
};

// Combined 3D Card Component with mouse tracking + hover effects
function Card3DInteractive({
  children,
  className,
  isHovered,
  style
}: {
  children: React.ReactNode;
  className?: string;
  isHovered: boolean;
  style?: React.CSSProperties;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const hoverRotateX = useMotionValue(0);
  const hoverRotateY = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 350, damping: 90 });
  const mouseYSpring = useSpring(y, { stiffness: 350, damping: 90 });

  const rotateXMouse = useTransform(mouseYSpring, [-0.5, 0.5], [10, -10]);
  const rotateYMouse = useTransform(mouseXSpring, [-0.5, 0.5], [-10, 10]);

  // Animate hover rotation
  useEffect(() => {
    animate(hoverRotateX, isHovered ? -5 : 0, { duration: 0.4 });
    animate(hoverRotateY, isHovered ? 3 : 0, { duration: 0.4 });
  }, [isHovered, hoverRotateX, hoverRotateY]);

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

  // Combine mouse tracking with hover rotation
  const finalRotateX = useTransform(
    [rotateXMouse, hoverRotateX],
    ([mouse, hover]) => (mouse as number) + (hover as number)
  );

  const finalRotateY = useTransform(
    [rotateYMouse, hoverRotateY],
    ([mouse, hover]) => (mouse as number) + (hover as number)
  );

  return (
    <motion.div
      ref={cardRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        y: isHovered ? -8 : 0,
        scale: isHovered ? 1.015 : 1,
        filter: isHovered ? "drop-shadow(0 18px 35px rgba(0, 0, 0, 0.28))" : "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))",
      }}
      style={{
        rotateX: finalRotateX,
        rotateY: finalRotateY,
        transformStyle: "preserve-3d",
        ...style,
      }}
      transition={{
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  );
}

export default function OurTalents() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
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
    <section className="pb-16 px-0 sm:px-6 lg:px-8 bg-background overflow-visible">
      <div className="mx-auto overflow-visible max-w-[1440px]">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <p
            className="text-xs mb-2 font-medium tracking-wider uppercase"
            style={{ color: isDark ? "#ffffff" : "#000000" }}
          >
            OUR EXPERTISE
          </p>
          <h2
            className="text-3xl md:text-4xl font-semibold"
            style={{ color: isDark ? "#ffffff" : "#000000" }}
          >
            End-to-End Digital Services
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="relative" style={{ perspective: "1000px" }}>
          {/* Mobile Carousel (shadcn/ui) */}
          <div className="lg:hidden mb-8">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {services.map((service) => (
                  <CarouselItem key={service.id} className="basis-[85%] pl-4">
                    <div className="h-[300px] p-1">
                      <Card3DInteractive
                        className="relative rounded-2xl overflow-hidden cursor-pointer w-full h-full"
                        isHovered={false}
                      >
                        <motion.div
                          className="relative w-full h-full bg-gray-900"
                          style={{ transformStyle: "preserve-3d" }}
                        >
                          <Image
                            src={service.image}
                            alt={service.name}
                            fill
                            className="object-cover"
                            priority={service.id <= 2}
                          />
                          {/* Content */}
                          <div className="absolute inset-0 flex flex-col justify-end p-6">
                            <div>
                              <p className="text-white/70 text-sm mb-1 font-medium">
                                {service.category}
                              </p>
                              <h3 className="text-white text-xl font-bold">
                                {service.name}
                              </h3>
                            </div>
                          </div>
                        </motion.div>
                      </Card3DInteractive>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

            </Carousel>
          </div>

          {/* Desktop Grid */}
          <div className="hidden lg:grid grid-cols-1 lg:grid-cols-4 gap-5 sm:gap-6 md:gap-8 auto-rows-fr">
            {services.map((service) => (
              <div
                key={service.id}
                className={`relative ${service.gridSpan}`}
                style={{ zIndex: hoveredId === service.id ? 10 : 1 }}
                onMouseEnter={() => setHoveredId(service.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <Card3DInteractive
                  className="relative rounded-2xl overflow-hidden cursor-pointer w-full h-full"
                  isHovered={hoveredId === service.id}
                >
                  <motion.div
                    className="relative w-full h-full min-h-[200px] sm:min-h-[250px] md:min-h-[300px]"
                    style={{
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <Image
                      src={service.image}
                      alt={service.name}
                      fill
                      className="object-cover"
                      priority={service.id <= 4}
                    />

                    {/* Overlay Gradient */}


                    {/* Content */}
                    <motion.div
                      className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6"
                      style={{
                        transformStyle: "preserve-3d",
                      }}
                      animate={{
                        transform: hoveredId === service.id ? "translateZ(20px)" : "translateZ(0px)",
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      <motion.div
                        animate={{
                          y: hoveredId === service.id ? 0 : 10,
                          opacity: hoveredId === service.id ? 1 : 0.9,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="text-white/70 text-xs sm:text-sm mb-1 font-medium">
                          {service.category}
                        </p>
                        <h3 className="text-white text-lg sm:text-xl md:text-2xl font-bold">
                          {service.name}
                        </h3>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </Card3DInteractive>
              </div>
            ))}
          </div>

          {/* Quotes in Gap - Below Singers, Right of Acrobats - Desktop Only */}
          <div
            className="hidden lg:flex absolute top-[300px] left-[calc(75%+1.25rem)] right-4 flex-col items-start gap-6 pointer-events-none"
            style={{ top: "calc(52% + 1.25rem)" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-left"
            >
              <p
                className="text-xs mb-1"
                style={{ color: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)" }}
              >
                Tech Excellence
              </p>
              <p className="text-base md:text-lg font-medium leading-relaxed mb-2">
                <TypewriterText text="Seamless integration with modern stacks for maximum performance." />
              </p>
              <p
                className="text-xs"
                style={{ color: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)" }}
              >
                From simple APIs to complex microservices architecture.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-left"
            >
              <p
                className="text-xs mb-1"
                style={{ color: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)" }}
              >
                Smart Automation
              </p>
              <p
                className="text-base md:text-lg font-medium leading-relaxed mb-2"
                style={{ color: isDark ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.7)" }}
              >
                Leverage AI/ML to automate workflows and reduce manual overhead.
              </p>
            </motion.div>
          </div>

          {/* Quotes on Right Side of Painters Card - Desktop Only */}
          <div className="hidden lg:flex absolute bottom-[50px] left-[calc(51%+0.5rem)] max-w-[550px] flex-col items-start gap-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-left"
            >
              <p
                className="text-xs mb-1"
                style={{ color: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)" }}
              >
                Design & Experience
              </p>
              <p
                className="text-base md:text-lg font-medium leading-relaxed mb-2"
                style={{ color: isDark ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.7)" }}
              >
                Crafting intuitive user interfaces that engage and convert users.
              </p>
              <p
                className="text-xs"
                style={{ color: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)" }}
              >
                Pixel-perfect implementation across all devices.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-left"
            >
              <p
                className="text-xs mb-1"
                style={{ color: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)" }}
              >
                Scalable Growth
              </p>
              <p
                className="text-base md:text-lg font-medium leading-relaxed mb-2"
                style={{ color: isDark ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.7)" }}
              >
                Infrastructure that grows with your business, ensuring 99.9% uptime.
              </p>
              <p
                className="text-xs"
                style={{ color: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)" }}
              >
                Secure, reliable, and always optimized.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section >
  );
}

