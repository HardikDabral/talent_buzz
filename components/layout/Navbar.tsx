"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, LogIn, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useThemeStore } from "@/lib/store/useThemeStore";

const navItems = [
  { href: "/", label: "What's Included" },
  { href: "/stories", label: "Stories" },
  { href: "/why", label: "Our Why" },
  { href: "/faqs", label: "FAQs" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const { theme, toggleTheme } = useThemeStore();

  useEffect(() => {
    // Apply theme on mount
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") || "dark";
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }
  }, []);

  useEffect(() => {
    // First, show the logo in a small navbar
    const timer1 = setTimeout(() => {
      setIsExpanded(true);
    }, 200);

    // Then, show the navigation items and buttons
    const timer2 = setTimeout(() => {
      setShowContent(true);
    }, 1200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <nav className="fixed top-10 left-1/2 -translate-x-1/2 z-50 w-full max-w-[96%] sm:max-w-[93%] md:max-w-[90%] lg:max-w-[88%] xl:max-w-[1200px] 2xl:max-w-[1300px] px-4 sm:px-6 flex justify-center">
      <motion.div
        className="relative flex items-center justify-center lg:justify-between h-16 py-3 pl-4 sm:pl-6 md:pl-8 pr-2 sm:pr-3 rounded-full bg-black/30 dark:bg-black/30 backdrop-blur-2xl border border-white/20 dark:border-white/20 shadow-xl overflow-hidden"
        initial={{ width: "300px", marginLeft: "auto", marginRight: "auto" }}
        animate={{
          width: isExpanded ? "100%" : "300px",
          marginLeft: isExpanded ? "0" : "auto",
          marginRight: isExpanded ? "0" : "auto",
          justifyContent: isExpanded ? "space-between" : "center",
        }}
        transition={{
          duration: 1.2,
          ease: [0.4, 0, 0.2, 1],
        }}
      >
        {/* Mobile: Logo on Left */}
        <div className="lg:hidden">
          <Link href="/" className="text-xl sm:text-2xl font-bold text-white lowercase whitespace-nowrap">
            talentbuzz
          </Link>
        </div>

        {/* Desktop: Center - Brand Name (always centered) */}
        <div className="hidden lg:block absolute left-1/2 -translate-x-1/2">
          <Link href="/" className="text-xl sm:text-2xl font-bold text-white lowercase whitespace-nowrap">
            talentbuzz
          </Link>
        </div>

        {/* Desktop: Left - Navigation Links */}
        <AnimatePresence>
          {showContent && (
            <motion.div
              className="hidden lg:flex items-center gap-6 sm:gap-8 md:gap-10"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className="text-sm sm:text-[15px] text-white font-medium transition-opacity hover:opacity-80 whitespace-nowrap"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Desktop: Right - Theme Toggle & Login Button */}
        <AnimatePresence>
          {showContent && (
            <motion.div
              className="hidden lg:flex items-center gap-4 sm:gap-6"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Theme Toggle Button */}
              <motion.button
                onClick={toggleTheme}
                className="p-2.5 rounded-full bg-white/10 dark:bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20 transition-all"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  <Moon className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
              </motion.button>

              {/* Login Button */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.6 }}
              >
                <Link
                  href="/login"
                  className="flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-orange-500 text-white text-sm sm:text-[15px] font-semibold transition-colors hover:bg-orange-600 whitespace-nowrap"
                >
                  <LogIn className="w-4 h-4 sm:w-5 sm:h-5" />
                  Login
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile: Theme Toggle & Burger Icon on Right */}
        <div className="lg:hidden flex items-center gap-2">
          <motion.button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-white/10 dark:bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20 transition-all"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </motion.button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white p-2"
            aria-label="Toggle menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </motion.div>
    </nav>
  );
}
