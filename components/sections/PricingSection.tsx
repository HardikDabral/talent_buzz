"use client";

import { useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Check, ArrowUpRight, Zap, Star, Shield, Signal, Wifi } from "lucide-react";
import { useThemeStore } from "@/lib/store/useThemeStore";
import { PopupForm } from "@/components/sections/Popupform";
import { cn } from "@/lib/utils";

type PricingTier = {
    id: number;
    name: string;
    price: string;
    description: string;
    features: string[];
    recommended?: boolean;
    accentColor: string;
    icon: React.ReactNode;
};

const pricingTiers: PricingTier[] = [
    {
        id: 1,
        name: "Basic",
        price: "₹9,999",
        description: "Perfect for early-stage startups.",
        features: [
            "Custom UI/UX Design",
            "Responsive Web Dev",
            "Basic SEO Setup",
            "2 Revisions",
        ],
        accentColor: "from-blue-400 to-blue-600",
        icon: <Zap className="w-5 h-5" />,
    },
    {
        id: 2,
        name: "Standard",
        price: "₹19,999",
        description: "Growth tools for scaling teams.",
        features: [
            "Everything in Basic",
            "CMS Integration",
            "Advanced Animations",
            "Social Integration",
            "5 Revisions",
        ],
        recommended: true,
        accentColor: "from-[#2C9F85] to-[#2ecc71]",
        icon: <Star className="w-5 h-5" />,
    },
    {
        id: 3,
        name: "Premium",
        price: "₹29,999",
        description: "Full-scale enterprise solutions.",
        features: [
            "Everything in Standard",
            "E-commerce Ready",
            "AI Integration",
            "Adv. Analytics",
            "Unlimited Revisions",
        ],
        accentColor: "from-purple-400 to-pink-600",
        icon: <Shield className="w-5 h-5" />,
    },
];

// 90-Degree Inverted Corner Curve
const CornerCurve = ({ className, fill }: { className?: string; fill: string }) => (
    <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        preserveAspectRatio="none"
    >
        <path
            d="M0 0 Q 0 100 100 100 L 0 100 Z"
            fill={fill}
        />
    </svg>
);

