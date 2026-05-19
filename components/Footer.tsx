"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLang } from "@/lib/lang";

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L2.012 2.25H8.08l4.262 5.633 5.902-5.633Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
    </svg>
  );
}

export default function Footer() {
  const { t } = useLang();
  const f = t.footer;

  return (
    <footer id="heritage" className="relative bg-pure-black pt-20 pb-10 px-6 md:px-12 lg:px-20 overflow-hidden">
      {/* Gold divider top */}
      <div className="gold-divider mb-16" />

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-start">
        {/* Logo + tagline */}
        <div className="flex flex-col gap-5">
          <div style={{ filter: "invert(1)", width: 110 }}>
            <Image
              src="/logo.svg"
              alt="Golestan Tea"
              width={110}
              height={36}
              className="object-contain"
            />
          </div>
          <p className="font-cormorant font-light text-off-white/50 text-base leading-relaxed max-w-[200px]">
            {f.tagline}
          </p>
        </div>

        {/* Nav links */}
        <div className="flex flex-col gap-4">
          <p className="smallcaps text-gold text-[9px] font-inter tracking-smallcaps mb-2 opacity-50">
            {f.navigateLabel}
          </p>
          {f.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="smallcaps text-off-white/40 text-[10px] font-inter tracking-smallcaps hover:text-gold transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Social + tagline */}
        <div id="story" className="flex flex-col gap-6">
          <div>
            <p className="smallcaps text-gold text-[9px] font-inter tracking-smallcaps mb-4 opacity-50">
              {f.followUs}
            </p>
            <div className="flex items-center gap-5">
              <motion.a
                href="https://instagram.com"
                aria-label="Instagram"
                className="text-off-white/40 hover:text-gold transition-colors duration-300"
                whileHover={{ scale: 1.15 }}
                transition={{ duration: 0.3 }}
                data-cursor
              >
                <InstagramIcon />
              </motion.a>
              <motion.a
                href="https://x.com"
                aria-label="X (Twitter)"
                className="text-off-white/40 hover:text-gold transition-colors duration-300"
                whileHover={{ scale: 1.15 }}
                transition={{ duration: 0.3 }}
                data-cursor
              >
                <XIcon />
              </motion.a>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <p className="font-cormorant font-light text-off-white/30 text-sm italic">
              &ldquo;{f.quote}&rdquo;
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="gold-divider mt-16 mb-8" />
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-inter font-light text-[10px] text-off-white/25 smallcaps tracking-smallcaps">
          © {new Date().getFullYear()} Golestan Tea. {f.allRightsReserved}
        </p>
        <p className="font-inter font-light text-[10px] text-off-white/20 smallcaps tracking-smallcaps">
          {f.crafted}
        </p>
      </div>

      {/* Ambient glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: "600px",
          height: "200px",
          background: "radial-gradient(ellipse at center, rgba(139,0,0,0.08) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
    </footer>
  );
}
