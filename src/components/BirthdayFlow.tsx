"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

type Scene = "countdown" | "greeting" | "gif" | "book" | "final";

const pages = [
  {
    id: 1,
    src: "https://media.tenor.com/l2QU5JIn6q0AAAAi/happy-birthday.gif",
    alt: "Happy birthday sticker gif",
    badge: "Birthday Wish",
    caption: "A bright little birthday spark to open the card.",
  },
  {
    id: 2,
    src: "https://www.funimada.com/assets/images/cards/big/bday-501.gif",
    alt: "Birthday greeting card gif",
    badge: "Sweet Surprise",
    caption: "A warm birthday card moment filled with celebration.",
  },
  {
    id: 3,
    src: "https://media.tenor.com/qeXZqARw9i8AAAAm/happy-birthday-happybirthday.webp",
    alt: "Happy birthday celebration gif",
    badge: "Party Time",
    caption: "More birthday energy for the next page of the story.",
  },
  {
    id: 4,
    src: "https://media.tenor.com/8_1QySrL5KUAAAAM/happy-dance-birthday.gif",
    alt: "Happy birthday dancing gif",
    badge: "Dance Break",
    caption: "Ending the flipbook with a joyful birthday dance.",
  },
];

const confettiBits = Array.from({ length: 14 }, (_, index) => ({
  id: index,
  left: `${(index * 17) % 100}%`,
  delay: (index % 5) * 0.45,
  duration: 4.2 + (index % 5) * 0.5,
  drift: ((index * 13) % 60) - 30,
  rotate: 90 + (index % 4) * 60,
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
            <div className="relative mx-auto max-w-[720px]">
              <div className="overflow-hidden rounded-[20px] border border-white/85 bg-[linear-gradient(180deg,#fff7fb,#fdf0f6)] p-2.5 shadow-[0_12px_28px_rgba(193,140,167,0.10)] md:rounded-[24px] md:p-3">
                <div className="relative aspect-[5/4] overflow-hidden rounded-[16px] border border-dashed border-[#e8c6d5] bg-[linear-gradient(180deg,#fffefd,#fff6fa)] md:aspect-[16/10] md:rounded-[18px]">
                  <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between gap-3 p-3 md:p-4">
                    <span className="rounded-full border border-white/75 bg-white/78 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-[#ba7896] backdrop-blur-sm">
                      {page.badge}
                    </span>
                    <span className="rounded-full border border-[#f1d6e1] bg-[#fff7fb]/88 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-[#ba7896]">
                      page {page.id}
                    </span>
                  </div>
                  <Image
                    src={page.src}
                    alt={page.alt}
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, 720px"
                    className="object-contain p-4 md:p-6"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-20 bg-[linear-gradient(180deg,transparent,rgba(255,247,251,0.9))]" />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[20px] border border-[#edd3dd] bg-white/74 px-5 py-4 text-center">
            <p className="font-serif text-xl italic text-[#8f6078]">
              Happy Birthday
            </p>
            <p className="mt-2 text-sm text-[#8d7380]">{page.caption}</p>
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
            className="relative flex min-h-screen flex-col items-center px-4 py-8 md:px-6 md:py-16"
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
                className={`absolute ${badge.size} rounded-full border border-[#efd4de] bg-white/78 p-2 shadow-[0_12px_26px_rgba(143,92,118,0.10)] md:backdrop-blur-sm [will-change:transform]`}
                style={{
                  top: badge.top,
                  left: badge.left,
                  right: badge.right,
                  bottom: badge.bottom,
                }}
              >
                <div className="relative h-full w-full overflow-hidden rounded-full border border-[#f2d7e2] bg-white">
                  <Image
                    src="https://media.tenor.com/7p_2X8-mD_AAAAAj/peach-goma.gif"
                    alt="Cute peach goma gif"
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

            <div className="absolute left-[12%] top-[18%] h-16 w-16 rounded-full bg-[#ffddea]/45 blur-2xl md:blur-3xl" />
            <div className="absolute bottom-[18%] right-[16%] h-20 w-20 rounded-full bg-[#dceeff]/45 blur-2xl md:blur-3xl" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2),transparent_50%)]" />

            <div className="relative z-10 w-full max-w-5xl my-auto">
              <div className="relative rounded-[40px] border border-white/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.72),rgba(255,245,249,0.88),rgba(246,241,255,0.82))] px-5 py-10 shadow-[0_28px_70px_rgba(143,92,118,0.12)] backdrop-blur-md sm:px-8 sm:py-12 md:px-10">
                <div className="absolute -left-14 top-12 h-28 w-28 rounded-full bg-[#ffd8e8]/50 blur-2xl md:blur-3xl" />
                <div className="absolute -right-10 bottom-12 h-32 w-32 rounded-full bg-[#dceeff]/45 blur-2xl md:blur-3xl" />

                <div className="relative flex flex-col items-center text-center px-2">
                  <motion.span 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-full border border-[#efcddd] bg-white/76 px-4 py-2 text-[10px] uppercase tracking-[0.32em] text-[#b57a96] shadow-[0_10px_22px_rgba(143,92,118,0.08)]"
                  >
                    Birthday Keepsake
                  </motion.span>
                  <motion.h2 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-6 font-serif text-[2.4rem] italic leading-none tracking-tight text-[#af6f8f] sm:text-[3.6rem] md:text-[5.5rem]"
                  >
                    <span className="bg-gradient-to-r from-[#af6f8f] via-[#d487aa] to-[#af6f8f] bg-clip-text text-transparent">
                      Happy Birthday
                    </span>
                  </motion.h2>
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mt-5 max-w-xs text-[12px] leading-relaxed text-[#8d7380] sm:max-w-sm sm:text-base"
                  >
                    A soft little bouquet, a dancing wish, and a page made just for your happiest day.
                  </motion.p>
                </div>

                <div className="relative mt-8 flex flex-col items-center justify-center gap-12 md:mt-16 md:flex-row md:gap-0">
                  <motion.div
                    animate={{ rotate: [-1, 1, -1], y: [0, -10, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="relative z-10 h-[160px] w-[160px] drop-shadow-[0_20px_40px_rgba(155,101,128,0.18)] sm:h-[220px] sm:w-[220px] md:h-[380px] md:w-[380px] md:-mr-12"
                  >
                    <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.85),rgba(255,235,244,0.4),transparent_72%)] blur-2xl md:blur-3xl" />
                    <Image
                      src="https://i.pinimg.com/originals/5b/85/24/5b8524f690facef6a5fefff8a5e12481.gif"
                      alt="Animated flower bouquet"
                      fill
                      unoptimized
                      className="object-contain"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 30, rotate: 2 }}
                    animate={{ opacity: 1, y: 0, rotate: -2 }}
                    transition={{ delay: 0.35, duration: 0.8 }}
                    className="relative z-20 w-[92%] max-w-[320px] sm:max-w-[360px] md:w-full md:max-w-[400px]"
                  >
                    <div className="relative overflow-hidden rounded-[32px] border border-[#ecd7e0] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(255,246,250,0.98))] p-3 shadow-[0_32px_64px_rgba(143,92,118,0.18)] sm:p-4">
                      <div className="absolute right-5 top-5 rounded-full border border-[#f1d6e1] bg-white/90 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-[#ba7896]">
                        page final
                      </div>
                      <div className="mb-5 overflow-hidden rounded-[24px] border border-[#edd3dd] bg-white/78 p-3 shadow-inner">
                        <div className="relative aspect-[4/5] overflow-hidden rounded-[18px] border-2 border-dashed border-[#e5bfd0] bg-[linear-gradient(180deg,#fffdfd,#fff7fa)]">
                          <Image
                            src={pages[3].src}
                            alt={pages[3].alt}
                            fill
                            unoptimized
                            sizes="(max-width: 768px) 80vw, 400px"
                            className="object-contain p-4"
                          />
                          <div className="absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(180deg,transparent,rgba(255,247,250,0.95))]" />
                        </div>
                      </div>
                      <div className="pb-2 text-center">
                        <p className="font-serif text-3xl italic text-[#b16f90] sm:text-[2.8rem]">
                          Keep smiling
                        </p>
                        <p className="mt-2 text-sm leading-6 text-[#8d7380]">
                          Wishing you a lovely day filled with flowers, laughter, and sweet little surprises.
                        </p>
                      </div>
                      <div className="absolute -bottom-4 -right-4 h-16 w-16 rotate-12 opacity-40">
                        <svg viewBox="0 0 100 100" className="fill-[#f6a6b2]">
                          <path d="M50 0 C60 30 100 40 100 50 C100 60 60 70 50 100 C40 70 0 60 0 50 C0 40 40 30 50 0" />
                        </svg>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.section>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
