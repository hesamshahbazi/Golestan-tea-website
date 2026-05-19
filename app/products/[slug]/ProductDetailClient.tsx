"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { Product } from "@/lib/products";
import FilmGrain from "@/components/FilmGrain";
import CustomCursor from "@/components/CustomCursor";

// ── Gallery ──────────────────────────────────────────────────────────────────

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({
    x: dir < 0 ? "100%" : "-100%",
    opacity: 0,
  }),
};

function Gallery({ product }: { product: Product }) {
  const [[slide, dir], setSlide] = useState([0, 0]);
  const totalSlides = 3;

  const paginate = (newDir: number) => {
    const next = (slide + newDir + totalSlides) % totalSlides;
    setSlide([next, newDir]);
  };

  const slideConfigs = [
    { label: "Full View",     scale: "scale(1)",        bg: `${product.gradientFrom}` },
    { label: "Close-Up",      scale: "scale(1.2)",       bg: `${product.gradientTo}` },
    { label: "Composition",   scale: "scale(0.85) rotate(6deg)", bg: `${product.gradientFrom}` },
  ];

  const current = slideConfigs[slide];

  return (
    <div className="relative h-full w-full overflow-hidden bg-pure-black select-none">
      {/* Background gradient */}
      <div
        className="absolute inset-0 transition-all duration-700"
        style={{
          background: `radial-gradient(ellipse 80% 80% at 50% 60%, ${current.bg}50 0%, ${product.gradientTo}20 50%, transparent 100%)`,
        }}
      />

      {/* Slide */}
      <AnimatePresence custom={dir} initial={false}>
        <motion.div
          key={slide}
          custom={dir}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 flex items-center justify-center"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={(_, info) => {
            if (Math.abs(info.offset.x) > 60) paginate(info.offset.x < 0 ? 1 : -1);
          }}
        >
          <div
            className="relative w-2/3 h-3/4 transition-transform duration-700"
            style={{ transform: current.scale }}
          >
            <Image
              src={`/products/${product.slug}.svg`}
              alt={product.name}
              fill
              unoptimized
              className="object-contain"
              priority
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Corner brackets */}
      <div className="absolute inset-4 pointer-events-none z-10">
        <svg className="absolute top-0 left-0" width="40" height="40" viewBox="0 0 40 40" fill="none">
          <path d="M2 38 L2 2 L38 2" stroke="#C9A961" strokeWidth="0.75" opacity="0.5" />
        </svg>
        <svg className="absolute top-0 right-0" width="40" height="40" viewBox="0 0 40 40" fill="none">
          <path d="M38 38 L38 2 L2 2" stroke="#C9A961" strokeWidth="0.75" opacity="0.5" />
        </svg>
        <svg className="absolute bottom-0 left-0" width="40" height="40" viewBox="0 0 40 40" fill="none">
          <path d="M2 2 L2 38 L38 38" stroke="#C9A961" strokeWidth="0.75" opacity="0.5" />
        </svg>
        <svg className="absolute bottom-0 right-0" width="40" height="40" viewBox="0 0 40 40" fill="none">
          <path d="M38 2 L38 38 L2 38" stroke="#C9A961" strokeWidth="0.75" opacity="0.5" />
        </svg>
      </div>

      {/* Slide label */}
      <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-3 z-10">
        <p className="smallcaps text-gold text-[9px] font-inter tracking-smallcaps opacity-40">
          {current.label}
        </p>

        {/* Dots */}
        <div className="flex items-center gap-2">
          {slideConfigs.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide([i, i > slide ? 1 : -1])}
              className="transition-all duration-300"
              data-cursor
            >
              <div
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === slide ? 20 : 6,
                  height: 6,
                  background: i === slide ? "#C9A961" : "rgba(201,169,97,0.3)",
                }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Swipe arrows */}
      <button
        onClick={() => paginate(-1)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 text-gold/40 hover:text-gold transition-colors duration-300"
        data-cursor
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M13 4 L7 10 L13 16" stroke="currentColor" strokeWidth="0.75" />
        </svg>
      </button>
      <button
        onClick={() => paginate(1)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 text-gold/40 hover:text-gold transition-colors duration-300"
        data-cursor
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M7 4 L13 10 L7 16" stroke="currentColor" strokeWidth="0.75" />
        </svg>
      </button>
    </div>
  );
}

// ── Detail Panel ──────────────────────────────────────────────────────────────

