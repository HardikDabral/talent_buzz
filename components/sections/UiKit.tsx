"use client";

import { useState, useEffect } from "react";
import {
    Search,
    Mic,
    Bell,
    Settings,
    CreditCard,
    BarChart3,
    Calendar,
    MoreHorizontal,
    Image as ImageIcon,
    UploadCloud,
    Play,
    Pause,
    SkipForward,
    Check,
    X,
    Plus,
    ArrowUpRight,
    ShieldCheck,
    Wifi,
    Battery,
    Trash2,
    Star,
    Zap,
    Briefcase,
    MessageSquare,
    Video,
    Clock,
    Volume2,
    Type
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useThemeStore } from "@/lib/store/useThemeStore";

// --- Types & Data ---

type ColorTheme = {
    id: string;
    name: string;
    primary: string;
    secondary: string;
    text: string;
};

const themes: ColorTheme[] = [
    { id: "teal", name: "Teal", primary: "#2C9F85", secondary: "rgba(44, 159, 133, 0.15)", text: "#ffffff" },
    { id: "lime", name: "Lime", primary: "#D9F99D", secondary: "rgba(217, 249, 157, 0.15)", text: "#000000" },
    { id: "violet", name: "Violet", primary: "#8B5CF6", secondary: "rgba(139, 92, 246, 0.15)", text: "#ffffff" },
    { id: "rose", name: "Rose", primary: "#F43F5E", secondary: "rgba(244, 63, 94, 0.15)", text: "#ffffff" },
    { id: "amber", name: "Amber", primary: "#F59E0B", secondary: "rgba(245, 158, 11, 0.15)", text: "#000000" },
    { id: "cyan", name: "Cyan", primary: "#06B6D4", secondary: "rgba(6, 182, 212, 0.15)", text: "#ffffff" },
];

