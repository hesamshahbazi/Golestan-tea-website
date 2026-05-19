"use client";

import { useEffect, useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLang } from "@/lib/lang";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface OverlayTextProps {
  children: React.ReactNode;
  opacity: MotionValue<number>;
  y: MotionValue<number>;
  subtitle?: string;
  align?: "left" | "center" | "right";
}

function OverlayText({ children, opacity, y, subtitle, align = "center" }: OverlayTextProps) {
  const visibility = useTransform(opacity, (v) => (v < 0.01 ? "hidden" : "visible"));

  const alignClass =
    align === "left"
      ? "items-start text-left"
      : align === "right"
      ? "items-end text-right"
      : "items-center text-center";

  return (
    <motion.div
      className={`absolute inset-0 z-20 flex flex-col justify-center px-8 md:px-20 pointer-events-none ${alignClass}`}
      style={{ opacity, y, visibility }}
    >
      {subtitle && (
        <p className="smallcaps text-gold text-xs md:text-sm mb-4 font-inter tracking-smallcaps">
          {subtitle}
        </p>
      )}
      <h2
        className="font-cormorant font-light text-off-white leading-none"
        style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
      >
        {children}
      </h2>
    </motion.div>
  );
}

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { t } = useLang();
  const targetTimeRef = useRef(0);
  const rafRef = useRef<number>(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // ── Text phases — 12% dead zones, no two phases ever overlap ────────────
  // Pattern: [fade-in-start, fully-visible, fully-visible, fade-out-end]
  // Phase 1 fade-in spans 6% (≈1.5s at normal scroll speed) for a smooth ease-in feel

  // Phase 1 — 20–30%  (shifted from top; wide 6% fade-in for smooth entry)
  const op1 = useTransform(scrollYProgress, [0.20, 0.26, 0.28, 0.30], [0, 1, 1, 0]);
  const y1  = useTransform(scrollYProgress, [0.20, 0.26, 0.28, 0.30], [24, 0, 0, -24]);

  // Phase 2 — 42–56%  (dead zone 30–42% = 12%)
  const op2 = useTransform(scrollYProgress, [0.42, 0.47, 0.51, 0.56], [0, 1, 1, 0]);
  const y2  = useTransform(scrollYProgress, [0.42, 0.47, 0.51, 0.56], [24, 0, 0, -24]);

  // Phase 3 — 68–82%  (dead zone 56–68% = 12%)
  const op3 = useTransform(scrollYProgress, [0.68, 0.73, 0.77, 0.82], [0, 1, 1, 0]);
  const y3  = useTransform(scrollYProgress, [0.68, 0.73, 0.77, 0.82], [24, 0, 0, -24]);

  // Phase 4 — 90–100%  (dead zone 82–90% = 8%)
  const op4 = useTransform(scrollYProgress, [0.90, 0.94, 0.97, 1.00], [0, 1, 1, 0]);
  const y4  = useTransform(scrollYProgress, [0.90, 0.94, 0.97, 1.00], [24, 0, 0, -24]);

  // Scroll progress bar
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";
    video.load();

    const onLoadedMetadata = () => {
      video.pause();
      video.currentTime = 0;
    };
    video.addEventListener("loadedmetadata", onLoadedMetadata);

    // Fast lerp so video seeking feels snappy
    const tick = () => {
      if (video.paused && video.duration && !isNaN(video.duration)) {
        const diff = targetTimeRef.current - video.currentTime;
        if (Math.abs(diff) > 0.008) {
          video.currentTime += diff * 0.4;
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useGSAP(
    () => {
      const video = videoRef.current;
      const container = containerRef.current;
      if (!video || !container) return;

      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        anticipatePin: 1,
        onUpdate: (self) => {
          if (video.duration && !isNaN(video.duration)) {
            targetTimeRef.current = self.progress * video.duration;
          }
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative"
      style={{ height: "600vh" }}
    >
      <div
        className="sticky top-0 h-screen overflow-hidden bg-pure-black"
        style={{ height: "100svh" }}
      >
        {/* Video */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          muted
          playsInline
          preload="auto"
          style={{ willChange: "transform", objectPosition: "center" }}
        >
          <source src="/hero-scrub.mp4" type="video/mp4" />
        </video>

        {/* Vignette */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 85% 85% at 50% 50%, transparent 45%, rgba(0,0,0,0.55) 100%)",
          }}
        />

        {/* Corner brackets */}
        <div className="absolute inset-5 md:inset-8 pointer-events-none" style={{ zIndex: 10, isolation: "isolate" }}>
          <svg className="absolute left-0" style={{ top: "70px" }} width="56" height="56" viewBox="0 0 56 56" fill="none">
            <path d="M2 54 L2 2 L54 2" stroke="#C9A961" strokeWidth="0.75" opacity="0.7" />
          </svg>
          <svg className="absolute right-0" style={{ top: "70px" }} width="56" height="56" viewBox="0 0 56 56" fill="none">
            <path d="M54 54 L54 2 L2 2" stroke="#C9A961" strokeWidth="0.75" opacity="0.7" />
          </svg>
          <svg className="absolute bottom-0 left-0" width="56" height="56" viewBox="0 0 56 56" fill="none">
            <path d="M2 2 L2 54 L54 54" stroke="#C9A961" strokeWidth="0.75" opacity="0.7" />
          </svg>
          <svg className="absolute bottom-0 right-0" width="56" height="56" viewBox="0 0 56 56" fill="none">
            <path d="M54 2 L54 54 L2 54" stroke="#C9A961" strokeWidth="0.75" opacity="0.7" />
          </svg>
        </div>

        {/* Scroll progress bar */}
        <motion.div
          className="absolute right-8 md:right-10 top-1/4 bottom-1/4 z-20 w-px origin-top pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, transparent, #C9A961, transparent)",
            scaleY,
          }}
        />

        {/* Text overlays — visibility: hidden when opacity < 0.01 prevents bleed-through */}
        <OverlayText opacity={op1} y={y1} subtitle={t.hero.phase1.subtitle}>
          {t.hero.phase1.line1}<br />{t.hero.phase1.line2}
        </OverlayText>

        <OverlayText opacity={op2} y={y2} subtitle={t.hero.phase2.subtitle} align="left">
          {t.hero.phase2.line1}<br />{t.hero.phase2.line2}
        </OverlayText>

        <OverlayText opacity={op3} y={y3} subtitle={t.hero.phase3.subtitle} align="right">
          {t.hero.phase3.line1}<br />{t.hero.phase3.line2}
        </OverlayText>

        <OverlayText opacity={op4} y={y4} subtitle={t.hero.phase4.subtitle} align="center">
          {t.hero.phase4.line1}<br />
          <span style={{ color: "#C9A961" }}>{t.hero.phase4.line2}</span>
        </OverlayText>

        {/* Bottom prompt — fades out once scrolling begins */}
        <motion.div
          className="absolute bottom-10 left-0 right-0 z-20 flex flex-col items-center gap-3 pointer-events-none"
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.05], [1, 0]),
          }}
        >
          <div className="gold-divider w-16" />
          <p className="smallcaps text-gold text-[10px] font-inter tracking-smallcaps opacity-60">
            {t.hero.scrollPrompt}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
