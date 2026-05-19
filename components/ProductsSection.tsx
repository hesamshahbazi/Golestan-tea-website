"use client";

import { useRef } from "react";
import { useInView, motion } from "framer-motion";
import ProductCard from "./ProductCard";
import { products } from "@/lib/products";
import { useLang } from "@/lib/lang";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: "easeOut" as const },
  },
};

export default function ProductsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-15%" });
  const { t } = useLang();

  return (
    <section
      ref={sectionRef}
      id="collection"
      className="relative bg-pure-black py-28 md:py-40 px-6 md:px-12 lg:px-20"
    >
      {/* Section header */}
      <div className="text-center mb-20 md:mb-28">
        <motion.p
          className="smallcaps text-gold text-[10px] font-inter tracking-smallcaps mb-5 opacity-60"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 0.6, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {t.productsSection.eyebrow}
        </motion.p>

        <motion.h2
          className="font-cormorant font-light text-off-white"
          style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          {t.productsSection.heading}
        </motion.h2>

        <motion.div
          className="gold-divider mt-6 mx-auto"
          style={{ width: 80 }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
        />
      </div>

      {/* Product grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {products.map((product) => (
          <motion.div key={product.slug} variants={cardVariants}>
            <ProductCard product={product} />
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom ornament */}
      <div className="flex items-center justify-center gap-6 mt-24 md:mt-32">
        <div className="gold-divider flex-1 max-w-32" />
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M9 1 L9 17 M1 9 L17 9" stroke="#C9A961" strokeWidth="0.75" opacity="0.4" />
          <circle cx="9" cy="9" r="3" stroke="#C9A961" strokeWidth="0.75" opacity="0.4" />
        </svg>
        <div className="gold-divider flex-1 max-w-32" />
      </div>
    </section>
  );
}
