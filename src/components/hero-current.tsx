"use client";

import { motion } from "motion/react";

export function HeroCurrent() {
  return (
    <div className="hero-parallax absolute inset-0 overflow-hidden" aria-hidden>
      <motion.div
        className="absolute -top-1/4 -left-1/4 w-[70vw] h-[70vw] rounded-full"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--ember) 18%, transparent) 0%, transparent 70%)",
        }}
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-1/3 -right-1/4 w-[60vw] h-[60vw] rounded-full"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--slate) 22%, transparent) 0%, transparent 70%)",
        }}
        animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />

      <svg
        className="absolute inset-0 w-full h-full opacity-40"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="current-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--slate-bright)" stopOpacity="0" />
            <stop offset="45%" stopColor="var(--slate-bright)" stopOpacity="0.6" />
            <stop offset="55%" stopColor="var(--ember-bright)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="var(--ember-bright)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d="M -100 420 C 250 340, 420 560, 700 460 S 1100 300, 1350 420"
          fill="none"
          stroke="url(#current-grad)"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        />
        <motion.path
          d="M -100 500 C 300 460, 500 620, 780 540 S 1150 420, 1350 520"
          fill="none"
          stroke="url(#current-grad)"
          strokeWidth="1"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 2.8, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
        />
      </svg>
    </div>
  );
}
