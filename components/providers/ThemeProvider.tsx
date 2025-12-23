"use client";

import { useEffect } from "react";
import { useThemeStore } from "@/lib/store/useThemeStore";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useThemeStore();

  useEffect(() => {
    // Initialize theme immediately on mount - no delay
    if (typeof window !== "undefined") {
      let savedTheme: "light" | "dark" = "dark";
      try {
        savedTheme = (localStorage.getItem("theme") as "light" | "dark") || "dark";
      } catch (e) {
        console.warn("LocalStorage access denied, defaulting to dark mode");
      }

      const root = document.documentElement;

      // Remove any existing dark class first
      root.classList.remove("dark");

      // Apply theme immediately
      if (savedTheme === "dark") {
        root.classList.add("dark");
      }

      // Sync store
      setTheme(savedTheme);
    }
  }, [setTheme]);

  return <>{children}</>;
}
