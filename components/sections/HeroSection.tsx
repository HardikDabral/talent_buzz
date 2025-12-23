"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { PopupForm } from "@/components/sections/Popupform";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const textElementsRef = useRef<HTMLDivElement>(null); // To group text elements for staggered animation

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=1500", // Distance to scroll to complete animation
          scrub: 1, // Smooth interaction
          pin: true,
          // markers: true, // Debugging
        },
      });

      // 1. Grow the video wrapper to full size (with padding)
      tl.to(videoWrapperRef.current, {
        width: "calc(100% - 3rem)", // Leave some space on the sides
        height: "calc(100% - 3rem)", // Leave some space on top/bottom
        borderRadius: "2rem", // Keep rounded corners
        duration: 1.5,
        ease: "power2.inOut",
      })
        // 2. Fade in the content container
        .to(contentRef.current, {
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        }, "-=0.5") // Overlap slightly with the end of the grow
        // 3. Stagger in the text elements
        .from(textElementsRef.current?.children || [], {
          y: 50,
          opacity: 0,
          stagger: 0.15,
          duration: 1,
          ease: "back.out(1.7)",
        });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-background overflow-hidden">
      {/* Centering Container for the Initial State */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Video Wrapper - Starts Small */}
        <div
          ref={videoWrapperRef}
          className="relative overflow-hidden z-0 pointer-events-auto"
          // Initial styles: Small box, rounded corners
          style={{
            width: "80%",
            height: "30%",
            borderRadius: "2rem",
            transformOrigin: "center center"
          }}
        >
          {/* Video Background */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/videos/heroVideo.mp4" type="video/mp4" />
          </video>

          {/* Dark Overlay for Text Readability */}
          <div className="absolute inset-0 bg-black/40 z-[1]" />

          {/* Content Overlay */}
          <div
            ref={contentRef}
            className="absolute inset-0 z-[2] flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-8 lg:px-12 opacity-0"
          >
            <div ref={textElementsRef} className="flex flex-col items-center max-w-4xl">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
                Crafting Intelligent <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3CBFA0] via-[#21F4BD] to-[#CFFFF1]">
                  Web & App Solutions
                </span>
              </h1>

              <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 max-w-2xl font-light leading-relaxed">
                We build cutting-edge websites and mobile applications integrated with advanced AI technologies to accelerate your business growth.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <PopupForm
                  trigger={
                    <Button
                      size="lg"
                      className="bg-[#2C9F85] hover:bg-[#3CBFA0] text-white text-lg px-8 py-6 rounded-full font-semibold transition-all hover:scale-105"
                    >
                      Start Your Project &gt;
                    </Button>
                  }
                />

                <p className="text-white/80 text-sm">
                  AI-Powered • Scalable • Secure
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
