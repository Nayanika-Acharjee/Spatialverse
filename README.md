<<<<<<< HEAD
# Spatialverse
=======
# SpatialVerse — Interactive 3D Product Experience

An Apple-style product landing page for a concept headphone, **Aura One**, focused on 3D and motion.

- **Rotate and zoom** the headphone in 3D (drag, scroll or pinch inside the viewer), with a **Reset view** button
- **Scroll story:** the product rotates and moves while text steps fade in and out (GSAP ScrollTrigger)
- **Colour picker:** the 3D material blends smoothly to the chosen colour, shared across both scenes
- **Feature cards** stagger into view and lift on hover (Framer Motion)
- Light, Apple-style theme so the product stands out

**Tech stack:** React.js, Vite, Three.js, React Three Fiber, @react-three/drei, GSAP + ScrollTrigger, Framer Motion, Tailwind CSS v4

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run preview  # serve the production build
```

## Deploy (Vercel)

1. Push this folder to a GitHub repository.
2. On vercel.com, choose **Add New → Project**, import the repo, and keep the detected **Vite** settings (build: `npm run build`, output: `dist`).
3. Click **Deploy**.

## Project structure

```
src/
├── App.jsx                    # Page layout; owns the selected colour (shared state)
├── main.jsx / index.css       # Entry point + Tailwind setup
├── data/products.js           # Colours, feature titles and scroll-story text
└── components/
    ├── Headphones.jsx         # Procedural 3D model (Three.js primitives)
    ├── ProductStage.jsx       # Shared lights + contact shadow for every canvas
    ├── ScrollShowcase.jsx     # Sticky canvas + scrubbed GSAP ScrollTrigger timeline
    ├── ExploreViewer.jsx      # Interactive viewer (OrbitControls) + colour picker
    ├── ColorPicker.jsx        # Accessible radio-group swatches with Framer Motion
    ├── FeatureCards.jsx       # Staggered whileInView feature grid
    ├── Hero.jsx / Navbar.jsx
```

## Components

| Component | Props | Notes |
|---|---|---|
| `Headphones` | `color` (hex), `motion` (optional ref) | With `motion`, follows `{ rotationY, rotationX, positionX, scale }` set by GSAP; without it, idles with a gentle sway. Colour changes are lerped every frame. |
| `ProductStage` | `children` | Lighting and floor shadow, so all scenes look the same. |
| `ScrollShowcase` | `color` | 300vh section with a sticky canvas; one scrubbed timeline animates the model and the text steps. |
| `ExploreViewer` | `color`, `onColorChange` | Bounded canvas with `OrbitControls` (zoom limited to 3–8 units, pan disabled); **Reset view** calls `controls.reset()`. |
| `ColorPicker` | `value`, `onChange` | `role="radiogroup"`; the active ring animates between swatches using a shared `layoutId`. |
| `FeatureCards` | none | Reads `FEATURES` from `data/products.js`. |

## Design decisions

- **GSAP for scroll, Framer Motion for UI.** GSAP's scrubbed timelines suit scroll-linked 3D motion; Framer Motion handles component-level micro-interactions (hover, tap, enter-on-view, shared layout).
- **GSAP animates a plain object, not the mesh.** The timeline tweens `{ rotationY, positionX, … }`, and the model eases toward those values in `useFrame`. This keeps React rendering and the WebGL frame loop decoupled, and stays smooth even when scroll input is jumpy.
- **Procedural model.** Built from torus and cylinder primitives, so there's no model download and colour swaps are a single shared material.
- **Bounded interactive canvas.** Zoom lives in its own panel, so the mouse wheel only zooms inside the viewer and scrolls the page everywhere else.

## Performance and accessibility

- **Code-splitting:** the 3D sections are lazy-loaded with `React.lazy`, so Three.js downloads separately (initial JS ≈ 115 kB gzipped).
- **Rendering:** device pixel ratio is capped at 2 (`dpr={[1, 2]}`), and there's no HDR environment download (local lights only).
- **Reduced motion:** `MotionConfig reducedMotion="user"` respects the OS setting, and the scroll timeline is skipped (text shown statically) when reduced motion is on.
- **Semantics:** landmark sections and labelled regions, plus keyboard-focusable colour swatches with a visible focus ring.
>>>>>>> d342df7 (spatialverse)
