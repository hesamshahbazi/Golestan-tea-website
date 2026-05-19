"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLang } from "@/lib/lang";

type Pillar = {
  number: string;
  label: string;
  headline: string;
  body: string;
};

function Pillar({ pillar, index }: { pillar: Pillar; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      className="relative flex flex-col gap-6 py-14 px-0 border-t border-gold/10"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: "easeOut", delay: index * 0.05 }}
    >
      <div className="flex items-start gap-8">
        <span
          className="font-cormorant font-light text-gold opacity-30 shrink-0 mt-1"
          style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", lineHeight: 1 }}
        >
          {pillar.number}
        </span>

        <div className="flex flex-col gap-4">
          <p className="smallcaps text-gold text-[9px] font-inter tracking-smallcaps opacity-60">
            {pillar.label}
          </p>
          <h3
            className="font-cormorant font-light text-off-white"
            style={{ fontSize: "clamp(1.4rem, 2.5vw, 2.2rem)", lineHeight: 1.2 }}
          >
            {pillar.headline}
          </h3>
          <p
            className="font-inter font-light text-off-white/50 leading-relaxed max-w-2xl"
            style={{ fontSize: "clamp(0.85rem, 1.1vw, 0.95rem)" }}
          >
            {pillar.body}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function StorySection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-10%" });
  const quoteRef = useRef<HTMLDivElement>(null);
  const quoteInView = useInView(quoteRef, { once: true, margin: "-10%" });
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-10%" });
  const { t } = useLang();
  const s = t.story;

  return (
    <section id="story-content" className="relative bg-pure-black">
      {/* Header */}
      <div
        ref={headerRef}
        className="relative py-28 md:py-36 px-8 md:px-20 lg:px-32 overflow-hidden"
      >
        <motion.p
          className="smallcaps text-gold text-[10px] font-inter tracking-smallcaps mb-6 opacity-60"
          initial={{ opacity: 0 }}
          animate={headerInView ? { opacity: 0.6 } : {}}
          transition={{ duration: 1 }}
        >
          {s.eyebrow}
        </motion.p>

        <motion.h2
          className="font-cormorant font-light text-off-white"
          style={{ fontSize: "clamp(2.8rem, 7vw, 6.5rem)", lineHeight: 1.05, maxWidth: "14ch" }}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          {s.headingLine1}<br />of{" "}
          <span style={{ color: "#C9A961" }}>{s.headingLine2Gold}</span>
        </motion.h2>

        {/* Background decoration */}
        <div
          className="absolute top-0 right-0 pointer-events-none select-none"
          aria-hidden
          style={{
            width: "55vw",
            height: "100%",
            background:
              "radial-gradient(ellipse at 80% 50%, rgba(139,0,0,0.07) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 right-8 md:right-20 font-cormorant font-light text-gold pointer-events-none select-none"
          style={{ fontSize: "clamp(6rem, 14vw, 12rem)", opacity: 0.04, lineHeight: 1 }}
          aria-hidden
        >
          {s.backgroundText}
        </div>
      </div>

      {/* Full-width pull quote */}
      <div
        ref={quoteRef}
        className="relative py-20 md:py-28 px-8 md:px-20 lg:px-32 overflow-hidden"
        style={{
          background: "linear-gradient(180deg, rgba(139,0,0,0.04) 0%, rgba(0,0,0,0) 100%)",
          borderTop: "1px solid rgba(201,169,97,0.1)",
          borderBottom: "1px solid rgba(201,169,97,0.1)",
        }}
      >
        <motion.blockquote
          className="font-cormorant font-light text-off-white/80 italic max-w-4xl"
          style={{ fontSize: "clamp(1.6rem, 3.5vw, 3rem)", lineHeight: 1.3 }}
          initial={{ opacity: 0, y: 30 }}
          animate={quoteInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          &ldquo;{s.pullQuote}&rdquo;
        </motion.blockquote>
        <motion.p
          className="smallcaps text-gold text-[9px] font-inter tracking-smallcaps mt-6 opacity-50"
          initial={{ opacity: 0 }}
          animate={quoteInView ? { opacity: 0.5 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
        >
          {s.pullAttribution}
        </motion.p>
      </div>

      {/* Pillars */}
      <div className="px-8 md:px-20 lg:px-32 pb-20">
        {s.pillars.map((pillar, i) => (
          <Pillar key={pillar.number} pillar={pillar} index={i} />
        ))}
      </div>

      {/* Stats row */}
      <div ref={statsRef} className="px-8 md:px-20 lg:px-32 py-20 border-t border-gold/10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6">
          {s.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="flex flex-col gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut", delay: i * 0.1 }}
            >
              <span
                className="font-cormorant font-light text-gold"
                style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1 }}
              >
                {stat.value}
              </span>
              <span className="smallcaps text-off-white/40 text-[9px] font-inter tracking-smallcaps">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
