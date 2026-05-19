"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { Product } from "@/lib/products";
import { useLang } from "@/lib/lang";

export default function ProductCard({ product }: { product: Product }) {
  const [imgError, setImgError] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { t } = useLang();

  const pt = t.products[product.slug as keyof typeof t.products] ?? {
    subtitle: product.subtitle,
    name: product.name,
    origin: product.origin,
    ingredients: product.ingredients,
    description: product.description,
  };

  return (
    <Link href={`/products/${product.slug}`} passHref legacyBehavior>
      <motion.a
        className="relative flex flex-col bg-pure-black overflow-hidden"
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          border: `1px solid ${hovered ? product.accentColor : "rgba(201,169,97,0.15)"}`,
          boxShadow: hovered
            ? `0 0 40px -10px ${product.accentColor}60, inset 0 0 60px rgba(0,0,0,0.5)`
            : "none",
          transition: "border-color 0.6s ease, box-shadow 0.6s ease",
          display: "flex",
          flexDirection: "column",
        }}
        data-cursor
      >
        {/* Image area */}
        <div className="relative overflow-hidden" style={{ height: "360px" }}>
          {/* Gradient background */}
          <div
            className="absolute inset-0 transition-opacity duration-700"
            style={{
              background: `radial-gradient(ellipse at 50% 70%, ${product.gradientFrom}30 0%, ${product.gradientTo}10 60%, transparent 100%)`,
              opacity: hovered ? 1 : 0.5,
            }}
          />

          {/* Product image */}
          {!imgError ? (
            <Image
              src={`/products/${product.slug}.svg`}
              alt={pt.name}
              fill
              unoptimized
              className="object-contain p-8 transition-transform duration-700"
              onError={() => setImgError(true)}
              sizes="(max-width: 768px) 100vw, 33vw"
              style={{ transform: hovered ? "scale(1.06) translateY(-8px)" : "scale(1)" }}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center p-10">
              <svg viewBox="0 0 200 280" fill="none" className="w-full h-full max-w-[160px]">
                <defs>
                  <linearGradient id={`tin-${product.slug}`} x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor={product.gradientFrom} stopOpacity="0.6" />
                    <stop offset="50%" stopColor={product.gradientFrom} stopOpacity="0.9" />
                    <stop offset="100%" stopColor={product.gradientFrom} stopOpacity="0.6" />
                  </linearGradient>
                </defs>
                <rect x="20" y="50" width="160" height="210" rx="6" fill={`url(#tin-${product.slug})`} />
                <rect x="12" y="32" width="176" height="28" rx="5" fill={product.gradientFrom} />
                <rect x="20" y="38" width="160" height="16" rx="3" fill={product.gradientTo} />
                <rect x="12" y="58" width="176" height="2" fill="#C9A961" opacity="0.8" />
                <rect x="12" y="255" width="176" height="2" fill="#C9A961" opacity="0.8" />
                <circle cx="100" cy="155" r="35" stroke="#C9A961" strokeWidth="0.5" opacity="0.5" />
                <circle cx="100" cy="155" r="25" stroke="#C9A961" strokeWidth="0.5" opacity="0.3" />
              </svg>
            </div>
          )}

          {/* Floating ingredient chip on hover */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                className="absolute top-5 left-5 z-10"
                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <div
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm"
                  style={{
                    background: "rgba(0,0,0,0.55)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(201,169,97,0.35)",
                  }}
                >
                  {pt.ingredients.map((ing, i) => (
                    <span key={ing} className="flex items-center gap-1.5">
                      <span className="text-gold font-inter text-[10px] smallcaps tracking-smallcaps">{ing}</span>
                      {i < pt.ingredients.length - 1 && (
                        <span className="text-gold opacity-30 text-[8px]">·</span>
                      )}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Origin tag */}
          <div className="absolute bottom-4 right-4">
            <span className="text-gold font-inter text-[9px] smallcaps tracking-smallcaps opacity-50">
              {pt.origin}
            </span>
          </div>
        </div>

        {/* Card info */}
        <div className="px-6 py-6 flex flex-col gap-3 border-t border-gold/10">
          <div>
            <p className="smallcaps text-gold text-[9px] font-inter tracking-smallcaps mb-2 opacity-70">
              {pt.subtitle}
            </p>
            <h3
              className="font-cormorant font-light text-off-white leading-tight"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
            >
              {pt.name}
            </h3>
          </div>
          <p className="font-inter font-light text-xs leading-relaxed text-off-white/50">
            {pt.description}
          </p>
          <div className="mt-2 flex items-center gap-3 group">
            <span className="smallcaps text-gold text-[10px] font-inter tracking-smallcaps">
              {t.productCard.explore}
            </span>
            <span
              className="block h-px bg-gold transition-all duration-500 group-hover:w-8"
              style={{ width: 24 }}
            />
          </div>
        </div>
      </motion.a>
    </Link>
  );
}
