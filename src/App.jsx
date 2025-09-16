import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Human from "./Human";

export default function App() {
  const [params, setParams] = useState({
    height: 170,
    weight: 70,
    torso: 60,
    legs: 80,
  });

  const handleChange = (e) => {
    setParams({
      ...params,
      [e.target.name]: parseFloat(e.target.value),
    });
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>3D Human Model Generator (React Three Fiber)</h1>
      <div style={{ marginBottom: "10px" }}>
        <label>
          Height (cm):{" "}
          <input
            type="number"
            name="height"
            value={params.height}
            onChange={handleChange}
          />
        </label>
        <label>
          Weight (kg):{" "}
          <input
            type="number"
            name="weight"
            value={params.weight}
            onChange={handleChange}
          />
        </label>
      </div>

      <Canvas style={{ width: "800px", height: "600px" }} camera={{ position: [0, 2, 5] }}>
        <ambientLight />
        <directionalLight position={[5, 5, 5]} />
        <Human {...params} />
        <OrbitControls />
      </Canvas>
    </div>
  );
}
