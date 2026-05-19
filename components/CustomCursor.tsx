"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(true);

  useEffect(() => {
    setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  useEffect(() => {
    if (isTouch) return;

    const onMove = (e: MouseEvent) => {
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + "px";
        dotRef.current.style.top  = e.clientY + "px";
      }
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    return () => document.removeEventListener("mousemove", onMove);
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <div
      ref={dotRef}
      className="fixed z-[9999] pointer-events-none will-change-transform"
      style={{
        width: 6,
        height: 6,
        borderRadius: "50%",
        background: "#ffffff",
        transform: "translate(-50%, -50%)",
        top: "-100px",
        left: "-100px",
      }}
    />
  );
}