function DetailPanel({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState(0);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  return (
    <div className="flex flex-col gap-8 py-16 px-8 md:px-14 min-h-full">
      {/* Breadcrumb */}
      <p className="font-inter font-light text-[10px] text-off-white/30 smallcaps tracking-smallcaps">
        <Link href="/#collection" className="hover:text-gold transition-colors">
          Collection
        </Link>
        {" · "}
        <span className="text-gold/50">{product.name}</span>
      </p>

      {/* Origin + subtitle */}
      <div>
        <p className="smallcaps text-gold text-[10px] font-inter tracking-smallcaps mb-2 opacity-60">
          {product.subtitle} · {product.origin}
        </p>
        <h1
          className="font-cormorant font-light text-off-white"
          style={{ fontSize: "clamp(2.4rem, 4vw, 4rem)", lineHeight: 1.05 }}
        >
          {product.name}
        </h1>
      </div>

      {/* Gold divider */}
      <div className="gold-divider w-16" />

      {/* Ingredients */}
      <div className="flex items-center gap-3 flex-wrap">
        {product.ingredients.map((ing) => (
          <span
            key={ing}
            className="px-3 py-1 font-inter font-light text-[10px] smallcaps tracking-smallcaps text-gold/70"
            style={{
              border: "1px solid rgba(201,169,97,0.25)",
              background: "rgba(201,169,97,0.04)",
            }}
          >
            {ing}
          </span>
        ))}
      </div>

      {/* Long description */}
      <div className="flex flex-col gap-4">
        {product.longDescription.map((para, i) => (
          <p
            key={i}
            className="font-inter font-light text-off-white/55 leading-relaxed"
            style={{ fontSize: "0.9rem" }}
          >
            {para}
          </p>
        ))}
      </div>

      {/* Brewing notes */}
      <div
        className="p-5"
        style={{
          border: "1px solid rgba(201,169,97,0.15)",
          background: "rgba(201,169,97,0.03)",
        }}
      >
        <p className="smallcaps text-gold text-[9px] font-inter tracking-smallcaps mb-2 opacity-50">
          Brewing
        </p>
        <p className="font-inter font-light text-off-white/60 text-sm">
          {product.brewingNotes}
        </p>
        <p className="font-inter font-light text-off-white/35 text-xs mt-1">
          {product.servings}
        </p>
      </div>

      {/* Size selector */}
      <div>
        <p className="smallcaps text-gold text-[9px] font-inter tracking-smallcaps mb-3 opacity-50">
          Select Size
        </p>
        <div className="flex gap-3">
          {product.sizes.map((size, i) => (
            <motion.button
              key={size.label}
              onClick={() => setSelectedSize(i)}
              className="flex flex-col items-center gap-1 px-5 py-3 transition-all duration-300"
              style={{
                border: `1px solid ${i === selectedSize ? product.accentColor : "rgba(201,169,97,0.2)"}`,
                background: i === selectedSize ? `${product.accentColor}18` : "transparent",
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              data-cursor
            >
              <span className="font-inter font-light text-off-white text-sm">{size.label}</span>
              <span className="font-inter font-light text-gold/70 text-xs">{size.price}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-3 mt-2">
        <motion.button
          onClick={handleAdd}
          className="flex-1 py-4 font-inter font-light text-xs smallcaps tracking-smallcaps transition-all duration-500 relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${product.gradientFrom}, ${product.gradientTo})`,
            border: `1px solid ${product.accentColor}50`,
            color: "#F5F1E8",
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          data-cursor
        >
          <AnimatePresence mode="wait">
            {added ? (
              <motion.span
                key="added"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                Added to Cart ✓
              </motion.span>
            ) : (
              <motion.span
                key="add"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                Add to Cart — {product.sizes[selectedSize].price}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        <motion.button
          className="flex-1 py-4 font-inter font-light text-xs smallcaps tracking-smallcaps text-off-white/70 hover:text-gold transition-colors duration-300"
          style={{ border: "1px solid rgba(201,169,97,0.2)" }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          data-cursor
        >
          Buy Now
        </motion.button>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ProductDetailClient({ product }: { product: Product }) {
  return (
    <>
      <CustomCursor />
      <FilmGrain />

      {/* Minimal product navbar */}
      <nav className="fixed top-0 left-0 right-0 z-[100] px-8 py-4 flex items-center justify-between"
        style={{ backdropFilter: "blur(20px)", background: "rgba(0,0,0,0.6)" }}
      >
        <Link
          href="/"
          className="flex items-center gap-3 text-gold/50 hover:text-gold transition-colors duration-300 group"
          data-cursor
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M12 3 L6 9 L12 15" stroke="currentColor" strokeWidth="0.75" />
          </svg>
          <span className="smallcaps text-[9px] font-inter tracking-smallcaps">Collection</span>
        </Link>

        <span className="font-cormorant font-light text-off-white text-base tracking-[0.3em] uppercase">
          Golestan
        </span>

        <div className="flex items-center gap-2 opacity-0 pointer-events-none">
          <span className="w-16" />
        </div>
      </nav>

      {/* Split layout */}
      <div className="flex flex-col md:flex-row min-h-screen pt-12">
        {/* Left — sticky gallery */}
        <div className="md:w-1/2 md:sticky md:top-0 h-[60vh] md:h-screen">
          <Gallery product={product} />
        </div>

        {/* Right — scrollable details */}
        <div className="md:w-1/2 bg-pure-black md:overflow-y-auto">
          <DetailPanel product={product} />
        </div>
      </div>
    </>
  );
}
