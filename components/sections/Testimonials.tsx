"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useThemeStore } from "@/lib/store/useThemeStore";
import { ArrowRight, X, Instagram } from "lucide-react";
import Image from "next/image";

type Testimonial = {
  id: number;
  quote: string;
  author: {
    name: string;
    age?: number;
    role: string;
    avatar: string;
  };
  date: string;
  time?: string;
  type: "shared" | "post";
  platform?: "x" | "instagram";
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "TalentBuzz helped me land my first major gig. The platform made it so easy to showcase my dance portfolio and connect with event organizers. Within a week, I had three bookings!",
    author: {
      name: "Sarah Martinez",
      age: 24,
      role: "Professional Dancer",
      avatar: "/images/talents/smallImage1.jpg",
    },
    date: "MAY 9, 2025",
    time: "9:52 AM",
    type: "post",
    platform: "x",
  },
  {
    id: 2,
    quote: "As a casting director, TalentBuzz has completely transformed how I discover new talent. The detailed profiles and performance history save me hours of research. Best investment I've made this year.",
    author: {
      name: "Michael Chen",
      role: "Casting Director, Broadway Productions",
      avatar: "/images/talents/smallImage2.jpg",
    },
    date: "MAY 22, 2025",
    time: "3:13 PM",
    type: "post",
    platform: "instagram",
  },
  {
    id: 3,
    quote: "Building my career as a musician was always a challenge until TalentBuzz. Now I have a professional profile that speaks for itself, and opportunities are coming to me instead of me chasing them.",
    author: {
      name: "James Rodriguez",
      role: "Singer & Songwriter",
      avatar: "/images/talents/smallImage3.jpg",
    },
    date: "FEB 23, 2025",
    type: "shared",
  },
  {
    id: 4,
    quote: "I've booked more gigs in the past month through TalentBuzz than I did in the entire last year. The platform understands what performers need and delivers exactly that.",
    author: {
      name: "Emma Thompson",
      age: 29,
      role: "Magician & Performer",
      avatar: "/images/talents/smallImage4.jpg",
    },
    date: "APR 03, 2025",
    type: "shared",
  },
  {
    id: 5,
    quote: "The analytics and insights on TalentBuzz are incredible. I can see exactly how my profile performs and what attracts bookers. It's like having a talent agent built into the platform.",
    author: {
      name: "David Park",
      role: "Actor & Voice Artist",
      avatar: "/images/talents/bigImage1.jpg",
    },
    date: "APR 10, 2025",
    time: "4:01 PM",
    type: "post",
    platform: "x",
  },
  {
    id: 6,
    quote: "From local shows to international tours, TalentBuzz has been with me every step of the way. The community support and professional tools have elevated my career to new heights.",
    author: {
      name: "Lisa Anderson",
      age: 32,
      role: "Comedian & Content Creator",
      avatar: "/images/talents/bigImage2.jpg",
    },
    date: "MAY 02, 2025",
    type: "shared",
  },
];

export default function Testimonials() {
  const { theme } = useThemeStore();
  const [isDark, setIsDark] = useState(false);
  const [showMore, setShowMore] = useState(false);

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
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-background">
      <div className="mx-auto max-w-[1440px]">
        {/* Header */}
        <div className="text-center mb-8">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-6"
            style={{ color: isDark ? "#ffffff" : "#000000" }}
          >
            Hear it from our members
          </h2>
          {/* <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm sm:text-base transition-colors"
          >
            Share your story
          </motion.button> */}
        </div>

        {/* Testimonials Grid Container */}
        <div className="relative mb-8">
          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 transition-all duration-700 ease-in-out ${
              !showMore ? "lg:max-h-[600px] lg:overflow-hidden" : "lg:max-h-none"
            }`}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                animate={{
                  opacity: !showMore && index >= 3 ? 0.6 : 1,
                  y: !showMore && index >= 3 ? 20 : 0,
                }}
                className={`relative rounded-2xl overflow-hidden backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-xl bg-white/10 dark:bg-black/20 p-6 sm:p-8 transition-all duration-300 ${
                  showMore || index < 3 ? "" : "hidden lg:block"
                }`}
              >
              {/* Quote */}
              <p
                className="text-sm sm:text-base leading-relaxed mb-6"
                style={{ color: isDark ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.8)" }}
              >
                {testimonial.quote}
              </p>

              {/* Footer */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {/* Avatar */}
                  <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-white/20">
                    <Image
                      src={testimonial.author.avatar}
                      alt={testimonial.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Author Info */}
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-sm sm:text-base font-semibold truncate"
                      style={{ color: isDark ? "#ffffff" : "#000000" }}
                    >
                      {testimonial.author.name}
                      {testimonial.author.age && (
                        <span
                          className="font-normal ml-1"
                          style={{ color: isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)" }}
                        >
                          , {testimonial.author.age}
                        </span>
                      )}
                    </p>
                    <p
                      className="text-xs sm:text-sm truncate"
                      style={{ color: isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)" }}
                    >
                      {testimonial.author.role}
                    </p>
                  </div>
                </div>

                {/* Platform Icon */}
                {testimonial.platform && (
                  <div className="flex-shrink-0">
                    {testimonial.platform === "x" ? (
                      <X
                        className="w-4 h-4 sm:w-5 sm:h-5"
                        style={{ color: isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)" }}
                      />
                    ) : (
                      <Instagram
                        className="w-4 h-4 sm:w-5 sm:h-5"
                        style={{ color: isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)" }}
                      />
                    )}
                  </div>
                )}
              </div>

              {/* Date and Link */}
              <div className="mt-4 pt-4 border-t border-white/10 dark:border-white/5 flex items-center justify-between">
                {testimonial.type === "post" ? (
                  <a
                    href="#"
                    className="flex items-center gap-1 text-xs sm:text-sm font-medium hover:opacity-80 transition-opacity"
                    style={{ color: isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)" }}
                  >
                    VIEW POST
                    <ArrowRight className="w-3 h-3" />
                  </a>
                ) : (
                  <span
                    className="text-xs sm:text-sm font-medium"
                    style={{ color: isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)" }}
                  >
                    SHARED STORY
                  </span>
                )}
                <div className="flex items-center gap-2">
                  {testimonial.time && (
                    <span
                      className="text-xs"
                      style={{ color: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)" }}
                    >
                      {testimonial.time}
                    </span>
                  )}
                  <span
                    className="text-xs"
                    style={{ color: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)" }}
                  >
                    {testimonial.date}
                  </span>
                </div>
              </div>
              </motion.div>
            ))}
          </div>

          {/* Fade Overlay - Desktop Only */}
          {!showMore && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="hidden lg:block absolute bottom-0 left-0 right-0 h-80 bg-gradient-to-t from-white dark:from-background via-white/60 dark:via-background/60 to-transparent pointer-events-none"
            />
          )}
        </div>

        {/* See More Button */}
        <div className="text-center">
          <motion.button
            onClick={() => setShowMore(!showMore)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm sm:text-base transition-colors"
          >
            {showMore ? "Show less" : "See more stories"}
          </motion.button>
        </div>
      </div>
    </section>
  );
}

