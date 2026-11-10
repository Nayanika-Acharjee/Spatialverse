import { Suspense, useLayoutEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Headphones from "./Headphones";
import ProductStage from "./ProductStage";
import { STORY_STEPS } from "../data/products";

gsap.registerPlugin(ScrollTrigger);

/**
 * Apple-style scroll story: the canvas is sticky while the section scrolls,
 * and a scrubbed GSAP timeline drives the headphone's rotation, position and
 * scale plus the fade-in/out of each text step.
 */
export default function ScrollShowcase({ color }) {
  const section = useRef(null);
  const reduceMotion = useReducedMotion();
  // Plain object animated by GSAP and read every frame by the 3D model.
  // With reduced motion the model stays to the right of the static text column.
  const motion = useRef(
    reduceMotion
      ? { rotationY: -0.5, rotationX: 0.15, positionX: 1.3, scale: 0.85 }
      : { rotationY: -0.4, rotationX: 0.15, positionX: 0, scale: 1 }
  );

  useLayoutEffect(() => {
    if (reduceMotion) return undefined;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      // Step 1 -> side view, product moves right.
      tl.to(motion.current, { rotationY: Math.PI / 2, rotationX: 0, positionX: 1.2, scale: 1.1, duration: 1 })
        .fromTo(".story-step-0", { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.4 }, 0)
        .to(".story-step-0", { autoAlpha: 0, y: -40, duration: 0.3 }, 0.8)
        // Step 2 -> back view, product moves left.
        .to(motion.current, { rotationY: Math.PI, rotationX: 0.25, positionX: -1.2, scale: 1.2, duration: 1 })
        .fromTo(".story-step-1", { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.4 }, 1.1)
        .to(".story-step-1", { autoAlpha: 0, y: -40, duration: 0.3 }, 1.8)
        // Final turn -> centred and larger (no text on screen).
        .to(motion.current, { rotationY: Math.PI * 2 - 0.4, rotationX: 0.15, positionX: 0, scale: 1.3, duration: 1 });
    }, section);

    return () => ctx.revert();
  }, [reduceMotion]);

  return (
    <section ref={section} id="design" className="relative h-[300vh]" aria-label="Product design story">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="absolute inset-0">
          <Canvas camera={{ position: [0, 0.3, 5], fov: 40 }} dpr={[1, 2]} shadows>
            <Suspense fallback={null}>
              <ProductStage>
                <Headphones color={color} motion={motion} />
              </ProductStage>
            </Suspense>
          </Canvas>
        </div>

        {/* Text steps; with reduced motion they are all shown statically. */}
        <div
          className={`pointer-events-none relative mx-auto w-full max-w-6xl px-6 ${
            reduceMotion ? "flex flex-col gap-10" : "grid"
          }`}
        >
          {STORY_STEPS.map((step, i) => (
            <div
              key={step}
              className={`story-step-${i} max-w-sm ${
                reduceMotion ? "" : "invisible col-start-1 row-start-1"
              } ${i === 1 && !reduceMotion ? "justify-self-end text-right" : ""}`}
            >
              <h2 className="text-4xl font-semibold leading-tight md:text-6xl">{step}</h2>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
