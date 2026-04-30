"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

interface Page {
  src: string;
  alt: string;
}

interface Props {
  pages: Page[];
  pageIndex: number;
  totalPages: number;
  direction: number;
  flipping: boolean;
  onAnimationDone: () => void;
  onOpenFinal: () => void;
}

export default function BookPageFlip({
  pages,
  pageIndex,
  totalPages,
  flipping,
  onAnimationDone,
  onOpenFinal,
}: Props) {
  const [localIndex, setLocalIndex] = useState(pageIndex);
  const [dir, setDir] = useState(1);
  const [isAnim, setIsAnim] = useState(false);

  function goTo(next: number, d: number) {
    if (isAnim) return;
    setDir(d);
    setIsAnim(true);
    setTimeout(() => {
      setLocalIndex(next);
      setIsAnim(false);
      onAnimationDone();
    }, 600);
  }

  const cur = pages[localIndex];

  return (
    <div className="w-full select-none px-2">
      {/* ── Book ─────────────────────────────────────────────────────── */}
      <div
        className="relative mx-auto"
        style={{
          maxWidth: 560,
          /* 10° tilt like the canvas sample */
          transform: "rotate(-5deg)",
          transformOrigin: "center bottom",
        }}
      >
        {/* Drop shadow */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-3 rounded-[50%]"
          style={{
            width: "80%",
            height: 20,
            background:
              "radial-gradient(ellipse,rgba(180,80,120,0.22) 0%,transparent 80%)",
            filter: "blur(6px)",
          }}
        />

        {/* Book body */}
        <div
          className="relative flex overflow-hidden rounded-[6px_16px_16px_6px] shadow-[0_20px_60px_rgba(150,80,110,0.18)]"
          style={{ minHeight: 280 }}
        >
          {/* ── LEFT COVER (pink, decorative) ───────────────────────── */}
          <div
            className="relative shrink-0"
            style={{
              width: "38%",
              background: "linear-gradient(160deg,#f9c8dc,#f0a0c4)",
              borderRight: "none",
            }}
          >
            {/* Polka dots */}
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white/20"
                style={{
                  width: 7,
                  height: 7,
                  left: `${15 + (i % 4) * 22}%`,
                  top: `${12 + Math.floor(i / 4) * 18}%`,
                }}
              />
            ))}
            {/* Title banner */}
            <div className="absolute inset-x-2 top-4 rounded-md bg-white/25 py-2 text-center">
              <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-white/90">
                Birthday
              </span>
            </div>
            {/* Heart */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-2xl opacity-50">
              🌸
            </div>
          </div>

          {/* ── SPINE ───────────────────────────────────────────────── */}
          <div
            className="shrink-0"
            style={{
              width: 10,
              background:
                "linear-gradient(to right,#b85578,#c4607e,#b85578)",
              boxShadow: "inset -3px 0 6px rgba(0,0,0,0.12)",
            }}
          />

          {/* ── RIGHT PAGE — animated GIF area ──────────────────────── */}
          <div className="relative flex flex-1 flex-col overflow-hidden bg-[#fffdf8]">
            {/* Stacked pages edge (left side of right page) */}
            <div
              className="absolute inset-y-0 left-0 w-2 bg-[linear-gradient(to_right,#fde8f0,#fffdf8)]"
              style={{ boxShadow: "inset 2px 0 5px rgba(180,80,110,0.08)" }}
            />

            {/* Page number badge */}
            <div className="absolute right-3 top-3 z-10 rounded-full border border-[#f0c0d0] bg-white/80 px-3 py-0.5 text-[9px] uppercase tracking-[0.22em] text-[#c4607e]">
              {localIndex + 1} / {totalPages}
            </div>

            {/* GIF display — uses <img> so GIFs actually animate */}
            <div className="relative flex-1 overflow-hidden" style={{ minHeight: 260 }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={localIndex}
                  initial={{
                    rotateY: dir > 0 ? 90 : -90,
                    opacity: 0,
                    scale: 0.96,
                  }}
                  animate={{ rotateY: 0, opacity: 1, scale: 1 }}
                  exit={{
                    rotateY: dir > 0 ? -90 : 90,
                    opacity: 0,
                    scale: 0.96,
                  }}
                  transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
                  style={{
                    transformStyle: "preserve-3d",
                    transformOrigin: dir > 0 ? "left center" : "right center",
                    position: "absolute",
                    inset: 0,
                  }}
                  className="flex items-center justify-center p-3"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={cur.src}
                    alt={cur.alt}
                    className="h-full w-full object-contain"
                    style={{ maxHeight: 280 }}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom gradient fade */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-[linear-gradient(180deg,transparent,rgba(255,247,251,0.9))]" />
          </div>
        </div>

        {/* Stacked page edges peeking from the right */}
        {[4, 3, 2].map((i) => (
          <div
            key={i}
            className="pointer-events-none absolute right-0 top-0 rounded-r-[16px] bg-[#fdf0f5]"
            style={{
              width: i * 2,
              height: "100%",
              right: -(i * 3),
              opacity: 0.6,
              border: "0.5px solid #f0c0d0",
            }}
          />
        ))}
      </div>

      {/* ── Buttons (outside the tilted book) ──────────────────────────── */}
      <div
        className="mt-10 flex flex-wrap items-center justify-center gap-3"
      >
        <button
          type="button"
          onClick={() => goTo(Math.max(0, localIndex - 1), -1)}
          disabled={localIndex === 0 || isAnim}
          className="rounded-full border border-[#eac9d8] bg-white/75 px-5 py-3 text-[11px] uppercase tracking-[0.26em] text-[#aa7791] disabled:opacity-40"
        >
          Prev
        </button>
        <button
          type="button"
          onClick={() => goTo(Math.min(totalPages - 1, localIndex + 1), 1)}
          disabled={localIndex === totalPages - 1 || isAnim}
          className="rounded-full border border-[#efc3d8] bg-[linear-gradient(135deg,#f8dce8,#ffe9c9)] px-5 py-3 text-[11px] uppercase tracking-[0.26em] text-[#9b647f] disabled:opacity-40"
        >
          Next
        </button>
        {localIndex === totalPages - 1 && (
          <button
            type="button"
            onClick={onOpenFinal}
            className="rounded-full border border-[#efbdd3] bg-[#f8d4e4] px-5 py-3 text-[11px] uppercase tracking-[0.26em] text-[#9a5f7e]"
          >
            Open ✨
          </button>
        )}
      </div>
    </div>
  );
}