export function PricingSection() {
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

    const [emblaRef] = useEmblaCarousel({
        align: "start",
        loop: false,
        slidesToScroll: 1,
        breakpoints: {
            "(min-width: 1024px)": { active: false },
            "(min-width: 768px)": { slidesToScroll: 1, align: "start" },
        },
    });

    const cardBgColor = isDark ? "#111111" : "#ffffff";

    // Dimensions for the "Gap"
    const tabHeight = "5.5rem";
    const tabWidth = "55%";

    const curveSize = "2.5rem";
    const curveTop = "3rem";

    return (
        <section id="pricing" className="pb-0 md:pb-20 px-4 sm:px-6 lg:px-8 bg-background transition-colors duration-300 overflow-hidden">
            <div className="mx-auto max-w-[1440px]">
                {/* Header content ... */}
                <div className="text-center mb-16">
                    <p
                        className="text-xs mb-3 font-bold tracking-[0.2em] uppercase opacity-70"
                        style={{ color: isDark ? "#ffffff" : "#000000" }}
                    >
                        PLANS & PRICING
                    </p>
                    <h2
                        className="text-3xl md:text-5xl font-black tracking-tighter"
                        style={{ color: isDark ? "#ffffff" : "#000000" }}
                    >
                        Simple <span className="text-[#2C9F85]">Pricing</span>
                    </h2>
                </div>

                {/* Carousel / Grid Container */}
                <div className="relative">
                    {/* INCREASED PADDING and NEGATIVE MARGIN on the viewport container to prevent clipping of shadows/transforms */}
                    <div className="overflow-hidden p-8 -m-8 pb-12 mb-12" ref={emblaRef}>
                        <div className="flex lg:grid lg:grid-cols-3 gap-8 lg:gap-10 -ml-4 sm:-ml-0">
                            {pricingTiers.map((tier) => (
                                <div
                                    key={tier.id}
                                    className="flex-[0_0_100%] sm:flex-[0_0_50%] min-w-0 pl-4 sm:pl-0 lg:w-auto hover:-translate-y-2 transition-transform duration-300"
                                >
                                    {/* Restored Min-Height 500px to ensure good vertical rhythm */}
                                    <div className="relative w-full min-h-[400px] md:min-h-[500px] flex flex-col">

                                        {/* --- THE SHAPE CONSTRUCTION --- */}
                                        <div className="absolute inset-0 z-0 drop-shadow">
                                            {/* 1. Main Body (Low Section) */}
                                            <div
                                                className="absolute bottom-0 left-0 w-full rounded-b-[2.5rem] rounded-tr-[2.5rem]"
                                                style={{
                                                    backgroundColor: cardBgColor,
                                                    height: `calc(100% - ${tabHeight})`
                                                }}
                                            />

                                            {/* 2. Top-Left Tab (High Section) */}
                                            <div
                                                className="absolute top-0 left-0"
                                                style={{
                                                    backgroundColor: cardBgColor,
                                                    width: tabWidth,
                                                    height: tabHeight,
                                                    borderTopLeftRadius: '2.5rem',
                                                    borderTopRightRadius: '1.5rem',
                                                }}
                                            />

                                            {/* 3. The 90-Degree Connector */}
                                            <div
                                                className="absolute"
                                                style={{
                                                    top: curveTop,
                                                    left: tabWidth,
                                                    width: curveSize,
                                                    height: curveSize,
                                                }}
                                            >
                                                <CornerCurve fill={cardBgColor} className="w-full h-full block" />
                                            </div>

                                            {/* 4. Filler Block for Seam Safety */}
                                            <div
                                                className="absolute left-0"
                                                style={{
                                                    top: '4rem',
                                                    width: tabWidth,
                                                    height: '5rem',
                                                    backgroundColor: cardBgColor
                                                }}
                                            />
                                        </div>

                                        {/* --- CONTENT LAYER --- */}
                                        <div className="relative z-10 h-full flex flex-col p-6 sm:p-8 flex-grow">
                                            {/* Top Bar */}
                                            <div className="flex justify-between items-start mb-2">
                                                <div className={cn(
                                                    "px-4 py-1.5 mt-2 rounded-full text-xs font-bold uppercase tracking-wider bg-black/5 dark:bg-white/10 relative top-1",
                                                    isDark ? "text-white/90" : "text-black/80"
                                                )}>
                                                    {tier.name}
                                                </div>

                                                {/* ACTION BUTTON */}
                                                <div className="absolute top-6 right-6 z-50">
                                                    <PopupForm
                                                        trigger={
                                                            <button
                                                                className={cn(
                                                                    "px-5 py-3 rounded-full font-bold text-xs tracking-wide flex items-center gap-1.5 transition-all duration-300 shadow-xl hover:scale-105 active:scale-95",
                                                                    tier.recommended
                                                                        ? "bg-[#2C9F85] text-white hover:bg-[#258770]"
                                                                        : (isDark ? "bg-white text-black" : "bg-black text-white")
                                                                )}
                                                            >
                                                                Get Started
                                                                <ArrowUpRight className="w-3.5 h-3.5" />
                                                            </button>
                                                        }
                                                    />
                                                </div>
                                            </div>

                                            {/* Content Wrapper */}
                                            <div className="mt-8 flex-grow flex flex-col justify-end">
                                                <div className={cn(
                                                    "rounded-[2rem] p-6 relative overflow-hidden flex flex-col gap-6",
                                                    isDark ? "bg-[#1A1A1A]" : "bg-gray-50 border border-gray-100"
                                                )}>

                                                    {/* PRICE BLOCK */}
                                                    <div className="relative z-10">
                                                        <span className={cn("text-xs font-bold tracking-wider uppercase opacity-60 block mb-1", isDark ? "text-white" : "text-black")}>
                                                            Starting From
                                                        </span>
                                                        <h3 className={cn(
                                                            "text-5xl font-black tracking-tighter leading-none text-[#2C9F85]"
                                                        )}>
                                                            {tier.price}
                                                        </h3>
                                                        <p className={cn("text-sm font-medium mt-2 pl-1 opacity-60", isDark ? "text-white" : "text-black")}>
                                                            {tier.description}
                                                        </p>
                                                    </div>

                                                    {/* FEATURES LIST */}
                                                    <div className="flex flex-col gap-3.5 pt-2 border-t border-black/5 dark:border-white/5 mt-2">
                                                        {tier.features.map((feature, i) => (
                                                            <div key={i} className="flex items-center gap-3">
                                                                <div className={cn(
                                                                    "w-1.5 h-1.5 rounded-full shrink-0",
                                                                    tier.recommended ? "bg-[#2C9F85]" : (isDark ? "bg-white/30" : "bg-black/20")
                                                                )} />
                                                                <span className={cn(
                                                                    "text-sm font-medium",
                                                                    isDark ? "text-neutral-300" : "text-neutral-600"
                                                                )}>
                                                                    {feature}
                                                                </span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
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
