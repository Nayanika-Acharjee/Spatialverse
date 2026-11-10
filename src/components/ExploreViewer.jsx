import { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion";
import Headphones from "./Headphones";
import ProductStage from "./ProductStage";
import ColorPicker from "./ColorPicker";

/**
 * Interactive viewer: drag to rotate, scroll / pinch to zoom, pick a colour.
 * The canvas sits in a bounded panel so page scrolling still works outside it.
 */
export default function ExploreViewer({ color, onColorChange }) {
  const controls = useRef(null);

  return (
    <section id="explore" className="mx-auto max-w-6xl px-6 pb-28" aria-labelledby="explore-title">
      <div className="grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative h-[420px] overflow-hidden rounded-3xl bg-gradient-to-b from-white to-neutral-100 shadow-[0_8px_30px_rgba(0,0,0,0.06)] md:h-[520px]"
        >
          <Canvas camera={{ position: [0, 0.4, 5], fov: 40 }} dpr={[1, 2]} shadows>
            <Suspense fallback={null}>
              <ProductStage>
                <Headphones color={color} />
              </ProductStage>
            </Suspense>
            <OrbitControls ref={controls} enablePan={false} enableDamping minDistance={3} maxDistance={8} />
          </Canvas>

          <motion.button
            type="button"
            onClick={() => controls.current?.reset()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="absolute right-4 top-4 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-neutral-700 shadow-sm backdrop-blur focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            Reset view
          </motion.button>
          <p className="pointer-events-none absolute bottom-4 left-0 right-0 text-center text-xs text-neutral-400">
            Drag to rotate · Scroll or pinch to zoom
          </p>
        </motion.div>

        <div>
          <h2 id="explore-title" className="text-4xl font-semibold">Explore</h2>
          <div className="mt-8">
            <ColorPicker value={color} onChange={onColorChange} />
          </div>
        </div>
      </div>
    </section>
  );
}
