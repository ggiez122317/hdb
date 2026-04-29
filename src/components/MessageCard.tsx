"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function MessageCard() {
  return (
    <section className="relative z-10 flex min-h-[85vh] items-center justify-center px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="grid w-full max-w-6xl gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center"
      >
        <div className="rounded-[34px] border border-white/70 bg-white/65 p-6 shadow-[0_30px_80px_rgba(207,157,181,0.18)] backdrop-blur-md md:p-8">
          <p className="text-[10px] uppercase tracking-[0.32em] text-[#c488a8]">
            Sweet note
          </p>
          <h2 className="mt-3 font-serif text-4xl italic text-[#82566f] md:text-5xl">
            Cute, but still heartfelt
          </h2>
          <p className="mt-5 text-sm leading-8 text-[#7b6671] md:text-[15px]">
            The new direction keeps the page playful, but the message still has
            room to feel sincere. Softer colors, prettier framing, and less
            heavy drama make the whole thing feel more personal.
          </p>

          <div className="mt-7 rounded-[26px] border border-[#f0d8e3] bg-[linear-gradient(180deg,rgba(255,255,255,0.8),rgba(255,246,250,0.88))] p-6">
            <p className="font-serif text-2xl italic leading-relaxed text-[#a05e84] md:text-3xl">
              &quot;A day this soft should belong to someone lovely.&quot;
            </p>
            <p className="mt-4 text-sm leading-7 text-[#866b78]">
              That is the whole energy now: sweet, warm, and intentional, with
              enough sparkle to feel special.
            </p>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[38px] border border-white/75 bg-[linear-gradient(135deg,rgba(255,252,255,0.82),rgba(255,241,246,0.8),rgba(242,248,255,0.78))] p-6 shadow-[0_32px_84px_rgba(198,143,170,0.18)]">
          <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-[#ffe0eb] blur-3xl" />
          <div className="absolute bottom-0 left-0 h-28 w-28 rounded-full bg-[#e2f1ff] blur-3xl" />
          <div className="relative flex flex-col gap-5 md:flex-row md:items-center">
            <div className="relative mx-auto h-52 w-52 flex-shrink-0 md:h-64 md:w-64">
              <motion.div
                animate={{ rotate: [-2, 2, -2], y: [0, -5, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full bg-[radial-gradient(circle,#fffefc,#fdeff6,#ece7ff)] shadow-[0_18px_50px_rgba(190,128,161,0.22)]"
              />
              <Image
                src="/bouquet.png"
                alt="Birthday bouquet"
                fill
                className="object-contain p-3"
              />
            </div>

            <div className="space-y-4">
              <div className="rounded-[20px] border border-white/80 bg-white/70 px-4 py-4">
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#bf88a2]">
                  upgraded mood
                </p>
                <p className="mt-2 text-sm leading-7 text-[#7d6673]">
                  Pastel glows, floating details, and storybook framing make the
                  uploaded florals feel like part of the design instead of just
                  decoration in the corners.
                </p>
              </div>

              <div className="flex gap-3">
                {["blush", "mint", "lavender"].map((tag) => (
                  <div
                    key={tag}
                    className="rounded-full border border-[#edd9e3] bg-white/75 px-4 py-2 text-[10px] uppercase tracking-[0.24em] text-[#a97991]"
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
