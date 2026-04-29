"use client";

import { motion } from "framer-motion";

const particles = Array.from({ length: 44 }, (_, index) => {
  const xStart = (index * 11) % 100;
  const xShift = ((index * 17) % 50) - 25;
  const opacity = 0.28 + (index % 4) * 0.1;
  const duration = 10 + (index % 5) * 1.7;
  const delay = (index % 8) * 0.55;
  const size = 5 + (index % 4) * 5;
  const hue = index % 5;

  return {
    id: index,
    size,
    hue,
    initial: {
      x: `${xStart}vw`,
      y: "110vh",
      opacity,
    },
    animate: {
      x: `calc(${xStart}vw + ${xShift}px)`,
      y: "-10vh",
    },
    transition: {
      duration,
      delay,
      repeat: Infinity,
      ease: "linear" as const,
    },
  };
});

export default function BackgroundElements() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#f8f4f7]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(248,221,233,0.42),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(225,233,248,0.34),transparent_24%),radial-gradient(circle_at_20%_80%,rgba(228,241,235,0.28),transparent_22%),linear-gradient(180deg,#f8f4f7,#f5eff3_42%,#f2f0f6_76%,#f6f2ef)]" />
      <div className="absolute left-[8%] top-[18%] h-28 w-28 rounded-full bg-[#f3cddd]/24 blur-3xl" />
      <div className="absolute bottom-[12%] right-[10%] h-32 w-32 rounded-full bg-[#dce7f6]/22 blur-3xl" />

      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute"
          initial={particle.initial}
          animate={particle.animate}
          transition={particle.transition}
        >
          <span
            className={[
              "block rounded-full",
              particle.hue === 0 ? "bg-[#ffc9df]" : "",
              particle.hue === 1 ? "bg-[#ffe4a8]" : "",
              particle.hue === 2 ? "bg-[#d5ebff]" : "",
              particle.hue === 3 ? "bg-[#d9f4ea]" : "",
              particle.hue === 4 ? "bg-[#f4dfff]" : "",
            ].join(" ")}
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.initial.opacity,
              boxShadow: "0 0 16px rgba(255,255,255,0.26)",
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}
