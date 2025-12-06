"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useThemeStore } from "@/lib/store/useThemeStore";

type FaqItem = {
  question: string;
  answer: string;
  bullets?: string[];
};

const faqs: FaqItem[] = [
  {
    question: "Can you explain how TalentBuzz works?",
    answer:
      "TalentBuzz gives you a clear, data-backed view of every performer so you can book with confidence instead of guesswork.",
    bullets: [
      "One unified profile for each talent: clips, reels, photos, ratings, and verified experience.",
      "Smart tags and filters so you can instantly narrow down by style, genre, location, and availability.",
      "A concierge-like flow that helps you shortlist, compare, and reach out without endless back-and-forth.",
      "Transparent performance history so you always know what to expect on stage, on set, or at your event.",
    ],
  },
  {
    question: "Is TalentBuzz just for agencies, or can artists use it too?",
    answer:
      "Both. TalentBuzz is built for bookers, brands, and individual artists. Artists get a premium profile and pipeline of opportunities, while bookers get a clean dashboard to manage casting and bookings.",
  },
  {
    question: "What types of talents can I find on TalentBuzz?",
    answer:
      "From dancers, singers, and magicians to comedians, actors, and visual artists — if they can perform, you can probably find them here. We’re continuously expanding categories as the community grows.",
  },
  {
    question: "How do bookings and payments work?",
    answer:
      "You discover, shortlist, and connect with talent through TalentBuzz, then confirm details and payments securely via our booking flow. Every step is tracked so both sides have a clear, shared timeline.",
  },
  {
    question: "Can I use TalentBuzz for recurring events or long-term projects?",
    answer:
      "Yes. You can curate your own private pools of go-to talents, reuse shortlists, and rebook past performers in a few clicks for tours, residencies, or recurring productions.",
  },
];

export default function Faq() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
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

  const handleToggle = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  const borderColor = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)";
  const mutedColor = isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)";
  const textColor = isDark ? "#ffffff" : "#000000";

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-background">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-10 flex items-center justify-between gap-4">
          <div>
            <p
              className="text-xs mb-1.5 tracking-wide uppercase"
              style={{ color: mutedColor }}
            >
              Support
            </p>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-semibold"
              style={{ color: textColor }}
            >
              Frequently Asked Questions
            </h2>
          </div>

          <button
            className="hidden sm:inline-flex items-center rounded-full border px-4 py-2 text-xs font-medium transition-colors"
            style={{
              borderColor,
              color: textColor,
            }}
          >
            Read more
          </button>
        </div>

        <div
          className="rounded-3xl border overflow-hidden"
          style={{ borderColor }}
        >
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;

            return (
              <div
                key={faq.question}
                className="border-b last:border-b-0"
                style={{ borderColor }}
              >
                <button
                  type="button"
                  onClick={() => handleToggle(index)}
                  className="flex w-full items-center justify-between gap-4 px-4 sm:px-6 py-4 sm:py-5 md:py-6 text-left"
                >
                  <div>
                    <p
                      className="text-sm sm:text-base md:text-lg font-medium"
                      style={{ color: textColor }}
                    >
                      {faq.question}
                    </p>
                  </div>

                  <div className="ml-4 flex h-6 w-6 items-center justify-center rounded-full border text-xs shrink-0">
                    <span
                      className="transition-transform"
                      style={{
                        transform: isOpen ? "rotate(0deg)" : "rotate(0deg)",
                        color: textColor,
                      }}
                    >
                      {isOpen ? "−" : "+"}
                    </span>
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                    >
                      <div className="px-4 sm:px-6 pb-5 sm:pb-6 md:pb-7 text-sm sm:text-base">
                        <p
                          className="mb-3 sm:mb-4 leading-relaxed"
                          style={{ color: mutedColor }}
                        >
                          {faq.answer}
                        </p>

                        {faq.bullets && (
                          <ul className="list-disc pl-5 space-y-1.5 sm:space-y-2">
                            {faq.bullets.map((item) => (
                              <li
                                key={item}
                                className="leading-relaxed"
                                style={{ color: mutedColor }}
                              >
                                {item}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