export function UiKit() {
    const { theme } = useThemeStore();
    const [activeTheme, setActiveTheme] = useState<ColorTheme>(themes[0]);
    const [isDark, setIsDark] = useState(false);
    const [toggle1, setToggle1] = useState(true);
    const [toggle2, setToggle2] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

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

    // Styles
    const cardBase = cn(
        "rounded-[1.5rem] border transition-colors relative overflow-hidden",
        isDark ? "bg-[#111111] border-white/10" : "bg-white border-gray-100 shadow-xl shadow-gray-200/50"
    );
    const iconBox = cn(
        "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
        isDark ? "bg-white/5 text-neutral-400 border border-white/5" : "bg-gray-50 text-neutral-500 border border-gray-100"
    );

    return (
        <section
            className={cn(
                "pb-24 md:pb-36 px-6 sm:px-8 lg:px-10 overflow-hidden relative transition-colors duration-500 bg-background",
                isDark ? "text-white" : "text-slate-900"
            )}
            id="ui-kit"
        >
            <div className="max-w-[1440px] mx-auto relative z-10">

                {/* Compact Header */}

                <div className="text-center mb-16">
                    <p
                        className="text-xs mb-3 font-bold tracking-[0.2em] uppercase opacity-70"
                        style={{ color: isDark ? "#ffffff" : "#000000" }}
                    >
                        WEB DEVELOPMENT SERVICES
                    </p>
                    <h2
                        className="text-3xl md:text-5xl font-black tracking-tighter"
                        style={{ color: isDark ? "#ffffff" : "#000000" }}
                    >
                        We Create <span style={{ color: activeTheme.primary }}>Cool UIs</span> & Websites
                    </h2>
                    <p className={cn("text-base opacity-60 mx-auto mt-4", isDark ? "text-neutral-400" : "text-neutral-600")}>
                        Fully customizable and tailored to your needs. We build stunning digital experiences just like these.
                    </p>
                </div>

                {/* --- Denser Bento Grid --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 auto-rows-auto">

                    {/* 1. Subscription / Plan Status (Professional SaaS UI) */}
                    {/* 1. Recruitment Pipeline (Wide Dashboard Widget) */}
                    <div className={cn(cardBase, "col-span-1 lg:col-span-2 p-6 flex flex-col h-full min-h-[220px]")}>
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-3">
                                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", isDark ? "bg-white/5" : "bg-gray-100")}>
                                    <Briefcase size={20} style={{ color: activeTheme.primary }} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold">Product Designer</h4>
                                    <p className="text-xs opacity-50">Active Job • 12 Applicants</p>
                                </div>
                            </div>
                            <button className={cn("w-8 h-8 rounded-full flex items-center justify-center border transition-colors", isDark ? "border-white/10 hover:bg-white/5" : "border-gray-200 hover:bg-gray-50")}>
                                <MoreHorizontal size={16} className="opacity-50" />
                            </button>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 h-full">
                            {/* Stage 1: Applied */}
                            <div className={cn("rounded-xl p-3 flex flex-col gap-2", isDark ? "bg-white/5" : "bg-gray-50")}>
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-bold uppercase opacity-50">Applied</span>
                                    <span className="text-[10px] font-bold opacity-30 bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded">8</span>
                                </div>
                                <div className={cn("p-2 rounded-lg border shadow-sm flex items-center gap-2", isDark ? "bg-[#1A1A1A] border-white/5" : "bg-white border-gray-100")}>
                                    <div className="w-6 h-6 rounded-full bg-orange-100 overflow-hidden"><img src="https://i.pravatar.cc/150?img=12" alt="" className="w-full h-full object-cover" /></div>
                                    <div className="w-8 h-1 rounded-full bg-gray-200 dark:bg-white/10" />
                                </div>
                                <div className={cn("p-2 rounded-lg border shadow-sm flex items-center gap-2 opacity-50", isDark ? "bg-[#1A1A1A] border-white/5" : "bg-white border-gray-100")}>
                                    <div className="w-6 h-6 rounded-full bg-blue-100 overflow-hidden"><img src="https://i.pravatar.cc/150?img=20" alt="" className="w-full h-full object-cover" /></div>
                                    <div className="w-8 h-1 rounded-full bg-gray-200 dark:bg-white/10" />
                                </div>
                            </div>

                            {/* Stage 2: Interview */}
                            <div className={cn("rounded-xl p-3 flex flex-col gap-2 relative overflow-hidden", isDark ? "bg-white/5" : "bg-gray-50")}>
                                <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: activeTheme.primary }} />
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-bold uppercase opacity-50 pl-2">Interview</span>
                                    <span className="text-[10px] font-bold opacity-30 bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded">3</span>
                                </div>
                                <div className={cn("p-2 rounded-lg border shadow-md flex items-center gap-2 translate-x-1", isDark ? "bg-[#222] border-white/10" : "bg-white border-gray-200")}>
                                    <div className="w-6 h-6 rounded-full bg-purple-100 overflow-hidden"><img src="https://i.pravatar.cc/150?img=5" alt="Sarah" className="w-full h-full object-cover" /></div>
                                    <span className="text-[10px] font-bold">Sarah K.</span>
                                </div>
                            </div>

                            {/* Stage 3: Hired */}
                            <div className={cn("rounded-xl p-3 flex flex-col gap-2 border-2 border-dashed border-transparent col-span-2 md:col-span-1", isDark ? "bg-white/5" : "bg-gray-50")}>
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-bold uppercase opacity-50">Hired</span>
                                    <div className={cn("w-4 h-4 rounded-full flex items-center justify-center", isDark ? "bg-white/10" : "bg-gray-200")}>
                                        <Plus size={10} />
                                    </div>
                                </div>
                                <div className="h-full flex items-center justify-center opacity-20">
                                    <span className="text-[10px] font-medium text-center leading-tight">Drag to hire</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 2. Control Center (Toggles & Sliders) */}
                    <div className={cn(cardBase, "col-span-1 p-5 flex flex-col gap-4")}>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium opacity-80">Airplane Mode</span>
                            <button
                                onClick={() => setToggle1(!toggle1)}
                                className={cn("w-12 h-7 rounded-full transition-colors relative", toggle1 ? "bg-opacity-100" : "bg-neutral-200 dark:bg-neutral-800")}
                                style={{ backgroundColor: toggle1 ? activeTheme.primary : undefined }}
                            >
                                <motion.div
                                    initial={false}
                                    animate={{ x: toggle1 ? 22 : 2 }}
                                    className="w-5 h-5 bg-white rounded-full shadow-sm absolute top-1 left-0"
                                />
                            </button>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium opacity-80">Notifications</span>
                            <button
                                onClick={() => setToggle2(!toggle2)}
                                className={cn("w-12 h-7 rounded-full transition-colors relative", toggle2 ? "bg-opacity-100" : "bg-neutral-200 dark:bg-neutral-800")}
                                style={{ backgroundColor: toggle2 ? activeTheme.primary : undefined }}
                            >
                                <motion.div
                                    initial={false}
                                    animate={{ x: toggle2 ? 22 : 2 }}
                                    className="w-5 h-5 bg-white rounded-full shadow-sm absolute top-1 left-0"
                                />
                            </button>
                        </div>
                        {/* Slider */}
                        <div className="space-y-4 pt-2">
                            <div className="space-y-1.5">
                                <div className="flex justify-between text-xs font-medium opacity-60">
                                    <span>Brightness</span>
                                    <span>75%</span>
                                </div>
                                <div className="h-1.5 w-full bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full rounded-full" style={{ width: '75%', backgroundColor: activeTheme.primary }} />
                                </div>
                            </div>

                            <div className="flex items-center gap-3 pt-1">
                                <Volume2 size={14} className="opacity-50" />
                                <div className="h-1.5 flex-1 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full rounded-full" style={{ width: '40%', backgroundColor: activeTheme.primary }} />
                                </div>
                            </div>

                            <div className="flex items-center gap-3 pt-1">
                                <Type size={14} className="opacity-50" />
                                <div className="h-1.5 flex-1 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full rounded-full" style={{ width: '60%', backgroundColor: activeTheme.primary }} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 3. Connect Request (New Widget) */}
                    <div className={cn(cardBase, "col-span-1 p-5 flex flex-col justify-between gap-4")}>
                        {/* Header */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                                    <img src="https://i.pravatar.cc/150?img=11" alt="User" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-1.5">
                                        <h4 className="text-sm font-bold leading-none">Andry Walker</h4>
                                        <div className="flex items-center gap-0.5 text-[#EAB308] text-[10px] font-bold">
                                            <Star size={8} fill="currentColor" /> 5
                                        </div>
                                    </div>
                                    <p className="text-[10px] opacity-50 mt-0.5">Mobile Developer</p>
                                </div>
                            </div>
                            <span className="text-[10px] font-medium opacity-40">5 min ago</span>
                        </div>

                        {/* Message Bubble */}
                        <div className={cn("p-3 rounded-xl text-xs leading-relaxed relative", isDark ? "bg-white/5" : "bg-gray-50 text-neutral-600")}>
                            <div className={cn("absolute -top-1 left-4 w-2 h-2 rotate-45", isDark ? "bg-[#1A1A1A] border-t border-l border-white/5" : "bg-gray-50")} /> {/* Little Arrow Mock */}
                            "Hello, I would like to join, I have a cat with me. Is it no problem? :)"
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                            <button className={cn("w-10 h-10 rounded-xl flex items-center justify-center transition-colors border", isDark ? "bg-white/5 border-white/10 hover:bg-red-500/20 hover:text-red-500 hover:border-red-500/20" : "bg-white border-gray-200 hover:bg-red-50 hover:text-red-500 hover:border-red-200")}>
                                <Trash2 size={16} />
                            </button>
                            <button className={cn("flex-1 h-10 rounded-xl text-xs font-bold transition-colors border", isDark ? "bg-transparent border-white/10 hover:bg-white/5" : "bg-white border-gray-200 hover:bg-gray-50")}>
                                View profile
                            </button>
                            <button
                                className="flex-1 h-10 rounded-xl text-xs font-bold text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
                                style={{ backgroundColor: activeTheme.primary }}
                            >
                                Connect
                            </button>
                        </div>
                    </div>

                    {/* 4. Analytics & Stats (Expanded) */}
                    <div className={cn(cardBase, "col-span-1 md:col-span-2 pt-6 px-6 pb-0 flex flex-col justify-between h-full min-h-[240px]")}>
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <div className={iconBox} style={{ color: activeTheme.primary }}>
                                    <BarChart3 size={20} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold">Analytics</h4>
                                    <p className="text-xs opacity-50">Last 7 Days</p>
                                </div>
                            </div>
                            <div className="flex gap-1">
                                <span className={cn("text-xs font-bold px-2 py-1 rounded cursor-pointer transition-colors", isDark ? "bg-white/10" : "bg-gray-100")}>1W</span>
                                <span className="text-xs font-bold px-2 py-1 rounded opacity-40 cursor-pointer hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5">1M</span>
                            </div>
                        </div>

                        <div className="flex gap-6 h-full items-end">
                            {/* Chart Area */}
                            <div className="flex-grow flex flex-col justify-end gap-2 w-full">
                                <div className="flex justify-between text-xs opacity-50 mb-2 px-1">
                                    <span>Mon</span>
                                    <span>Sun</span>
                                </div>
                                <div className="flex items-end gap-1.5 h-32 w-full">
                                    {[40, 65, 45, 80, 55, 90, 70, 60, 50, 75, 85, 65].map((h, i) => (
                                        <div key={i} className="flex-1 group relative flex flex-col justify-end h-full">
                                            <div
                                                className="w-full rounded-t-sm transition-all duration-500 ease-out group-hover:opacity-80"
                                                style={{ height: `${h}%`, backgroundColor: i % 2 === 0 ? activeTheme.primary : (isDark ? '#333' : '#e5e7eb'), opacity: i % 2 === 0 ? 1 : 0.5 }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Side Stats */}
                            <div className={cn("w-px h-32 mb-6", isDark ? "bg-white/10" : "bg-gray-100")} />

                            <div className="w-1/3 flex flex-col justify-center gap-4 pb-6">
                                <div>
                                    <p className="text-[10px] uppercase font-bold opacity-50 mb-1">Total Visits</p>
                                    <h5 className="text-xl font-bold">128.4k</h5>
                                    <div className="text-[10px] font-bold text-green-500 flex items-center gap-0.5">
                                        <ArrowUpRight size={10} /> +12%
                                    </div>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase font-bold opacity-50 mb-1">Bounce Rate</p>
                                    <h5 className="text-xl font-bold">42.5%</h5>
                                    <div className="text-[10px] font-bold text-red-500 flex items-center gap-0.5">
                                        <ArrowUpRight size={10} className="rotate-90" /> -2%
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* 5. Smart Inputs Group */}
                    <div className="col-span-1 flex flex-col gap-4">
                        {/* Search */}
                        <div className={cn(cardBase, "p-1.5 flex items-center gap-2 pr-2")}>
                            <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center", isDark ? "bg-[#1A1A1A]" : "bg-gray-50")}>
                                <Search size={16} className="opacity-50" />
                            </div>
                            <input type="text" placeholder="Search..." className="bg-transparent border-none outline-none text-sm w-full placeholder:opacity-40 h-full" />
                            <div className="text-[10px] font-bold opacity-30 border px-1.5 py-0.5 rounded">⌘K</div>
                        </div>

                        {/* Dropdown / Select Mock */}
                        <div className={cn(cardBase, "p-4 flex items-center justify-between cursor-pointer hover:bg-black/5 dark:hover:bg-white/5")}>
                            <div className="flex items-center gap-3">
                                <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-white", isDark ? "bg-neutral-800" : "bg-neutral-900")}>
                                    <ImageIcon size={14} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs font-bold">Export As</span>
                                    <span className="text-[10px] opacity-50">PNG, High Quality</span>
                                </div>
                            </div>
                            <ArrowUpRight size={14} className="opacity-40" />
                        </div>

                        {/* Tag Group */}
                        <div className="flex gap-2 flex-wrap">
                            {["UX Design", "Strategy", "Audit"].map((tag, i) => (
                                <span key={i} className={cn("pl-2 pr-3 py-1.5 rounded-full text-xs font-bold border flex items-center gap-1", isDark ? "border-white/10 bg-white/5" : "border-gray-200 bg-white")}>
                                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: activeTheme.primary }} />
                                    {tag}
                                </span>
                            ))}
                            <button className={cn("w-7 h-7 rounded-full border flex items-center justify-center transition-colors", isDark ? "border-white/10 hover:bg-white/10" : "border-gray-200 hover:bg-gray-100")}>
                                <Plus size={14} className="opacity-50" />
                            </button>
                        </div>

                        {/* Members (Filler) */}
                        <div className={cn(cardBase, "p-4 flex items-center justify-between flex-grow")}>
                            <div className="flex items-center -space-x-2">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="w-8 h-8 rounded-full border-2 border-background overflow-hidden">
                                        <img src={`https://i.pravatar.cc/100?img=${i + 15}`} className="w-full h-full object-cover" alt="Member" />
                                    </div>
                                ))}
                                <div className={cn("w-8 h-8 rounded-full border-2 border-background flex items-center justify-center text-[10px] font-bold", isDark ? "bg-[#333] text-white" : "bg-gray-200 text-black")}>+3</div>
                            </div>
                            <button className={cn("text-xs font-bold px-3 py-1.5 rounded-full transition-colors", isDark ? "bg-white text-black hover:bg-gray-200" : "bg-black text-white hover:bg-gray-800")}>
                                Invite
                            </button>
                        </div>
                    </div>

                    {/* 6. File Upload / Dropzone */}
                    <div className={cn(cardBase, "col-span-1 p-6 flex flex-col items-center justify-center text-center border-dashed border-2 h-full min-h-[220px]", isDark ? "border-white/10" : "border-gray-300")}>
                        <div className={cn("w-14 h-14 rounded-full flex items-center justify-center mb-3 transition-colors", isDark ? "bg-[#1A1A1A] group-hover:bg-[#222]" : "bg-gray-50 group-hover:bg-gray-100")}>
                            <UploadCloud size={24} style={{ color: activeTheme.primary }} />
                        </div>
                        <h4 className="text-sm font-bold mb-1">Upload Files</h4>
                        <p className="text-xs opacity-50 mb-4 max-w-[150px]">Drag & drop or click to browse assets</p>
                        <button className={cn("px-4 py-2 rounded-lg text-xs font-bold transition-all hover:scale-105 active:scale-95", isDark ? "bg-white text-black" : "bg-black text-white")}>
                            Browse
                        </button>
                    </div>

                    {/* 7. Theme Picker (Integrated as a Widget) */}
                    <div className={cn(cardBase, "col-span-1 md:col-span-2 lg:col-span-4 p-5 flex flex-col md:flex-row items-center justify-between gap-6")}>
                        <div className="flex items-center gap-4">
                            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", isDark ? "bg-[#1A1A1A]" : "bg-gray-50")}>
                                <Settings size={24} style={{ color: activeTheme.primary }} />
                            </div>
                            <div className="text-center md:text-left">
                                <h4 className="text-lg font-bold">Theme Customizer</h4>
                                <p className="text-sm opacity-50">Preview how components adapt to your brand colors.</p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            {themes.map((theme) => (
                                <button
                                    key={theme.id}
                                    onClick={() => setActiveTheme(theme)}
                                    className={cn(
                                        "w-10 h-10 rounded-full transition-all duration-300 relative group flex items-center justify-center",
                                        activeTheme.id === theme.id ? "scale-110 shadow-lg" : "hover:scale-110 opacity-70 hover:opacity-100"
                                    )}
                                    style={{
                                        backgroundColor: theme.primary,
                                        boxShadow: activeTheme.id === theme.id ? `0 0 20px -5px ${theme.primary}` : undefined
                                    }}
                                    aria-label={`Select ${theme.name} theme`}
                                >
                                    {activeTheme.id === theme.id && <Check className={cn("w-4 h-4", theme.text === '#ffffff' ? "text-white" : "text-black")} />}
                                </button>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
