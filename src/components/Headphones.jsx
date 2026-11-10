import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Procedural 3D headphone model built from Three.js primitives
 * (no external model file needed).
 *
 * Props:
 * - color:  hex string for the body colour; changes are blended smoothly.
 * - motion: optional ref to { rotationY, rotationX, positionX, scale }.
 *           When given, the model follows those values (used by the GSAP
 *           scroll story). Without it, the model idles with a gentle sway.
 */
export default function Headphones({ color = "#1f2937", motion }) {
  const group = useRef();

  // One shared material per part so a colour change updates every mesh at once.
  const bodyMaterial = useMemo(
    () => new THREE.MeshPhysicalMaterial({ color, roughness: 0.35, metalness: 0.25, clearcoat: 0.6 }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const cushionMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#111827", roughness: 0.9 }),
    []
  );
  const metalMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#e5e7eb", roughness: 0.2, metalness: 1 }),
    []
  );
  const targetColor = useMemo(() => new THREE.Color(color), [color]);

  useFrame((state, delta) => {
    // Smooth colour transition instead of an instant swap.
    bodyMaterial.color.lerp(targetColor, 1 - Math.exp(-delta * 6));

    const g = group.current;
    if (!g) return;

    if (motion?.current) {
      const m = motion.current;
      const k = 1 - Math.exp(-delta * 8); // frame-rate independent easing
      g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, m.rotationY, k);
      g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, m.rotationX, k);
      g.position.x = THREE.MathUtils.lerp(g.position.x, m.positionX, k);
      const s = THREE.MathUtils.lerp(g.scale.x, m.scale, k);
      g.scale.setScalar(s);
    } else {
      // Idle sway for the interactive viewer.
      g.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.15;
    }
    // Subtle floating motion.
    g.position.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.05;
  });

  return (
    <group ref={group} dispose={null}>
      {/* Inner offset centres the model vertically (headband is taller than the cups). */}
      <group position={[0, -0.2, 0]}>
      {/* Headband: half torus arc */}
      <mesh material={bodyMaterial} position={[0, 0.15, 0]} castShadow>
        <torusGeometry args={[1.05, 0.09, 24, 96, Math.PI]} />
      </mesh>
      {/* Inner padding on the headband */}
      <mesh material={cushionMaterial} position={[0, 0.15, 0]}>
        <torusGeometry args={[0.97, 0.05, 16, 96, Math.PI]} />
      </mesh>

      {[-1, 1].map((side) => (
        <group key={side} position={[side * 1.05, -0.45, 0]}>
          {/* Metal slider connecting headband to the cup */}
          <mesh material={metalMaterial} position={[0, 0.4, 0]}>
            <cylinderGeometry args={[0.03, 0.03, 0.45, 16]} />
          </mesh>
          {/* Yoke ring */}
          <mesh material={metalMaterial} position={[0, 0.12, 0]} rotation={[0, Math.PI / 2, 0]}>
            <torusGeometry args={[0.36, 0.025, 12, 48, Math.PI]} />
          </mesh>
          {/* Ear cup shell */}
          <mesh material={bodyMaterial} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.42, 0.42, 0.28, 64]} />
          </mesh>
          {/* Outer metal accent ring */}
          <mesh material={metalMaterial} position={[side * 0.145, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
            <torusGeometry args={[0.3, 0.02, 12, 64]} />
          </mesh>
          {/* Ear cushion (inner side) */}
          <mesh material={cushionMaterial} position={[side * -0.17, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
            <torusGeometry args={[0.3, 0.1, 20, 64]} />
          </mesh>
        </group>
      ))}
      </group>
    </group>
  );
}
