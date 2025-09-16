import React from "react";
import { useGLTF } from "@react-three/drei";

export default function Human({ height, weight }) {
  const { scene } = useGLTF("/models/human.glb");

  // Normalize scaling
  const scaleY = height / 170; // base 170 cm
  const scaleXZ = weight / 70; // base 70 kg
  scene.scale.set(scaleXZ, scaleY, scaleXZ);

  return <primitive object={scene} />;
}
