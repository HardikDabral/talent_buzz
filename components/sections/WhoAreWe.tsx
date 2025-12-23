"use client";

import Image from "next/image";
import { useThemeStore } from "@/lib/store/useThemeStore";
import { useEffect, useState } from "react";
import { Play } from "lucide-react";

export function WhoAreWe() {
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

    // Handle potential missing images gracefully
    const placeholderImage = "/images/talents/bigImage1.jpg";

    return (
        <section className=" px-4 sm:px-6 lg:px-8 bg-background transition-colors duration-300">
            <div className="mx-auto max-w-[1440px]">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                    {/* Left Side: Title */}
                    <div className="lg:col-span-4">
                        <h2
                            className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4"
                            style={{ color: isDark ? "#ffffff" : "#000000" }}
                        >
                            Builders for the <br /> Future
                        </h2>
                        <p
                            className="text-sm font-medium opacity-60 max-w-xs"
                            style={{ color: isDark ? "#ffffff" : "#000000" }}
                        >
                            We want our clients to be inspired to build their dream products with us.
                        </p>
                    </div>

                    {/* Right Side: Text with Inline Image */}
                    <div className="lg:col-span-8">
                        <div
                            className="text-xl sm:text-2xl md:text-3xl font-medium leading-relaxed"
                            style={{ color: isDark ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.8)" }}
                        >
                            <span>We are a group of developers who create awesome websites and mobile apps. </span>

                            {/* Inline Image 1 */}
                            <span className="inline-flex items-center justify-center align-middle mx-2 relative h-10 w-20 sm:h-12 sm:w-24 rounded-full overflow-hidden translate-y-1">
                                <Image
                                    src="/images/talents/aiml.jpg"
                                    alt="Developers"
                                    fill
                                    className="object-cover"
                                />
                                {/* Play Button Overlay */}
                                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/40">
                                        <Play className="w-3 h-3 text-white fill-white" />
                                    </div>
                                </div>
                            </span>

                            <span> Our solutions are crafted by tech experts to be as </span>
                            <span style={{ color: isDark ? "#ffffff" : "#000000" }}>robust </span>
                            <span>as they are </span>
                            <span style={{ color: isDark ? "#ffffff" : "#000000" }}>innovative.</span>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
