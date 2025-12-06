"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useThemeStore } from "@/lib/store/useThemeStore";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, RadialBarChart, RadialBar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

type AboutUsCard = {
  id: number;
  title: string;
  description: string;
  bigImage: string;
  content: Array<{
    title: string;
    description: string;
  }>;
};

const aboutUsCards: AboutUsCard[] = [
  {
    id: 1,
    title: "What We Do",
    description: "We connect talented artists with opportunities that matter. Our platform bridges the gap between talent and opportunity.",
    bigImage: "/images/talents/bigImage1.jpg",
    content: [
      {
        title: "Talent Discovery",
        description: "Discover and showcase your unique talents to the world.",
      },
      {
        title: "Opportunity Matching",
        description: "Find the perfect opportunities that match your skills.",
      },
      {
        title: "Career Growth",
        description: "Build your career with our comprehensive platform.",
      },
    ],
  },
  {
    id: 2,
    title: "Our Mission",
    description: "Empowering artists to reach their full potential through innovative technology and meaningful connections.",
    bigImage: "/images/talents/bigImage2.jpg",
    content: [
      {
        title: "Empowerment",
        description: "Building a community where talent thrives.",
      },
      {
        title: "Innovation",
        description: "Using technology to transform the industry.",
      },
      {
        title: "Connection",
        description: "Connecting artists with the right opportunities.",
      },
    ],
  },
  {
    id: 3,
    title: "Our Vision",
    description: "Creating a world where every artist has the tools and opportunities to succeed and grow their career.",
    bigImage: "/images/talents/bigImage3.jpg",
    content: [
      {
        title: "Global Reach",
        description: "Expanding opportunities worldwide.",
      },
      {
        title: "Technology",
        description: "Leveraging cutting-edge tools for success.",
      },
    ],
  },
  {
    id: 4,
    title: "Join Us",
    description: "Be part of a growing community of artists, performers, and creators shaping the future of entertainment.",
    bigImage: "/images/talents/bigImage4.jpg",
    content: [
      {
        title: "Community",
        description: "Connect with like-minded creators.",
      },
      {
        title: "Support",
        description: "Get the support you need to succeed.",
      },
    ],
  },
];

