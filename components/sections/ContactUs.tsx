"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useThemeStore } from "@/lib/store/useThemeStore";
import { ArrowRight, Send, CheckCircle2, Phone } from "lucide-react";

export function ContactUs() {
    const { theme } = useThemeStore();
    // We can use the isDark state if needed for specific conditional rendering
    // but standard tailwind dark: classes are preferred where possible.

    const [formState, setFormState] = useState({
        name: "",
        phone: "",
        email: "",
        type: "Web Development",
        message: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [phoneError, setPhoneError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setPhoneError("");

        // Basic Phone Validation (10-15 digits)
        const phoneRegex = /^\d{10,15}$/;
        if (!phoneRegex.test(formState.phone.replace(/\D/g, ''))) {
            setPhoneError("Valid phone number required (10-15 digits)");
            return;
        }

        setIsSubmitting(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setIsSuccess(true);
        // Reset after showing success
        setTimeout(() => {
            setIsSuccess(false);
            setFormState({ name: "", phone: "", email: "", type: "Web Development", message: "" });
        }, 3000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
        if (e.target.name === "phone") setPhoneError("");
    };

    return (
        <section id="contact" className="pb-24 md:pb-32 px-4 sm:px-6 lg:px-8 bg-background transition-colors duration-300">
            <div className="mx-auto max-w-[1440px]">

                {/* Main "Folder" Container */}
                <div className="relative">

                    {/* Top Row Layout */}
                    <div className="flex flex-col lg:flex-row items-stretch lg:items-start gap-6 mb-6 lg:mb-0 lg:-ml-[1px]"> {/* -ml-1 to overlap slightly if needed, but grid is cleaner */}

                        {/* Large Colored Area Title */}
                        <div className="flex-1 bg-[#2C9F85] text-white p-8 sm:p-12 lg:pt-16 lg:pb-2  rounded-[2.5rem]  lg:rounded-br-none lg:rounded-bl-[0rem] relative z-10">
                            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
                                Lets Build
                            </h2>
                            <p className="text-white/80 max-w-md text-lg">
                                Have a vision? We have the team. <br />
                                Fill out the form below to get started.
                            </p>

                            {/* Inverted Curve Connector */}
                            <svg
                                className="hidden lg:block absolute bottom-0 -right-[40px] w-[40px] h-[40px] fill-[#2C9F85] z-10"
                                viewBox="0 0 40 40"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M0 0 L0 40 L40 40 A40 40 0 0 1 0 0 Z" />
                            </svg>
                        </div>

                        <div className="lg:w-[400px] bg-card p-8 rounded-[2rem] flex flex-col justify-center relative z-20 shadow-2xl">
                            <p className="text-sm font-medium uppercase tracking-wider mb-2 text-muted-foreground">
                                Response Time
                            </p>
                            <h3 className="text-xl font-bold text-foreground">
                                Within 24 Hours
                            </h3>
                            <p className="text-sm mt-2 text-muted-foreground">
                                Our team reviews every request carefully to ensure we are the perfect match.
                            </p>
                        </div>
                    </div>

                    {/* Bottom Form Area */}
                    <div className="bg-[#2C9F85] p-4 sm:p-6 lg:p-8 rounded-[2.5rem]  lg:rounded-tr-[2.5rem]  lg:rounded-tl-[0rem]  relative z-0">

                        {/* The Form Card (White Box) */}
                        <div className="bg-card rounded-[2rem] p-6 sm:p-8 shadow-xl">
                            <div className="mb-6">
                                <h3 className="text-2xl font-bold text-foreground mb-1">
                                    Project Details
                                </h3>
                                <p className="text-muted-foreground text-sm">
                                    Tell us what you need. We'll handle the rest.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                {/* Name */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground ml-1">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formState.name}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                        className="w-full bg-[var(--contact-input-bg)] border border-[var(--contact-input-border)] rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#2C9F85] focus:border-transparent transition-all backdrop-blur-xl dark:shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.02)] text-foreground placeholder:text-muted-foreground/50"
                                    />
                                </div>

                                {/* Phone Number */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground ml-1">Phone Number</label>
                                    <div className="relative flex items-center gap-2">
                                        <div className="relative w-[85px] shrink-0">
                                            <select
                                                name="countryCode"
                                                className="w-full bg-[var(--contact-input-bg)] border border-[var(--contact-input-border)] rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#2C9F85] focus:border-transparent transition-all backdrop-blur-xl dark:shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.02)] text-foreground appearance-none pl-9"
                                            >
                                                <option>+91</option>
                                                <option>+1</option>
                                                <option>+44</option>
                                                <option>+61</option>
                                                <option>+81</option>
                                            </select>
                                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                                                <span className="text-sm">🇮🇳</span>
                                            </div>
                                        </div>
                                        <div className="relative flex-grow">
                                            <input
                                                type="tel"
                                                name="phone"
                                                required
                                                value={formState.phone}
                                                onChange={handleChange}
                                                placeholder="Phone"
                                                className="w-full bg-[var(--contact-input-bg)] border border-[var(--contact-input-border)] rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#2C9F85] focus:border-transparent transition-all backdrop-blur-xl dark:shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.02)] text-foreground placeholder:text-muted-foreground/50"
                                            />
                                        </div>
                                    </div>
                                    {phoneError && <p className="text-red-500 text-xs ml-1 mt-1">{phoneError}</p>}
                                </div>

                                {/* Email */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground ml-1">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formState.email}
                                        onChange={handleChange}
                                        placeholder="john@example.com (Optional)"
                                        className="w-full bg-[var(--contact-input-bg)] border border-[var(--contact-input-border)] rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#2C9F85] focus:border-transparent transition-all backdrop-blur-xl dark:shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.02)] text-foreground placeholder:text-muted-foreground/50"
                                    />
                                </div>

                                {/* Interest */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground ml-1">Interest</label>
                                    <div className="relative">
                                        <select
                                            name="type"
                                            value={formState.type}
                                            onChange={handleChange}
                                            className="w-full bg-[var(--contact-input-bg)] border border-[var(--contact-input-border)] rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#2C9F85] focus:border-transparent transition-all backdrop-blur-xl dark:shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.02)] text-foreground appearance-none"
                                        >
                                            <option>Web Development</option>
                                            <option>Mobile App</option>
                                            <option>AI Solution</option>
                                            <option>E-Commerce</option>
                                            <option>Other</option>
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Message */}
                                <div className="col-span-1 md:col-span-2 space-y-1.5">
                                    <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground ml-1">Project Details</label>
                                    <textarea
                                        name="message"
                                        value={formState.message}
                                        onChange={handleChange}
                                        placeholder="Tell us about your goals, features, and timeline... (Optional)"
                                        rows={3}
                                        className="w-full bg-[var(--contact-input-bg)] border border-[var(--contact-input-border)] rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#2C9F85] focus:border-transparent transition-all overflow-hidden resize-none backdrop-blur-xl dark:shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.02)] text-foreground placeholder:text-muted-foreground/50"
                                    />
                                </div>

                                {/* Submit Action */}
                                <div className="col-span-1 md:col-span-2 flex items-center justify-end mt-2">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#2C9F85] text-white font-semibold text-base transition-all hover:bg-[#3CBFA0] hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100"
                                    >
                                        {isSubmitting ? (
                                            <span>Sending...</span>
                                        ) : isSuccess ? (
                                            <>
                                                <span>Sent Successfully</span>
                                                <CheckCircle2 className="w-5 h-5" />
                                            </>
                                        ) : (
                                            <>
                                                <span>Send Proposal</span>
                                                <Send className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                            </>
                                        )}
                                    </button>
                                </div>

                            </form>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
}