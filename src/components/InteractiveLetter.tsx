"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export default function InteractiveLetter() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="relative flex min-h-screen w-full items-center justify-center px-6 py-20 z-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="flex w-full max-w-lg flex-col items-center"
      >
        <p className="mb-2 text-[10px] uppercase tracking-[0.25em] text-gold">
          Scene 04
        </p>
        <h2 className="mb-4 font-serif text-3xl font-light italic text-[#d8d0c0] md:text-5xl">
          The quiet ending
        </h2>
        <p className="mb-12 max-w-md text-center text-sm leading-7 text-[#9d917d]">
          One last interactive beat so the page finishes with a reveal instead
          of just fading out.
        </p>

        <div
          className="group relative h-[200px] w-[280px] cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          <div className="absolute inset-0 rounded-lg border border-gold/30 bg-gold/10 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
            <motion.div
              className="absolute left-0 top-0 z-20 h-full w-full origin-top"
              initial={false}
              animate={{ rotateX: isOpen ? -165 : 0 }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div
                className="absolute inset-0 rounded-t-lg border border-gold/20 bg-bg-dark/40"
                style={{ clipPath: "polygon(0 0, 50% 60%, 100% 0)" }}
              />
            </motion.div>

            <motion.div
              animate={{ opacity: isOpen ? 0 : 1, scale: isOpen ? 0.5 : 1 }}
              className="absolute left-1/2 top-[30%] z-30 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold/40 bg-gold/20 text-xs text-gold"
            >
              *
            </motion.div>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ y: 0, opacity: 0, scale: 0.9 }}
                  animate={{ y: -120, opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="glass absolute inset-x-4 top-4 z-10 rounded-xl p-8"
                >
                  <div className="flex flex-col items-center text-center">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1, duration: 1 }}
                      className="mb-4"
                    >
                      <Image
                        src="/flowers.png"
                        alt="Flowers"
                        width={100}
                        height={100}
                        className="drop-shadow-[0_4px_16px_rgba(201,169,110,0.3)]"
                      />
                    </motion.div>
                    <h3 className="mb-4 font-serif text-lg italic text-[#c8c0b0]">
                      Okay, real talk
                    </h3>
                    <p className="text-sm leading-[1.9] text-text-muted">
                      I&apos;m glad you&apos;re here, and I hope this year feels
                      a little more like yours.
                    </p>
                    <p className="mt-6 text-[11px] uppercase tracking-widest text-[#3a3530]">
                      signed, with intention
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {!isOpen && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-12 rounded-full border border-gold/30 px-6 py-2 text-[10px] uppercase tracking-[0.2em] text-gold transition-all hover:bg-gold/10"
            onClick={() => setIsOpen(true)}
          >
            Open the letter
          </motion.button>
        )}
      </motion.div>
    </section>
  );
}
