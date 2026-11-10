import { lazy, Suspense, useState } from "react";
import { MotionConfig } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeatureCards from "./components/FeatureCards";
import { COLORS } from "./data/products";

// The 3D sections pull in Three.js, so they load in a separate chunk;
// the hero text renders immediately while the 3D code downloads.
const ScrollShowcase = lazy(() => import("./components/ScrollShowcase"));
const ExploreViewer = lazy(() => import("./components/ExploreViewer"));

export default function App() {
  // Single source of truth for the colour, shared by both 3D canvases.
  const [color, setColor] = useState(COLORS[0].hex);

  return (
    // reducedMotion="user" makes Framer Motion respect the OS "reduce motion" setting.
    <MotionConfig reducedMotion="user">
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={<div className="h-[300vh]" aria-hidden="true" />}>
          <ScrollShowcase color={color} />
        </Suspense>
        <FeatureCards />
        <Suspense fallback={<div className="h-[520px]" aria-hidden="true" />}>
          <ExploreViewer color={color} onColorChange={setColor} />
        </Suspense>
      </main>
    </MotionConfig>
  );
}
