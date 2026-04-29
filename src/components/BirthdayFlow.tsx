"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

type Scene = "countdown" | "greeting" | "gif" | "book" | "final";

const pages = [
  { id: 1, caption: "Photo placeholder 1" },
  { id: 2, caption: "Photo placeholder 2" },
  { id: 3, caption: "Photo placeholder 3" },
  { id: 4, caption: "Photo placeholder 4" },
];

const confettiBits = Array.from({ length: 24 }, (_, index) => ({
  id: index,
  left: `${(index * 11) % 100}%`,
  delay: (index % 6) * 0.35,
  duration: 3.8 + (index % 5) * 0.4,
  drift: ((index * 17) % 80) - 40,
  rotate: 120 + (index % 6) * 50,
  color:
    index % 4 === 0
      ? "#f7b7cd"
      : index % 4 === 1
        ? "#ffe19c"
        : index % 4 === 2
          ? "#cfe6ff"
          : "#d7f4e8",
}));

const cakeBadges = [
  { id: 1, top: "8%", left: "9%", size: "h-16 w-16 md:h-20 md:w-20", delay: 0 },
  { id: 2, top: "18%", right: "10%", size: "h-14 w-14 md:h-18 md:w-18", delay: 0.4 },
  { id: 3, bottom: "12%", left: "14%", size: "h-16 w-16 md:h-20 md:w-20", delay: 0.8 },
  { id: 4, bottom: "9%", right: "12%", size: "h-14 w-14 md:h-18 md:w-18", delay: 1.2 },
];

const balloons = [
  { id: 1, top: "10%", left: "6%", color: "#f6bfd1" },
  { id: 2, top: "7%", right: "7%", color: "#ffe1a7" },
  { id: 3, top: "24%", right: "15%", color: "#d5e8ff" },
  { id: 4, top: "18%", left: "18%", color: "#d9f2e8" },
  { id: 5, top: "30%", right: "5%", color: "#f3c9ff" },
  { id: 6, top: "6%", left: "32%", color: "#ffd9b8" },
];

