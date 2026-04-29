"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <section className="relative z-10 flex min-h-[55vh] items-center justify-center px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="flex max-w-2xl flex-col items-center rounded-[34px] border border-white/75 bg-white/60 px-8 py-10 text-center shadow-[0_24px_70px_rgba(198,147,172,0.16)] backdrop-blur-md"
      >
        <div className="h-[1px] w-16 bg-[linear-gradient(90deg,transparent,#d88cab,transparent)]" />
        <h2 className="mt-6 font-serif text-4xl italic text-[#86586f] md:text-5xl">
          Keep the soft magic.
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-8 text-[#7d6772]">
          The page now opens like a gift, turns like a tiny book, and gives the
          floral asset a much cuter place to live.
        </p>
        <div className="mt-8 flex gap-3">
          {[0, 1, 2].map((item) => (
            <motion.div
              key={item}
              animate={{ y: [0, -6, 0], opacity: [0.35, 0.9, 0.35] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: item * 0.2,
              }}
              className="h-3 w-3 rounded-full bg-[linear-gradient(135deg,#f3b3ca,#fce6a7)]"
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
