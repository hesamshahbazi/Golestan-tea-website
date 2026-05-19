"use client";

import { useEffect, useRef } from "react";

export default function FilmGrain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    let frameCount = 0;

    const draw = () => {
      frameCount++;
      // Refresh grain every 2 frames to save CPU while still animating
      if (frameCount % 2 === 0) {
        const imageData = ctx.createImageData(canvas.width, canvas.height);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
          const v = (Math.random() * 255) | 0;
          data[i] = v;
          data[i + 1] = v;
          data[i + 2] = v;
          data[i + 3] = 255;
        }
        ctx.putImageData(imageData, 0, 0);
      }
      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 998,
        opacity: 0.015,
        mixBlendMode: "overlay",
      }}
    />
  );
}
