"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, animate } from "framer-motion";
import { useThemeStore } from "@/lib/store/useThemeStore";

type Talent = {
  id: number;
  name: string;
  category: string;
  image: string;
  gridSpan: string; // CSS grid span classes
};

const talents: Talent[] = [
  {
    id: 1,
    name: "Dancers",
    category: "Performance",
    image: "/images/talents/bigImage1.jpg",
    gridSpan: "col-span-1 md:col-span-2 row-span-1 md:row-span-2",
  },
  {
    id: 2,
    name: "Musicians",
    category: "Music",
    image: "/images/talents/bigImage2.jpg",
    gridSpan: "col-span-1 md:col-span-1 row-span-1",
  },
  {
    id: 3,
    name: "Magicians",
    category: "Entertainment",
    image: "/images/talents/bigImage3.jpg",
    gridSpan: "col-span-1 md:col-span-1 row-span-1",
  },
  {
    id: 4,
    name: "Singers",
    category: "Vocal",
    image: "/images/talents/bigImage4.jpg",
    gridSpan: "col-span-1 md:col-span-2 row-span-1",
  },
  {
    id: 5,
    name: "Actors",
    category: "Theater",
    image: "/images/talents/bigImage5.jpg",
    gridSpan: "col-span-1 md:col-span-1 row-span-1",
  },
  {
    id: 6,
    name: "Comedians",
    category: "Comedy",
    image: "/images/talents/smallImage1.jpg",
    gridSpan: "col-span-1 md:col-span-1 row-span-1",
  },
  {
    id: 7,
    name: "Acrobats",
    category: "Circus",
    image: "/images/talents/smallImage2.jpg",
    gridSpan: "col-span-1 md:col-span-1 row-span-1",
  },
  {
    id: 8,
    name: "Painters",
    category: "Visual Arts",
    image: "/images/talents/smallImage3.jpg",
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
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-background overflow-visible">
      <div className="mx-auto overflow-visible max-w-[1440px]">
        {/* Section Header */}
        <div className="mb-12">
          <p
            className="text-xs mb-1.5"
            style={{ color: isDark ? "#ffffff" : "#000000" }}
          >
            OUR TALENTS
          </p>
          <h2
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold"
            style={{ color: isDark ? "#ffffff" : "#000000" }}
          >
            Discover Our Diverse Talent Pool
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="relative" style={{ perspective: "1000px" }}>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 sm:gap-6 md:gap-8 auto-rows-fr">
            {talents.map((talent) => (
            <div
              key={talent.id}
              className={`relative ${talent.gridSpan}`}
              style={{ zIndex: hoveredId === talent.id ? 10 : 1 }}
              onMouseEnter={() => setHoveredId(talent.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <Card3DInteractive
                className="relative rounded-2xl overflow-hidden cursor-pointer w-full h-full"
                isHovered={hoveredId === talent.id}
              >
              <motion.div 
                className="relative w-full h-full min-h-[200px] sm:min-h-[250px] md:min-h-[300px]"
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                <Image
                  src={talent.image}
                  alt={talent.name}
                  fill
                  className="object-cover"
                  priority={talent.id <= 4}
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80" />
                
                {/* Content */}
                <motion.div 
                  className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6"
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                  animate={{
                    transform: hoveredId === talent.id ? "translateZ(20px)" : "translateZ(0px)",
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <motion.div
                    animate={{
                      y: hoveredId === talent.id ? 0 : 10,
                      opacity: hoveredId === talent.id ? 1 : 0.9,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-white/70 text-xs sm:text-sm mb-1 font-medium">
                      {talent.category}
                    </p>
                    <h3 className="text-white text-lg sm:text-xl md:text-2xl font-bold">
                      {talent.name}
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
                    Live talent signal
                  </p>
                  <p className="text-base md:text-lg font-medium leading-relaxed mb-2">
                    <TypewriterText text="See every talent as a live moment, not just another profile card." />
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)" }}
                  >
                    Streaming from auditions, shows, and real-world performances.
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
                    Casting-ready insights
                  </p>
                  <p
                    className="text-base md:text-lg font-medium leading-relaxed mb-2"
                    style={{ color: isDark ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.7)" }}
                  >
                    Shortlists built from real performance data, not just vibes.
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)" }}
                  >
                    Match talents to roles, stages, and brands in a few clicks.
                  </p>
                </motion.div>
          </div>

          {/* Quotes on Right Side of Painters Card - Desktop Only */}
          <div className="hidden lg:flex absolute bottom-[50px] left-[calc(51%+0.5rem)] w-[600px] flex-col items-start gap-6 pointer-events-none">
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
                Visual stories
              </p>
              <p
                className="text-base md:text-lg font-medium leading-relaxed mb-2"
                style={{ color: isDark ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.7)" }}
              >
                Moodboards, lookbooks, and reels — all stitched into one living canvas.
              </p>
              <p
                className="text-xs"
                style={{ color: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)" }}
              >
                Shareable in a link, bookable in a click.
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
                Growth over time
              </p>
              <p
                className="text-base md:text-lg font-medium leading-relaxed mb-2"
                style={{ color: isDark ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.7)" }}
              >
                Track how every set, show, and collab levels up your talent profile.
              </p>
              <p
                className="text-xs"
                style={{ color: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)" }}
              >
                From first booking to world tour — see the line, not just the dots.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

