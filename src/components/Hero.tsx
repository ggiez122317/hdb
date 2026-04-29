"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const spreads = [
  {
    kicker: "Page 01",
    title: "A tiny birthday world",
    body:
      "Soft lights, ribbon skies, and one very important person in the middle of it all. This little book starts with a bouquet because the uploaded flowers deserved to be the star.",
    note: "Image spot for your favorite birthday memory",
    accent:
      "from-[#fff7fb] via-[#fde9f1] to-[#ffe7da]",
  },
  {
    kicker: "Page 02",
    title: "Main character, obviously",
    body:
      "This spread is for the sweetest photo, the one that instantly feels like the whole mood of the day. Think less gallery grid, more storybook spotlight.",
    note: "Large featured image placeholder",
    accent:
      "from-[#f8f0ff] via-[#efe8ff] to-[#e8f5ff]",
  },
  {
    kicker: "Page 03",
    title: "A wish to keep",
    body:
      "I hope the next chapter feels gentle, pretty, and a little magical in all the right places. Cute things only. Good surprises only. Happy birthday, always.",
    note: "Final note or message area",
    accent:
      "from-[#fff4e8] via-[#fff9ef] to-[#eefcf6]",
  },
];

function BookPage({
  pageIndex,
  direction,
}: {
  pageIndex: number;
  direction: number;
}) {
  const page = spreads[pageIndex];

  return (
    <motion.div
      key={pageIndex}
      initial={{
        opacity: 0,
        x: direction >= 0 ? 34 : -34,
        rotateY: direction >= 0 ? -70 : 70,
      }}
      animate={{ opacity: 1, x: 0, rotateY: 0 }}
      exit={{
        opacity: 0,
        x: direction >= 0 ? -34 : 34,
        rotateY: direction >= 0 ? 70 : -70,
      }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformStyle: "preserve-3d" }}
      className={`relative min-h-[430px] overflow-hidden rounded-[28px] border border-[#f2cfe1] bg-gradient-to-br ${page.accent} p-6 shadow-[0_26px_60px_rgba(107,56,87,0.16)] md:p-8`}
    >
      <div className="absolute inset-y-0 left-0 w-5 bg-[linear-gradient(to_right,rgba(143,92,125,0.16),transparent)]" />
      <div className="absolute right-4 top-4 h-16 w-16 rounded-full bg-white/35 blur-2xl" />

      <div className="relative flex h-full flex-col">
        <div className="mb-4 flex items-center justify-between text-[10px] uppercase tracking-[0.32em] text-[#9a7087]">
          <span>{page.kicker}</span>
          <span>{pageIndex + 1} / {spreads.length}</span>
        </div>

        <div className="grid flex-1 gap-6 md:grid-cols-[1.08fr_0.92fr] md:items-center">
          <div className="relative overflow-hidden rounded-[24px] border border-white/70 bg-white/65 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)]">
            <div className="absolute inset-x-5 top-4 h-10 rounded-full bg-[#ffffff]/70 blur-xl" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[18px] border border-dashed border-[#d9b7c9] bg-[linear-gradient(180deg,#fff9fc,#fdf1f6)]">
              <Image
                src="/flowers.png"
                alt="Floral birthday decoration"
                fill
                className="object-cover object-center opacity-80"
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.68),transparent_40%),linear-gradient(180deg,rgba(255,248,252,0.15),rgba(253,243,248,0.72))]" />
              <div className="absolute inset-x-5 bottom-5 rounded-[18px] border border-white/70 bg-white/74 px-4 py-3 text-center shadow-lg backdrop-blur-sm">
                <p className="text-[10px] uppercase tracking-[0.28em] text-[#9a7087]">
                  {page.note}
                </p>
                <p className="mt-2 font-serif text-lg italic text-[#7f5672]">
                  Replace with your uploaded image
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center text-left">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#c48aaa]">
              Storybook note
            </p>
            <h3 className="mt-3 font-serif text-3xl italic text-[#7d506d] md:text-4xl">
              {page.title}
            </h3>
            <p className="mt-5 text-sm leading-8 text-[#7b6470] md:text-[15px]">
              {page.body}
            </p>
            <div className="mt-6 rounded-[20px] border border-[#ebcfde] bg-white/60 px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
              <p className="text-[11px] uppercase tracking-[0.25em] text-[#b07f98]">
                Little detail
              </p>
              <p className="mt-2 text-sm leading-7 text-[#7f6873]">
                Decorative ribbons, pressed flowers, and one big featured
                memory feel much sweeter here than a row of tiny cards.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const [isOpen, setIsOpen] = useState(false);
  const [coverOpen, setCoverOpen] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const timer = window.setTimeout(() => setCoverOpen(true), 140);
    return () => window.clearTimeout(timer);
  }, [isOpen]);

  function openBook() {
    setPageIndex(0);
    setDirection(1);
    setCoverOpen(false);
    setIsOpen(true);
  }

  function closeBook() {
    setCoverOpen(false);
    setIsOpen(false);
  }

  function turnPage(nextDirection: number) {
    setDirection(nextDirection);
    setPageIndex((current) =>
      Math.max(0, Math.min(spreads.length - 1, current + nextDirection)),
    );
  }

  return (
    <>
      <section className="relative z-10 min-h-screen overflow-hidden px-6 py-12 md:px-10">
        <div className="mx-auto grid min-h-[calc(100vh-6rem)] max-w-6xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="text-center lg:text-left"
          >
            <p className="inline-flex rounded-full border border-[#f2cddd] bg-white/55 px-4 py-2 text-[10px] uppercase tracking-[0.38em] text-[#c486a7] shadow-[0_10px_30px_rgba(247,203,222,0.25)] backdrop-blur-sm">
              Cute Birthday Drop
            </p>

            <h1 className="mt-6 font-serif text-5xl italic leading-[0.92] text-[#7e4e71] sm:text-6xl md:text-7xl">
              Happy birthday,
              <span className="block text-[#d98faf]">open your little book.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-sm leading-8 text-[#7c6672] lg:mx-0 md:text-base">
              Same playful surprise energy as the cute birthday sticker idea,
              but upgraded into a sweeter storybook moment with your uploaded
              florals, prettier particles, and a proper page-turn reveal.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <div className="rounded-full border border-[#f1d8e4] bg-white/60 px-4 py-2 text-[11px] uppercase tracking-[0.24em] text-[#b47e99] backdrop-blur-sm">
                Tap the birthday charm
              </div>
              <div className="rounded-full border border-[#e7dff2] bg-[#fbf6ff]/70 px-4 py-2 text-[11px] uppercase tracking-[0.24em] text-[#9c7ab5] backdrop-blur-sm">
                Storybook reveal
              </div>
              <div className="rounded-full border border-[#dcecdf] bg-[#f6fff8]/70 px-4 py-2 text-[11px] uppercase tracking-[0.24em] text-[#77a08f] backdrop-blur-sm">
                Flower asset integrated
              </div>
            </div>
          </motion.div>

          <motion.button
            type="button"
            onClick={openBook}
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -6, scale: 1.015 }}
            whileTap={{ scale: 0.99 }}
            className="group relative mx-auto w-full max-w-[560px] cursor-pointer rounded-[42px] border border-white/70 bg-[linear-gradient(180deg,rgba(255,252,255,0.88),rgba(255,243,248,0.82))] p-5 text-left shadow-[0_40px_90px_rgba(194,132,164,0.22)] backdrop-blur-xl"
          >
            <div className="absolute inset-0 rounded-[42px] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.9),transparent_40%),linear-gradient(135deg,rgba(255,219,232,0.38),rgba(234,239,255,0.28),rgba(248,245,220,0.32))]" />
            <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[#ffdcea]/80 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-8 left-6 h-24 w-24 rounded-full bg-[#dff5ee]/80 blur-3xl" />

            <div className="relative rounded-[30px] border border-white/85 bg-white/55 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.95)]">
              <div className="mb-4 flex items-center justify-between">
                <div className="rounded-full bg-[#ffe9f3] px-4 py-2 font-serif text-lg italic text-[#b8628c] shadow-sm">
                  Happy Birthday
                </div>
                <motion.div
                  animate={{ rotate: [-4, 4, -4], y: [0, -4, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                  className="rounded-full border border-[#f7d7e5] bg-[#fff9fc] px-3 py-1 text-[10px] uppercase tracking-[0.26em] text-[#b37c98]"
                >
                  tap to open
                </motion.div>
              </div>

              <div className="grid gap-5 md:grid-cols-[0.9fr_1.1fr] md:items-center">
                <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-[32px] border border-[#f3d5e2] bg-[radial-gradient(circle_at_top,#fffefc,#ffeef6_58%,#f7f0ff)]">
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-5 rounded-full bg-white/70 px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-[#b9829b] shadow-sm"
                  >
                    make a wish
                  </motion.div>

                  <motion.div
                    animate={{ rotate: [-2, 2, -2], scale: [1, 1.02, 1] }}
                    transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                    className="relative h-[82%] w-[82%]"
                  >
                    <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.98),rgba(255,237,246,0.82),rgba(235,224,255,0.56))] shadow-[0_20px_60px_rgba(192,124,161,0.18)]" />
                    <div className="absolute inset-[10%] overflow-hidden rounded-full border border-white/80 bg-white/60 shadow-[0_16px_34px_rgba(188,128,161,0.18)]">
                      <Image
                        src="/birthday-opener.gif"
                        alt="Cute birthday opener"
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    </div>
                    <Image
                      src="/flowers.png"
                      alt=""
                      fill
                      className="pointer-events-none object-contain p-3 opacity-28"
                    />
                  </motion.div>

                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-6 rounded-full border border-[#f3d4dd] bg-[#fffaf1] px-4 py-2 text-sm text-[#cf8f5e] shadow-sm"
                  >
                    gif + sparkles + flowers
                  </motion.div>
                </div>

                <div className="rounded-[30px] border border-[#f0d7e1] bg-[linear-gradient(180deg,rgba(255,255,255,0.72),rgba(255,245,250,0.8))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.92)]">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#c486a7]">
                    Open the surprise
                  </p>
                  <h2 className="mt-3 font-serif text-3xl italic text-[#7f5572]">
                    A cuter reveal than a basic gallery
                  </h2>
                  <p className="mt-4 text-sm leading-8 text-[#806875]">
                    Click this birthday charm and it opens into a pastel
                    storybook with page turns, one featured image area at a
                    time, and a much sweeter feel than four boxes in a row.
                  </p>

                  <div className="mt-5 grid grid-cols-3 gap-3">
                    {["soft", "sparkly", "storybook"].map((item) => (
                      <div
                        key={item}
                        className="rounded-[18px] border border-white/80 bg-white/70 px-3 py-3 text-center text-[10px] uppercase tracking-[0.26em] text-[#a57991]"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.button>
        </div>
      </section>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(88,47,73,0.30)] p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 16 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-6xl overflow-hidden rounded-[40px] border border-white/70 bg-[linear-gradient(180deg,rgba(255,250,253,0.92),rgba(255,241,247,0.88))] p-4 shadow-[0_45px_140px_rgba(114,60,91,0.28)] md:p-6"
            >
              <button
                type="button"
                onClick={closeBook}
                className="absolute right-4 top-4 z-20 rounded-full border border-[#efcadc] bg-white/75 px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-[#ad7893]"
              >
                close
              </button>

              <div className="relative mt-10 grid gap-6 md:grid-cols-[0.9fr_1.1fr] md:items-center">
                <div className="relative hidden min-h-[520px] overflow-hidden rounded-[34px] border border-[#efcfdd] bg-[linear-gradient(155deg,#fff4f8,#fdf7ff,#fff7ec)] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.92)] md:block">
                  <div className="absolute inset-y-5 left-4 w-6 rounded-full bg-[linear-gradient(to_right,rgba(136,88,118,0.20),transparent)]" />
                  <div className="absolute right-10 top-8 h-16 w-16 rounded-full bg-[#ffe0ec] blur-2xl" />
                  <div className="relative flex h-full flex-col justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.35em] text-[#bf85a3]">
                        Little birthday book
                      </p>
                      <h2 className="mt-3 font-serif text-5xl italic leading-[0.95] text-[#82576f]">
                        Opened just for today
                      </h2>
                    </div>

                    <div className="relative mx-auto h-[280px] w-[280px]">
                      <motion.div
                        animate={{ rotate: [-2, 2, -2], y: [0, -6, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 rounded-full bg-[radial-gradient(circle,#fffefc,#fdeff5,#ece6ff)] shadow-[0_20px_60px_rgba(188,124,158,0.22)]"
                      />
                      <Image
                        src="/bouquet.png"
                        alt="Floral storybook decoration"
                        fill
                        className="object-contain p-4"
                      />
                    </div>

                    <div className="rounded-[24px] border border-[#efd8e4] bg-white/70 p-4">
                      <p className="text-[10px] uppercase tracking-[0.28em] text-[#bb819d]">
                        why this works better
                      </p>
                      <p className="mt-2 text-sm leading-7 text-[#7b6672]">
                        One big image moment per page, a softer pastel layout,
                        and page-turn motion that feels like an actual keepsake.
                      </p>
                    </div>
                  </div>

                  <motion.div
                    initial={{ rotateY: 0 }}
                    animate={{ rotateY: coverOpen ? -165 : 0 }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    style={{ transformOrigin: "left center", transformStyle: "preserve-3d" }}
                    className="absolute inset-0 rounded-[34px] border border-[#efcadb] bg-[linear-gradient(160deg,#ffdce9,#f6dff8,#fff0cb)] p-6 shadow-[0_30px_70px_rgba(178,110,146,0.24)]"
                  >
                    <div className="absolute inset-y-0 left-0 w-8 rounded-l-[34px] bg-[linear-gradient(to_right,rgba(138,87,117,0.28),rgba(138,87,117,0.12),transparent)]" />
                    <div className="relative flex h-full flex-col items-center justify-center text-center">
                      <div className="rounded-full border border-white/80 bg-white/55 px-4 py-2 text-[10px] uppercase tracking-[0.34em] text-[#b77899]">
                        Happy Birthday
                      </div>
                      <div className="relative mt-8 h-64 w-64">
                        <Image
                          src="/bouquet.png"
                          alt="Birthday bouquet cover"
                          fill
                          className="object-contain drop-shadow-[0_18px_26px_rgba(168,111,144,0.28)]"
                        />
                      </div>
                      <h3 className="mt-5 font-serif text-4xl italic text-[#7d4f6d]">
                        Tap became a story
                      </h3>
                      <p className="mt-3 max-w-sm text-sm leading-7 text-[#896d79]">
                        A cute cover, soft ribbons, and a page-turn opening
                        instead of a boring static reveal.
                      </p>
                    </div>
                  </motion.div>
                </div>

                <div className="relative [perspective:1800px]">
                  <AnimatePresence mode="wait">
                    <BookPage pageIndex={pageIndex} direction={direction} />
                  </AnimatePresence>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                <div className="rounded-full border border-[#efcfdd] bg-white/65 px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-[#b07f98]">
                  storybook mode
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => turnPage(-1)}
                    disabled={pageIndex === 0}
                    className="rounded-full border border-[#ebcadb] bg-white/75 px-5 py-3 text-[11px] uppercase tracking-[0.26em] text-[#aa7791] disabled:cursor-default disabled:opacity-40"
                  >
                    prev
                  </button>
                  <button
                    type="button"
                    onClick={() => turnPage(1)}
                    disabled={pageIndex === spreads.length - 1}
                    className="rounded-full border border-[#efc3d8] bg-[linear-gradient(135deg,#f8dce8,#ffe9c9)] px-5 py-3 text-[11px] uppercase tracking-[0.26em] text-[#9b647f] shadow-[0_12px_30px_rgba(211,154,181,0.22)] disabled:cursor-default disabled:opacity-40"
                  >
                    next
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