export default function AboutUs() {
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

  useEffect(() => {
    return () => {
      autoplay.stop();
    };
  }, [autoplay]);

  // Animated Counter Component
  const AnimatedCounter = ({ value, duration = 2000 }: { value: number; duration?: number }) => {
    const count = useMotionValue(value);
    const rounded = useTransform(count, (latest) => Math.round(latest));
    const spring = useSpring(count, { duration, bounce: 0 });

    useEffect(() => {
      spring.set(value);
    }, [spring, value]);

    return <motion.span>{rounded}</motion.span>;
  };

  // Generate different chart data types
  const generateAreaData = () => {
    return Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      value: Math.floor(Math.random() * 40) + 60 + Math.sin(i) * 10,
    }));
  };

  const generateBarData = () => {
    return Array.from({ length: 6 }, (_, i) => ({
      name: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6"][i],
      value: Math.floor(Math.random() * 50) + 40,
    }));
  };

  const generateLineData = () => {
    return Array.from({ length: 8 }, (_, i) => ({
      day: i + 1,
      value: Math.floor(Math.random() * 30) + 50 + Math.cos(i) * 15,
    }));
  };

  const [areaData, setAreaData] = useState(generateAreaData());
  const [barData, setBarData] = useState(generateBarData());
  const [lineData, setLineData] = useState(generateLineData());
  const [score, setScore] = useState(() => Math.floor(Math.random() * 15) + 85);
  const [growthRate, setGrowthRate] = useState(() => Math.floor(Math.random() * 20) + 75);
  const [activeCount, setActiveCount] = useState(() => Math.floor(Math.random() * 500) + 1000);
  const [trend, setTrend] = useState(() => Math.floor(Math.random() * 10) + 8);
  const [efficiency, setEfficiency] = useState(() => Math.floor(Math.random() * 15) + 85);
  const [engagement, setEngagement] = useState(() => Math.floor(Math.random() * 20) + 70);
  const [avgEngagement, setAvgEngagement] = useState(() => Math.floor(Math.random() * 15) + 65);
  const [peakEngagement, setPeakEngagement] = useState(() => Math.floor(Math.random() * 15) + 80);
  const [conversion, setConversion] = useState(() => Math.floor(Math.random() * 15) + 60);
  const [conversionTarget, setConversionTarget] = useState(() => Math.floor(Math.random() * 10) + 70);
  const [monthlyGrowth, setMonthlyGrowth] = useState(() => Math.floor(Math.random() * 10) + 5);
  const [conversionTrend, setConversionTrend] = useState(() => Math.floor(Math.random() * 8) + 3);

  // Animate data updates to simulate calculations
  useEffect(() => {
    const interval = setInterval(() => {
      setAreaData(generateAreaData());
      setBarData(generateBarData());
      setLineData(generateLineData());
      setScore((prev) => Math.min(100, Math.max(85, prev + (Math.random() - 0.5) * 2)));
      setGrowthRate((prev) => Math.min(100, Math.max(80, prev + (Math.random() - 0.5) * 3)));
      setActiveCount((prev) => prev + Math.floor(Math.random() * 5 - 2));
      setTrend((prev) => Math.min(20, Math.max(5, prev + (Math.random() - 0.5) * 2)));
      setEfficiency((prev) => Math.min(100, Math.max(85, prev + (Math.random() - 0.5) * 2)));
      setEngagement((prev) => Math.min(100, Math.max(70, prev + (Math.random() - 0.5) * 3)));
      setAvgEngagement((prev) => Math.min(85, Math.max(65, prev + (Math.random() - 0.5) * 2)));
      setPeakEngagement((prev) => Math.min(95, Math.max(80, prev + (Math.random() - 0.5) * 2)));
      setConversion((prev) => Math.min(100, Math.max(60, prev + (Math.random() - 0.5) * 2)));
      setConversionTarget((prev) => Math.min(80, Math.max(70, prev + (Math.random() - 0.5) * 1)));
      setMonthlyGrowth((prev) => Math.min(15, Math.max(5, prev + (Math.random() - 0.5) * 2)));
      setConversionTrend((prev) => Math.min(10, Math.max(3, prev + (Math.random() - 0.5) * 1)));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Render different calculator types based on card ID
  const renderCalculator = (cardId: number) => {
    switch (cardId) {
      case 1:
        // Area Chart with Score
        return (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative rounded-lg overflow-hidden backdrop-blur-xl border border-white/20 shadow-2xl bg-black/30 dark:bg-black/30 p-2 sm:p-3 md:p-4 px-4"
          >
            <div className="mb-2 sm:mb-3 md:mb-4">
              <h4 className="text-white text-[10px] sm:text-xs md:text-sm font-semibold mb-0.5 sm:mb-1">Performance Score</h4>
              <div className="flex items-baseline gap-1 sm:gap-2">
                <span className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">
                  <AnimatedCounter value={score} />
                </span>
                <span className="text-white/60 text-[10px] sm:text-xs">/100</span>
              </div>
            </div>
            <div className="mb-2 sm:mb-3 md:mb-4 h-12 sm:h-16 md:h-20 lg:h-24">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={areaData}>
                  <defs>
                    <linearGradient id={`gradient-${cardId}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ffffff" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#ffffff" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="value" stroke="#ffffff" strokeWidth={1.5} fill={`url(#gradient-${cardId})`} animationDuration={2000} />
                  <XAxis dataKey="month" hide />
                  <YAxis hide />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mb-2 sm:mb-3">
              <div className="flex justify-between items-center mb-1 sm:mb-1.5">
                <span className="text-white/80 text-[9px] sm:text-[10px] md:text-xs">Growth Rate</span>
                <span className="text-white text-[9px] sm:text-[10px] md:text-xs font-semibold">
                  <AnimatedCounter value={growthRate} />%
                </span>
              </div>
              <div className="w-full h-1 sm:h-1.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full" animate={{ width: `${growthRate}%` }} transition={{ duration: 1, ease: "easeOut" }} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
              <div className="bg-white/5 rounded p-1.5 sm:p-2">
                <div className="text-white/60 text-[8px] sm:text-[9px] md:text-[10px] mb-0.5">Active</div>
                <div className="text-white text-xs sm:text-sm md:text-base font-bold"><AnimatedCounter value={activeCount} /></div>
              </div>
              <div className="bg-white/5 rounded p-1.5 sm:p-2">
                <div className="text-white/60 text-[8px] sm:text-[9px] md:text-[10px] mb-0.5">Trend</div>
                <div className="text-green-400 text-xs sm:text-sm md:text-base font-bold">+<AnimatedCounter value={trend} />%</div>
              </div>
            </div>
          </motion.div>
        );

      case 2:
        // Bar Chart with Efficiency
        return (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative rounded-lg overflow-hidden backdrop-blur-xl border border-white/20 shadow-2xl bg-black/30 dark:bg-black/30 p-2 sm:p-3 md:p-4"
          >
            <div className="mb-2 sm:mb-3 md:mb-4">
              <h4 className="text-white text-[10px] sm:text-xs md:text-sm font-semibold mb-0.5 sm:mb-1">Efficiency Rate</h4>
              <div className="flex items-baseline gap-1 sm:gap-2">
                <span className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">
                  <AnimatedCounter value={efficiency} />
                </span>
                <span className="text-white/60 text-[10px] sm:text-xs">%</span>
              </div>
            </div>
            <div className="mb-2 sm:mb-3 md:mb-4 h-12 sm:h-16 md:h-20 lg:h-24">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <Bar dataKey="value" fill="#ffffff" radius={[4, 4, 0, 0]} animationDuration={2000}>
                    {barData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index % 2 === 0 ? "#ffffff" : "rgba(255,255,255,0.7)"} />
                    ))}
                  </Bar>
                  <XAxis dataKey="name" hide />
                  <YAxis hide />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 gap-1 sm:gap-1.5">
              {barData.slice(0, 3).map((item, idx) => (
                <div key={idx} className="bg-white/5 rounded p-1 sm:p-1.5">
                  <div className="text-white/60 text-[8px] sm:text-[9px] mb-0.5">{item.name}</div>
                  <div className="text-white text-xs sm:text-sm font-bold">{item.value}</div>
                </div>
              ))}
            </div>
          </motion.div>
        );

      case 3:
        // Line Chart with Engagement
        return (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative rounded-lg overflow-hidden backdrop-blur-xl border border-white/20 shadow-2xl bg-black/30 dark:bg-black/30 p-2 sm:p-3 md:p-4"
          >
            <div className="mb-2 sm:mb-3 md:mb-4">
              <h4 className="text-white text-[10px] sm:text-xs md:text-sm font-semibold mb-0.5 sm:mb-1">Engagement</h4>
              <div className="flex items-baseline gap-1 sm:gap-2">
                <span className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">
                  <AnimatedCounter value={engagement} />
                </span>
                <span className="text-white/60 text-[10px] sm:text-xs">%</span>
              </div>
            </div>
            <div className="mb-2 sm:mb-3 md:mb-4 h-12 sm:h-16 md:h-20 lg:h-24">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineData}>
                  <Line type="monotone" dataKey="value" stroke="#ffffff" strokeWidth={2} dot={false} animationDuration={2000} />
                  <XAxis dataKey="day" hide />
                  <YAxis hide />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-between">
              <div className="bg-white/5 rounded p-1.5 sm:p-2 flex-1 mr-1">
                <div className="text-white/60 text-[8px] sm:text-[9px] md:text-[10px] mb-0.5">Avg</div>
                <div className="text-white text-xs sm:text-sm font-bold"><AnimatedCounter value={avgEngagement} />%</div>
              </div>
              <div className="bg-white/5 rounded p-1.5 sm:p-2 flex-1">
                <div className="text-white/60 text-[8px] sm:text-[9px] md:text-[10px] mb-0.5">Peak</div>
                <div className="text-green-400 text-xs sm:text-sm font-bold"><AnimatedCounter value={peakEngagement} />%</div>
              </div>
            </div>
          </motion.div>
        );

      case 4:
        // Radial Progress with Conversion
        return (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative rounded-lg overflow-hidden backdrop-blur-xl border border-white/20 shadow-2xl bg-black/30 dark:bg-black/30 p-2 sm:p-3 md:p-4"
          >
            <div className="mb-2 sm:mb-3 md:mb-4 text-center">
              <h4 className="text-white text-[10px] sm:text-xs md:text-sm font-semibold mb-2 sm:mb-3">Conversion Rate</h4>
              <div className="hidden sm:block relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart innerRadius="60%" outerRadius="90%" data={[{ value: conversion, fill: "#ffffff" }]} startAngle={90} endAngle={-270}>
                    <RadialBar dataKey="value" cornerRadius={10} fill="#ffffff" animationDuration={2000} />
                  </RadialBarChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-lg sm:text-xl md:text-2xl font-bold">
                    <AnimatedCounter value={conversion} />%
                  </span>
                </div>
              </div>
              {/* Mobile: Show percentage without circle */}
              <div className="sm:hidden text-center mb-2">
                <span className="text-white text-2xl font-bold">
                  <AnimatedCounter value={conversion} />%
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-white/80 text-[9px] sm:text-[10px] md:text-xs">Target</span>
                <span className="text-white text-[9px] sm:text-[10px] md:text-xs font-semibold"><AnimatedCounter value={conversionTarget} />%</span>
              </div>
              <div className="w-full h-1 sm:h-1.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div className="h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full" animate={{ width: `${conversion}%` }} transition={{ duration: 1, ease: "easeOut" }} />
              </div>
              <div className="grid grid-cols-2 gap-1.5 sm:gap-2 mt-2">
                <div className="bg-white/5 rounded p-1.5 sm:p-2">
                  <div className="text-white/60 text-[8px] sm:text-[9px] md:text-[10px] mb-0.5">This Month</div>
                  <div className="text-white text-xs sm:text-sm font-bold">+<AnimatedCounter value={monthlyGrowth} />%</div>
                </div>
                <div className="bg-white/5 rounded p-1.5 sm:p-2">
                  <div className="text-white/60 text-[8px] sm:text-[9px] md:text-[10px] mb-0.5">Trend</div>
                  <div className="text-green-400 text-xs sm:text-sm font-bold">↑ <AnimatedCounter value={conversionTrend} />%</div>
                </div>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:pl-8 lg:pr-0 bg-white dark:bg-background overflow-visible">
      <div className="mx-auto overflow-visible">
        {/* Section Header */}
        <div className="mb-6">
          <p
            className="text-xs mb-1.5"
            style={{ color: isDark ? "#ffffff" : "#000000" }}
          >
            ABOUT US
          </p>
          <h2
            className="text-xl sm:text-2xl md:text-3xl font-semibold"
            style={{ color: isDark ? "#ffffff" : "#000000" }}
          >
            Learn more about TalentBuzz
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {aboutUsCards.map((card: AboutUsCard) => (
                <div
                  key={card.id}
                  className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_66.67%] min-w-0 md:pl-4 lg:pl-6 overflow-visible"
                >
                  <div className="flex flex-col h-full overflow-visible">
                    {/* Big Image Container with Small Cards on Right */}
                    <div className="relative w-full h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px] rounded-2xl overflow-hidden">
                      <Image
                        src={card.bigImage}
                        alt={card.title}
                        fill
                        className="object-cover rounded-lg"
                        priority={card.id === 1}
                      />

                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

                      {/* Title and Description - Inside Image Top Left */}
                      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10 max-w-[60%] sm:max-w-[55%]">
                        <h3
                          className="text-base sm:text-lg md:text-xl font-semibold mb-1.5 text-white drop-shadow-lg"
                        >
                          {card.title}
                        </h3>
                        <p
                          className="text-xs sm:text-sm leading-relaxed text-white/95 drop-shadow-md"
                        >
                          {card.description}
                        </p>
                      </div>

                      {/* Left Side: Sophisticated Calculator Card - Different for each card */}
                      <div className="absolute left-2 sm:left-4 bottom-2 sm:bottom-4 w-full max-w-[140px] sm:max-w-[200px] md:max-w-[240px] lg:max-w-[280px]">
                        {renderCalculator(card.id)}
                      </div>

                      {/* Small Frost Glass Cards - Right Side Bottom */}
                      <div className="absolute right-2 sm:right-4 bottom-2 sm:bottom-4 flex flex-col gap-2 sm:gap-3 w-full max-w-[120px] sm:max-w-[180px] md:max-w-[220px] lg:max-w-[260px]">
                        {card.content.map((item, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="relative rounded-xl overflow-hidden backdrop-blur-xl border border-white/10 shadow-2xl bg-black/20 dark:bg-black/20 p-3 sm:p-4"
                          >
                            <h4 className="text-white text-xs sm:text-sm font-semibold mb-1.5">
                              {item.title}
                            </h4>
                            <p className="text-white text-[10px] sm:text-xs leading-relaxed">
                              {item.description}
                            </p>
                          </motion.div>
                        ))}
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