function BookCard({
  pageIndex,
  direction,
}: {
  pageIndex: number;
  direction: number;
}) {
  const page = pages[pageIndex];

  return (
    <motion.div
      key={page.id}
      initial={{
        opacity: 0,
        x: direction > 0 ? 30 : -30,
        rotateY: direction > 0 ? -55 : 55,
      }}
      animate={{ opacity: 1, x: 0, rotateY: 0 }}
      exit={{
        opacity: 0,
        x: direction > 0 ? -30 : 30,
        rotateY: direction > 0 ? 55 : -55,
      }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformStyle: "preserve-3d" }}
      className="relative min-h-[420px] overflow-hidden rounded-[28px] border border-[#e9d4dd] bg-[linear-gradient(180deg,#fffdfb,#fff6f9)] p-4 shadow-[0_20px_44px_rgba(143,92,118,0.12)] md:min-h-[460px] md:p-6"
    >
      <div className="absolute inset-y-0 left-0 w-5 bg-[linear-gradient(to_right,rgba(132,86,113,0.15),transparent)]" />
      <div className="relative flex h-full flex-col">
        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-[#b77d99]">
          <span>Happy Birthday Test</span>
          <span>
            {pageIndex + 1} / {pages.length}
          </span>
        </div>

        <div className="mt-5 flex flex-1 flex-col gap-5">
          <div className="relative overflow-hidden rounded-[24px] border-2 border-dashed border-[#e5bfd0] bg-[linear-gradient(180deg,#fffafc,#fef0f5)] p-3 md:p-4">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.85),transparent_40%)]" />
            <div className="relative mx-auto grid max-w-[720px] grid-cols-2 gap-2 md:gap-3">
              <div className="overflow-hidden rounded-[18px] border border-white/80 bg-[linear-gradient(180deg,#fff7fb,#fdf0f6)] p-2 shadow-[0_10px_22px_rgba(193,140,167,0.08)]">
                <div className="flex aspect-[4/5] items-center justify-center rounded-[14px] border border-dashed border-[#e8c6d5] bg-white/70">
                  <div className="text-center">
                    <p className="text-[10px] uppercase tracking-[0.28em] text-[#c48aa6]">
                      photo
                    </p>
                    <p className="mt-2 font-serif text-xl italic text-[#9e6784] sm:text-2xl md:text-3xl">
                      Left
                    </p>
                  </div>
                </div>
              </div>
              <div className="overflow-hidden rounded-[18px] border border-white/80 bg-[linear-gradient(180deg,#fff7fb,#fdf0f6)] p-2 shadow-[0_10px_22px_rgba(193,140,167,0.08)]">
                <div className="flex aspect-[4/5] items-center justify-center rounded-[14px] border border-dashed border-[#e8c6d5] bg-white/70">
                  <div className="text-center">
                    <p className="text-[10px] uppercase tracking-[0.28em] text-[#c48aa6]">
                      photo
                    </p>
                    <p className="mt-2 font-serif text-xl italic text-[#9e6784] sm:text-2xl md:text-3xl">
                      Right
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[20px] border border-[#edd3dd] bg-white/74 px-5 py-4 text-center">
            <p className="font-serif text-xl italic text-[#8f6078]">
              Happy Birthday
            </p>
            <p className="mt-2 text-sm text-[#8d7380]">
              Wishing you a lovely day.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function BirthdayFlow() {
  const [scene, setScene] = useState<Scene>("countdown");
  const [count, setCount] = useState(3);
  const [greetingStep, setGreetingStep] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timers = [
      window.setTimeout(() => setCount(2), 1500),
      window.setTimeout(() => setCount(1), 3000),
      window.setTimeout(() => setScene("greeting"), 4500),
    ];

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, []);

  useEffect(() => {
    if (scene !== "greeting") return;

    const timers = [
      window.setTimeout(() => setGreetingStep(1), 150),
      window.setTimeout(() => setGreetingStep(2), 850),
      window.setTimeout(() => setGreetingStep(3), 1550),
      window.setTimeout(() => setScene("gif"), 3600),
    ];

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [scene]);

  function openBook() {
    setPageIndex(0);
    setDirection(1);
    setScene("book");
  }

  function flipPage(nextDirection: number) {
    setDirection(nextDirection);
    setPageIndex((current) =>
      Math.max(0, Math.min(pages.length - 1, current + nextDirection)),
    );
  }

  return (
    <div className="relative z-10 min-h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        {scene === "countdown" ? (
          <motion.section
            key="countdown"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex min-h-screen items-center justify-center px-6"
          >
            <div className="relative flex items-center justify-center">
              {[0, 1, 2].map((ring) => (
                <motion.div
                  key={ring}
                  initial={{ opacity: 0, scale: 0.4 }}
                  animate={{ opacity: 0.35 - ring * 0.08, scale: 1 + ring * 0.24 }}
                  transition={{ duration: 0.8 }}
                  className="absolute h-[220px] w-[220px] rounded-full border border-[#efc3d7] md:h-[320px] md:w-[320px]"
                />
              ))}
              <motion.div
                key={count}
                initial={{ opacity: 0, scale: 1.8, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                className="font-serif text-[6rem] font-bold italic text-[#cc7ea5] sm:text-[8rem] md:text-[14rem]"
              >
                {count}
              </motion.div>
            </div>
          </motion.section>
        ) : null}

        {scene === "greeting" ? (
          <motion.section
            key="greeting"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex min-h-screen flex-col items-center justify-center px-6 text-center"
          >
            <motion.h1
              animate={{ opacity: greetingStep >= 1 ? 1 : 0, y: greetingStep >= 1 ? 0 : 20 }}
              className="font-serif text-5xl font-bold tracking-[0.18em] text-[#d78bab] md:text-7xl"
            >
              HAPPY
            </motion.h1>
            <motion.h2
              animate={{ opacity: greetingStep >= 2 ? 1 : 0, y: greetingStep >= 2 ? 0 : 20 }}
              className="mt-4 font-serif text-4xl italic text-[#a86d8d] md:text-6xl"
            >
              Birthday
            </motion.h2>
            <motion.p
              animate={{ opacity: greetingStep >= 3 ? 1 : 0, y: greetingStep >= 3 ? 0 : 20 }}
              className="mt-5 text-2xl text-[#c597ad] md:text-4xl"
            >
              Test
            </motion.p>
          </motion.section>
        ) : null}

        {scene === "gif" ? (
          <motion.section
            key="gif"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center"
          >
            {balloons.map((balloon, index) => (
              <motion.div
                key={`gif-balloon-${balloon.id}`}
                animate={{ y: [0, -12, 0] }}
                transition={{
                  duration: 3 + index * 0.25,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute"
                style={{ top: balloon.top, left: balloon.left, right: balloon.right }}
              >
                <div
                  className="relative h-16 w-12 rounded-[50%_50%_45%_45%] opacity-90 shadow-[0_10px_24px_rgba(143,92,118,0.08)] md:h-20 md:w-16"
                  style={{ backgroundColor: balloon.color }}
                >
                  <div className="absolute left-1/2 top-full h-14 w-px -translate-x-1/2 bg-[#d7bac8]" />
                </div>
              </motion.div>
            ))}
            <button
              type="button"
              onClick={openBook}
              className="group relative rounded-[36px] border border-white/80 bg-white/65 p-5 shadow-[0_28px_60px_rgba(184,124,154,0.20)] backdrop-blur-md"
            >
              <motion.div
                animate={{ y: [0, -6, 0], rotate: [-4, 4, -4] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-3 top-3 z-20 rounded-full border border-[#efcddb] bg-white px-4 py-2 text-[10px] uppercase tracking-[0.28em] text-[#b17694] shadow-[0_10px_24px_rgba(143,92,118,0.16)]"
              >
                click me
              </motion.div>
              <div className="relative h-[270px] w-[270px] overflow-hidden rounded-[28px] border border-[#f1cada] bg-[radial-gradient(circle_at_top,#fffefb,#fff0f6)] md:h-[340px] md:w-[340px]">
                <Image
                  src="/birthday-opener.gif"
                  alt="Birthday dancing gif"
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
              <p className="mt-4 font-serif text-3xl italic text-[#b36f92]">
                Happy Birthday
              </p>
            </button>
          </motion.section>
        ) : null}

        {scene === "book" ? (
          <motion.section
            key="book"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex min-h-screen items-center justify-center px-4 py-8"
          >
            <div className="w-full max-w-4xl">
              <div className="mb-6 text-center">
                <h2 className="font-serif text-4xl italic text-[#b16f90] md:text-5xl">
                  Happy Birthday Test
                </h2>
              </div>

              <div className="mx-auto max-w-3xl [perspective:1800px]">
                <AnimatePresence mode="wait">
                  <BookCard pageIndex={pageIndex} direction={direction} />
                </AnimatePresence>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => flipPage(-1)}
                  disabled={pageIndex === 0}
                  className="rounded-full border border-[#eac9d8] bg-white/75 px-5 py-3 text-[11px] uppercase tracking-[0.26em] text-[#aa7791] disabled:opacity-40"
                >
                  Prev
                </button>
                <button
                  type="button"
                  onClick={() => flipPage(1)}
                  disabled={pageIndex === pages.length - 1}
                  className="rounded-full border border-[#efc3d8] bg-[linear-gradient(135deg,#f8dce8,#ffe9c9)] px-5 py-3 text-[11px] uppercase tracking-[0.26em] text-[#9b647f] disabled:opacity-40"
                >
                  Next
                </button>
                {pageIndex === pages.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => setScene("final")}
                    className="rounded-full border border-[#efbdd3] bg-[#f8d4e4] px-5 py-3 text-[11px] uppercase tracking-[0.26em] text-[#9a5f7e]"
                  >
                    Open
                  </button>
                ) : null}
              </div>
            </div>
          </motion.section>
        ) : null}

        {scene === "final" ? (
          <motion.section
            key="final"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-12"
          >
            {confettiBits.map((bit) => (
              <motion.span
                key={bit.id}
                initial={{ y: -80, opacity: 0, x: 0, rotate: 0 }}
                animate={{
                  y: ["-12vh", "92vh"],
                  x: [0, bit.drift],
                  opacity: [0, 1, 1, 0],
                  rotate: [0, bit.rotate],
                }}
                transition={{
                  duration: bit.duration,
                  delay: bit.delay,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute top-0 h-3 w-2 rounded-full"
                style={{ left: bit.left, backgroundColor: bit.color }}
              />
            ))}

            {cakeBadges.map((badge) => (
              <motion.div
                key={badge.id}
                animate={{ y: [0, -8, 0], rotate: [-4, 4, -4] }}
                transition={{
                  duration: 2.6,
                  delay: badge.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className={`absolute ${badge.size} rounded-full border border-[#efd4de] bg-white/78 p-2 shadow-[0_12px_26px_rgba(143,92,118,0.10)] backdrop-blur-sm`}
                style={{
                  top: badge.top,
                  left: badge.left,
                  right: badge.right,
                  bottom: badge.bottom,
                }}
              >
                <div className="relative h-full w-full overflow-hidden rounded-full border border-[#f2d7e2] bg-white">
                  <Image
                    src="https://media.tenor.com/bh9MAiCpL6wAAAAj/birthday-cake.gif"
                    alt="Birthday cake gif"
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
              </motion.div>
            ))}

            {balloons.map((balloon, index) => (
              <motion.div
                key={balloon.id}
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 3 + index * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute hidden md:block"
                style={{ top: balloon.top, left: balloon.left, right: balloon.right }}
              >
                <div
                  className="relative h-20 w-16 rounded-[50%_50%_45%_45%] shadow-[0_10px_24px_rgba(143,92,118,0.08)]"
                  style={{ backgroundColor: balloon.color }}
                >
                  <div className="absolute left-1/2 top-full h-16 w-px -translate-x-1/2 bg-[#d7bac8]" />
                </div>
              </motion.div>
            ))}

            <div className="absolute left-[12%] top-[18%] h-16 w-16 rounded-full bg-[#ffddea]/45 blur-3xl" />
            <div className="absolute bottom-[18%] right-[16%] h-20 w-20 rounded-full bg-[#dceeff]/45 blur-3xl" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.26),transparent_45%)]" />

            <div className="relative grid w-full max-w-6xl grid-cols-[1fr_1fr] items-center gap-4 md:gap-8">
                <motion.div
                  animate={{ rotate: [-2, 2, -2], y: [0, -6, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="relative z-10 ml-auto h-[180px] w-[180px] sm:h-[260px] sm:w-[260px] md:ml-auto md:h-[420px] md:w-[420px]"
                >
                  <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.72),rgba(255,235,244,0.34),transparent_72%)] blur-2xl" />
                  <Image
                    src="/bouquet.png"
                    alt="Flower bouquet"
                    fill
                    className="object-contain drop-shadow-[0_20px_34px_rgba(155,101,128,0.18)]"
                  />
                </motion.div>

                <div className="relative z-20 mr-auto w-full max-w-[180px] sm:max-w-[260px] md:max-w-[320px]">
                  <div className="relative w-full rotate-[-6deg] rounded-[24px] border border-[#e7d2db] bg-[linear-gradient(180deg,rgba(255,255,255,0.78),rgba(255,245,249,0.90))] p-3 shadow-[0_18px_36px_rgba(143,92,118,0.12)] backdrop-blur-sm sm:rounded-[32px] sm:p-4">
                    <div className="mb-4 overflow-hidden rounded-[24px] border border-[#edd3dd] bg-white/72 p-3">
                      <div className="flex h-[180px] items-center justify-center rounded-[18px] border-2 border-dashed border-[#e5bfd0] bg-[linear-gradient(180deg,#fffdfd,#fff7fa)] text-center sm:h-[240px] md:h-[300px]">
                        <div>
                          <p className="text-[11px] uppercase tracking-[0.3em] text-[#c48aa6]">
                            photo
                          </p>
                          <p className="mt-3 font-serif text-2xl italic text-[#9e6784] sm:text-3xl">
                            Placeholder
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="font-serif text-2xl italic text-[#b16f90] sm:text-3xl md:text-[3.2rem]">
                        Happy Birthday
                      </p>
                      <p className="mt-2 text-xs text-[#8d7380] sm:text-sm">
                        Wishing you a lovely day.
                      </p>
                    </div>
                  </div>
                </div>
            </div>
          </motion.section>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
