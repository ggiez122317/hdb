"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Gallery() {
  return (
    <section className="relative z-10 flex min-h-[90vh] items-center justify-center px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-6xl"
      >
        <div className="mb-10 text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#c488a8]">
            Memory spotlight
          </p>
          <h2 className="mt-3 font-serif text-4xl italic text-[#85586f] md:text-5xl">
            One image, framed like a keepsake
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-8 text-[#7e6974]">
            Instead of a row of tiny cards, this section holds one featured
            image moment and lets it breathe.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div className="relative overflow-hidden rounded-[40px] border border-white/75 bg-[linear-gradient(180deg,rgba(255,255,255,0.85),rgba(255,245,249,0.88))] p-5 shadow-[0_36px_90px_rgba(190,139,163,0.18)]">
            <div className="absolute inset-x-10 top-5 h-12 rounded-full bg-white/75 blur-2xl" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[30px] border border-[#eed8e1] bg-[linear-gradient(180deg,#fff8fb,#fdf0f6)] p-4">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.8),transparent_40%)]" />
              <Image
                src="/bouquet.png"
                alt="Placeholder artwork"
                fill
                className="object-contain p-8 opacity-85"
              />
              <div className="absolute inset-x-6 bottom-6 rounded-[22px] border border-white/70 bg-white/78 px-5 py-4 text-center shadow-lg backdrop-blur-sm">
                <p className="text-[10px] uppercase tracking-[0.28em] text-[#b68199]">
                  Featured photo placeholder
                </p>
                <p className="mt-2 font-serif text-xl italic text-[#85596f]">
                  Swap this with your uploaded memory
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="rounded-[30px] border border-white/75 bg-white/65 p-6 shadow-[0_28px_64px_rgba(196,148,171,0.16)]">
              <p className="text-[10px] uppercase tracking-[0.28em] text-[#c488a8]">
                why this is better
              </p>
              <h3 className="mt-3 font-serif text-3xl italic text-[#85586f]">
                It feels like a page, not a template
              </h3>
              <p className="mt-4 text-sm leading-8 text-[#7d6773]">
                One large frame gives the design somewhere to pause. It reads
                more like a gift page in a book and less like a placeholder
                gallery waiting to be filled.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[24px] border border-[#efd9e5] bg-[linear-gradient(180deg,rgba(255,255,255,0.8),rgba(255,247,251,0.88))] p-5">
                <p className="text-[10px] uppercase tracking-[0.26em] text-[#bc84a0]">
                  frame style
                </p>
                <p className="mt-2 text-sm leading-7 text-[#816a76]">
                  Soft matte border, light bloom, delicate overlay.
                </p>
              </div>
              <div className="rounded-[24px] border border-[#e4def0] bg-[linear-gradient(180deg,rgba(255,255,255,0.8),rgba(248,245,255,0.88))] p-5">
                <p className="text-[10px] uppercase tracking-[0.26em] text-[#9a7db4]">
                  page mood
                </p>
                <p className="mt-2 text-sm leading-7 text-[#7e6f86]">
                  Pastel, polished, and cute without becoming childish.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
