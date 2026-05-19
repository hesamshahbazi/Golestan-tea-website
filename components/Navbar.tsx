"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLang, type Lang } from "@/lib/lang";

function smoothScrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Navbar() {
  const { lang, setLang, t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLink = (target: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    smoothScrollTo(target);
    setMenuOpen(false);
  };

  const navLinks = [
    { label: t.navbar.collection, target: "collection" },
    { label: t.navbar.heritage,   target: "heritage"   },
    { label: t.navbar.story,      target: "story"       },
  ];

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-[100] px-8 md:px-12 py-5 flex items-center justify-between"
      animate={{
        backdropFilter: scrolled ? "blur(20px)" : "blur(0px)",
        backgroundColor: scrolled ? "rgba(0,0,0,0.25)" : "rgba(0,0,0,0)",
      }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Logo — text wordmark */}
      <a
        href="#"
        onClick={handleLink("hero")}
        className="relative z-10 flex flex-col items-center gap-[3px] group"
        aria-label="Golestan Tea — home"
        data-cursor
      >
        <div className="w-full gold-divider opacity-40 group-hover:opacity-70 transition-opacity duration-300" />
        <span
          className="font-cormorant font-light text-off-white tracking-[0.35em] uppercase leading-none select-none"
          style={{ fontSize: "clamp(0.85rem, 1.2vw, 1.05rem)" }}
        >
          Golestan
        </span>
        <div className="w-full gold-divider opacity-40 group-hover:opacity-70 transition-opacity duration-300" />
        <span
          className="smallcaps font-inter font-light text-gold opacity-40 group-hover:opacity-60 transition-opacity duration-300 select-none"
          style={{ fontSize: "0.52rem", letterSpacing: "0.25em" }}
        >
          {t.navbar.tagline}
        </span>
      </a>

      {/* Desktop nav links + language toggle */}
      <div className="hidden md:flex items-center gap-10">
        {navLinks.map(({ label, target }) => (
          <a
            key={target}
            href={`#${target}`}
            onClick={handleLink(target)}
            className="text-off-white/60 font-inter font-light text-xs smallcaps tracking-smallcaps hover:text-gold transition-colors duration-300"
          >
            {label}
          </a>
        ))}

        {/* Language toggle */}
        <div className="flex items-center gap-2 pl-6 border-l border-gold/20">
          {(["EN", "DE"] as Lang[]).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`smallcaps font-inter text-[10px] tracking-smallcaps transition-colors duration-300 ${
                lang === l
                  ? "text-gold"
                  : "text-off-white/30 hover:text-off-white/60"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile menu toggle */}
      <button
        className="md:hidden flex flex-col gap-1.5 z-10"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span
          className="block w-6 h-px bg-off-white/70 transition-all duration-300"
          style={{ transform: menuOpen ? "rotate(45deg) translate(3px, 3px)" : "none" }}
        />
        <span
          className="block w-4 h-px bg-off-white/70 transition-all duration-300"
          style={{ opacity: menuOpen ? 0 : 1 }}
        />
        <span
          className="block w-6 h-px bg-off-white/70 transition-all duration-300"
          style={{ transform: menuOpen ? "rotate(-45deg) translate(3px, -3px)" : "none" }}
        />
      </button>

      {/* Mobile menu */}
      <motion.div
        className={`absolute top-full left-0 right-0 flex flex-col items-center gap-8 py-10 md:hidden ${
          menuOpen ? "" : "pointer-events-none"
        }`}
        style={{ background: "rgba(0,0,0,0.95)", backdropFilter: "blur(20px)" }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: menuOpen ? 1 : 0, y: menuOpen ? 0 : -10 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        aria-hidden={!menuOpen}
      >
        {navLinks.map(({ label, target }) => (
          <a
            key={target}
            href={`#${target}`}
            onClick={handleLink(target)}
            className="text-off-white/70 font-inter font-light text-sm smallcaps tracking-smallcaps hover:text-gold transition-colors duration-300"
          >
            {label}
          </a>
        ))}

        {/* Mobile language toggle */}
        <div className="flex items-center gap-4 pt-2 border-t border-gold/20 w-16 justify-center">
          {(["EN", "DE"] as Lang[]).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`smallcaps font-inter text-xs tracking-smallcaps transition-colors duration-300 ${
                lang === l
                  ? "text-gold"
                  : "text-off-white/30 hover:text-off-white/60"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </motion.div>
    </motion.nav>
  );
}
