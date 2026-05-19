"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLang } from "@/lib/lang";

type Chapter = {
  number: string;
  label: string;
  headline: string;
  body: readonly string[];
  pull: string;
};

function Chapter({ chapter, index }: { chapter: Chapter; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`relative grid grid-cols-1 md:grid-cols-2 gap-0 min-h-[70vh] ${
        isEven ? "" : "md:[direction:rtl]"
      }`}
    >
      {/* Number column */}
      <div
        className="relative flex items-center justify-center py-20 px-10 overflow-hidden md:[direction:ltr]"
        style={{
          background: `linear-gradient(135deg, rgba(139,0,0,0.06) 0%, rgba(0,0,0,0) 60%)`,
        }}
      >
        {/* Giant number watermark */}
        <motion.div
          className="absolute select-none pointer-events-none"
          style={{
            fontSize: "clamp(180px, 22vw, 320px)",
            fontFamily: "var(--font-cormorant)",
            fontWeight: 300,
            color: "#C9A961",
            opacity: 0.06,
            lineHeight: 1,
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.06 } : {}}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          {chapter.number}
        </motion.div>

        {/* Pull quote */}
        <motion.blockquote
          className="relative z-10 font-cormorant font-light text-off-white/70 italic text-center max-w-xs"
          style={{ fontSize: "clamp(1.1rem, 2vw, 1.5rem)", lineHeight: 1.6 }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
        >
          &ldquo;{chapter.pull}&rdquo;
        </motion.blockquote>
      </div>

      {/* Content column */}
      <div className="flex flex-col justify-center py-20 px-10 md:px-16 md:[direction:ltr]">
        <motion.p
          className="smallcaps text-gold text-[10px] font-inter tracking-smallcaps mb-4 opacity-60"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 0.6, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {chapter.label}
        </motion.p>

        <motion.h3
          className="font-cormorant font-light text-off-white mb-8"
          style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", lineHeight: 1.15 }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
        >
          {chapter.headline}
        </motion.h3>

        <motion.div
          className="flex flex-col gap-5"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
        >
          {chapter.body.map((para, i) => (
            <p
              key={i}
              className="font-inter font-light text-off-white/55 leading-relaxed"
              style={{ fontSize: "clamp(0.85rem, 1.2vw, 1rem)" }}
            >
              {para}
            </p>
          ))}
        </motion.div>
      </div>

      {/* Gold divider between chapters */}
      <div className="absolute bottom-0 left-10 right-10 gold-divider opacity-20" />
    </div>
  );
}

export default function HeritageSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-10%" });
  const { t } = useLang();
  const h = t.heritage;

  return (
    <section id="heritage" className="relative bg-pure-black overflow-hidden">
      {/* Section header */}
      <div
        ref={headerRef}
        className="relative py-28 md:py-36 px-8 md:px-16 text-center overflow-hidden"
      >
        <motion.p
          className="smallcaps text-gold text-[10px] font-inter tracking-smallcaps mb-6 opacity-60"
          initial={{ opacity: 0 }}
          animate={headerInView ? { opacity: 0.6 } : {}}
          transition={{ duration: 1 }}
        >
          {h.eyebrow}
        </motion.p>

        <motion.h2
          className="font-cormorant font-light text-off-white mx-auto"
          style={{ fontSize: "clamp(2.8rem, 7vw, 6.5rem)", lineHeight: 1.05 }}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          {h.headingLine1}<br />
          <span style={{ color: "#C9A961" }}>{h.headingLine2}</span>
        </motion.h2>

        <motion.div
          className="gold-divider mt-8 mx-auto"
          style={{ width: 80 }}
          initial={{ scaleX: 0 }}
          animate={headerInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
        />

        <motion.p
          className="font-inter font-light text-off-white/40 mt-8 max-w-xl mx-auto leading-relaxed"
          style={{ fontSize: "clamp(0.85rem, 1.2vw, 1rem)" }}
          initial={{ opacity: 0, y: 16 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
        >
          {h.subheading}
        </motion.p>

        {/* Background text decoration */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          aria-hidden
        >
          <span
            className="font-cormorant font-light text-gold opacity-[0.03]"
            style={{ fontSize: "clamp(8rem, 20vw, 18rem)", letterSpacing: "-0.02em" }}
          >
            {h.backgroundText}
          </span>
        </div>
      </div>

      {/* Gold top divider */}
      <div className="gold-divider mx-8 md:mx-16 opacity-20" />

      {/* Chapters */}
      {h.chapters.map((chapter, i) => (
        <Chapter key={chapter.number} chapter={chapter} index={i} />
      ))}

      {/* Closing ornament */}
      <div className="flex items-center justify-center gap-6 py-20">
        <div className="gold-divider flex-1 max-w-24 opacity-30" />
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="9" stroke="#C9A961" strokeWidth="0.5" opacity="0.5" />
          <circle cx="10" cy="10" r="3" fill="#C9A961" opacity="0.4" />
        </svg>
        <div className="gold-divider flex-1 max-w-24 opacity-30" />
      </div>
    </section>
  );
}
