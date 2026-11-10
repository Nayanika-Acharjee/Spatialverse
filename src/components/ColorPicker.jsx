import { motion } from "framer-motion";
import { COLORS } from "../data/products";

/**
 * Colour swatches with Framer Motion micro-interactions.
 * The active ring slides between swatches using a shared layoutId.
 */
export default function ColorPicker({ value, onChange }) {
  const active = COLORS.find((c) => c.hex === value);

  return (
    <div>
      <p className="mb-3 text-sm text-neutral-500">
        Colour: <span className="font-medium text-neutral-900">{active?.name}</span>
      </p>
      <div className="flex gap-3" role="radiogroup" aria-label="Headphone colour">
        {COLORS.map((c) => {
          const selected = c.hex === value;
          return (
            <motion.button
              key={c.hex}
              type="button"
              role="radio"
              aria-checked={selected}
              aria-label={c.name}
              onClick={() => onChange(c.hex)}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              className="relative h-9 w-9 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <span className="absolute inset-1 rounded-full border border-black/10" style={{ backgroundColor: c.hex }} />
              {selected && (
                <motion.span
                  layoutId="color-ring"
                  className="absolute inset-0 rounded-full border-2 border-neutral-900"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
