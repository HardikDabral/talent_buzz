"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Send, CheckCircle2, User, Mail, Briefcase, ArrowRight, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PopupFormProps {
    trigger?: React.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

export function PopupForm({ trigger, open: controlledOpen, onOpenChange: setControlledOpen }: PopupFormProps) {
    const [internalOpen, setInternalOpen] = useState(false);

    const isControlled = controlledOpen !== undefined;
    const open = isControlled ? controlledOpen : internalOpen;
    const setOpen = isControlled ? (setControlledOpen || (() => { })) : setInternalOpen;

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
        // Reset after showing success and close only if user doesn't close manually
        setTimeout(() => {
            setIsSuccess(false);
            setFormState({
                name: "",
                phone: "",
                email: "",
                type: "Web Development",
                message: "",
            });
            setOpen(false);
        }, 2500);
    };

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
        if (e.target.name === "phone") setPhoneError("");
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger || (
                    <button className="px-6 py-3 rounded-full bg-[#2C9F85] text-white font-semibold hover:bg-[#3CBFA0] transition-colors shadow-lg hover:shadow-xl">
                        Get Started
                    </button>
                )}
            </DialogTrigger>
            <DialogContent className="w-[90vw] sm:w-full sm:max-w-[625px] p-0 bg-background/95 backdrop-blur-xl border-white/10 dark:border-white/10 shadow-2xl overflow-hidden rounded-3xl">
                <div className="relative p-6 sm:p-8">
                    {/* Decorative Background Elements */}
                    <div className="absolute top-0 right-0 -mt-16 -mr-16 w-32 h-32 bg-[#2C9F85]/20 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

                    <DialogHeader className="mb-6 relative z-10">
                        <DialogTitle className="text-3xl font-bold tracking-tight mb-2">
                            Lets <span className="text-[#2C9F85]">Build</span>
                        </DialogTitle>
                        <DialogDescription className="text-base text-muted-foreground/90">
                            Tell us about your vision. We'll craft the digital solution.
                        </DialogDescription>
                    </DialogHeader>

                    <AnimatePresence mode="wait">
                        {isSuccess ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="flex flex-col items-center justify-center py-12 text-center"
                            >
                                <div className="w-16 h-16 rounded-full bg-[#2C9F85]/10 flex items-center justify-center mb-4 text-[#2C9F85]">
                                    <CheckCircle2 className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-bold mb-2">Request Sent!</h3>
                                <p className="text-muted-foreground">
                                    We'll get back to you within 24 hours.
                                </p>
                            </motion.div>
                        ) : (
                            <motion.form
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onSubmit={handleSubmit}
                                className="space-y-5 relative z-10"
                            >
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {/* Name */}
                                    <div className="space-y-1.5 hover:group">
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="name"
                                                required
                                                value={formState.name}
                                                onChange={handleChange}
                                                placeholder="Name"
                                                className="w-full bg-secondary/30 border border-border focus:border-[#2C9F85]/50 hover:border-border/80 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-[#2C9F85]/10 transition-all placeholder:text-muted-foreground/50"
                                            />
                                            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/60 transition-colors">
                                                <User className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Phone Number */}
                                    <div className="space-y-1.5">
                                        <div className="relative flex items-center gap-2">
                                            <div className="relative w-[85px] shrink-0">
                                                <select
                                                    name="countryCode"
                                                    className="w-full bg-secondary/30 border border-border focus:border-[#2C9F85]/50 hover:border-border/80 rounded-xl px-3 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-[#2C9F85]/10 transition-all appearance-none text-muted-foreground/90 pl-8"
                                                >
                                                    <option>+91</option>
                                                    <option>+1</option>
                                                    <option>+44</option>
                                                    <option>+61</option>
                                                    <option>+81</option>
                                                </select>
                                                {/* Flag/Globe Icon for Country Code */}
                                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/60 pointer-events-none">
                                                    <span className="text-xs">🇮🇳</span>
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
                                                    className="w-full bg-secondary/30 border border-border focus:border-[#2C9F85]/50 hover:border-border/80 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-[#2C9F85]/10 transition-all placeholder:text-muted-foreground/50"
                                                />
                                                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/60">
                                                    <Phone className="w-4 h-4" />
                                                </div>
                                            </div>
                                        </div>
                                        {phoneError && <p className="text-red-500 text-xs ml-1 mt-1">{phoneError}</p>}
                                    </div>

                                    {/* Email */}
                                    <div className="space-y-1.5">
                                        <div className="relative">
                                            <input
                                                type="email"
                                                name="email"
                                                value={formState.email}
                                                onChange={handleChange}
                                                placeholder="Email (Optional)"
                                                className="w-full bg-secondary/30 border border-border focus:border-[#2C9F85]/50 hover:border-border/80 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-[#2C9F85]/10 transition-all placeholder:text-muted-foreground/50"
                                            />
                                            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/60">
                                                <Mail className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Interest */}
                                    <div className="space-y-1.5">
                                        <div className="relative">
                                            <select
                                                name="type"
                                                value={formState.type}
                                                onChange={handleChange}
                                                className="w-full bg-secondary/30 border border-border focus:border-[#2C9F85]/50 hover:border-border/80 rounded-xl pl-10 pr-8 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-[#2C9F85]/10 transition-all appearance-none text-muted-foreground/90"
                                            >
                                                <option>Web Development</option>
                                                <option>Mobile App</option>
                                                <option>AI Solution</option>
                                                <option>E-Commerce</option>
                                                <option>Other</option>
                                            </select>
                                            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/60">
                                                <Briefcase className="w-4 h-4" />
                                            </div>
                                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground/60">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <textarea
                                        name="message"
                                        value={formState.message}
                                        onChange={handleChange}
                                        placeholder="Tell us about your project goals... (Optional)"
                                        rows={3}
                                        className="w-full bg-secondary/30 border border-border focus:border-[#2C9F85]/50 hover:border-border/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-[#2C9F85]/10 transition-all resize-none placeholder:text-muted-foreground/50"
                                    />
                                </div>

                                {/* Submit Button */}
                                <div className="mt-2">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full group relative inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#2C9F85] text-white font-semibold text-sm tracking-wide shadow-[0_1px_30px_rgba(44,159,133,0.4)] hover:shadow-[0_1px_40px_rgba(44,159,133,0.6)] hover:bg-[#34bc9d] hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-70 disabled:hover:scale-100 disabled:shadow-none"
                                    >
                                        {isSubmitting ? (
                                            <span>Sending...</span>
                                        ) : (
                                            <>
                                                <span>Request Proposal</span>
                                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </div>
            </DialogContent>
        </Dialog >
    );
}
