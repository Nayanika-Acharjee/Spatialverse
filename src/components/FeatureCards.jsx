import { motion } from "framer-motion";
import { FEATURES } from "../data/products";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const card = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

/** Feature cards that stagger into view on scroll and lift on hover. */
export default function FeatureCards() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-6 py-28" aria-labelledby="features-title">
      <h2 id="features-title" className="text-4xl font-semibold md:text-5xl">Features</h2>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="mt-12 grid gap-5 md:grid-cols-3"
      >
        {FEATURES.map((title) => (
          <motion.article
            key={title}
            variants={card}
            whileHover={{ y: -6 }}
            className="rounded-3xl bg-white p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
          >
            <h3 className="text-xl font-semibold">{title}</h3>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
