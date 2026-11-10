import { motion } from "framer-motion";

const LINKS = [
  { href: "#design", label: "Design" },
  { href: "#features", label: "Features" },
  { href: "#explore", label: "Explore" },
];

/** Fixed, translucent top bar that slides in on load. */
export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50 border-b border-black/5 bg-white/70 backdrop-blur-md"
    >
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6" aria-label="Main">
        <a href="#top" className="text-sm font-semibold tracking-wide">SpatialVerse</a>
        <ul className="flex gap-6 text-sm text-neutral-500">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="transition-colors hover:text-neutral-900">{l.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
  );
}
