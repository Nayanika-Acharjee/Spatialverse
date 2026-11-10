import { ContactShadows } from "@react-three/drei";

/**
 * Shared lighting + soft floor shadow used by every 3D canvas,
 * so the product looks the same in the scroll story and the viewer.
 * Uses only local lights (no HDR download) to keep the page light.
 */
export default function ProductStage({ children }) {
  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 6, 5]} intensity={2.2} castShadow />
      <directionalLight position={[-5, 2, -3]} intensity={0.8} color="#93c5fd" />
      <pointLight position={[0, -2, 4]} intensity={0.6} color="#f9a8d4" />
      {children}
      <ContactShadows position={[0, -1.15, 0]} opacity={0.35} scale={6} blur={2.6} far={3} />
    </>
  );
}
