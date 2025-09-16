import React, { useState } from "react";
import HumanModel from "./HumanModel";

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
      <h1>3D Human Model Generator</h1>
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
        <label>
          Torso Length (cm):{" "}
          <input
            type="number"
            name="torso"
            value={params.torso}
            onChange={handleChange}
          />
        </label>
        <label>
          Leg Length (cm):{" "}
          <input
            type="number"
            name="legs"
            value={params.legs}
            onChange={handleChange}
          />
        </label>
      </div>
      <HumanModel {...params} />
    </div>
  );
}
