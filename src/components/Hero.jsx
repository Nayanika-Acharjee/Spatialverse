import { motion } from "framer-motion";

/** Opening section: one headline with a Framer Motion entrance. */
export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.10),transparent_60%)]" />
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-4xl text-5xl font-semibold leading-tight md:text-7xl"
      >
        Introducing the Next Gen Headphones
      </motion.h1>
      <motion.span
        aria-hidden="true"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
        className="absolute bottom-10 text-neutral-400"
      >
        ↓
      </motion.span>
    </section>
  );
}
