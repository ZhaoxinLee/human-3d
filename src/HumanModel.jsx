import React, { useRef, useEffect } from "react";
import * as THREE from "three";

export default function HumanModel({ height, weight, torso, legs }) {
  const mountRef = useRef(null);
  const humanRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xaaaaaa);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      45,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 400;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 1).normalize();
    scene.add(light);

    buildHuman(scene, height, weight, torso, legs);

    const animate = () => {
      requestAnimationFrame(animate);
      if (humanRef.current) {
        humanRef.current.rotation.y += 0.01;
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      mount.removeChild(renderer.domElement);
    };
  }, []);

  useEffect(() => {
    if (sceneRef.current) {
      if (humanRef.current) {
        sceneRef.current.remove(humanRef.current);
      }
      buildHuman(sceneRef.current, height, weight, torso, legs);
    }
  }, [height, weight, torso, legs]);

  function buildHuman(scene, height, weight, torsoLength, legLength) {
    const group = new THREE.Group();
    const scale = height / 170;

    // Torso
    const torsoGeom = new THREE.BoxGeometry(40 * scale, torsoLength, 20 * scale);
    const torso = new THREE.Mesh(
      torsoGeom,
      new THREE.MeshStandardMaterial({ color: 0x88c })
    );
    torso.position.y = legLength;
    group.add(torso);

    // Legs
    const legGeom = new THREE.CylinderGeometry(8 * scale, 8 * scale, legLength, 16);
    const leftLeg = new THREE.Mesh(
      legGeom,
      new THREE.MeshStandardMaterial({ color: 0xc88 })
    );
    const rightLeg = leftLeg.clone();
    leftLeg.position.set(-10 * scale, legLength / 2, 0);
    rightLeg.position.set(10 * scale, legLength / 2, 0);
    group.add(leftLeg, rightLeg);

    // Head
    const headGeom = new THREE.SphereGeometry(20 * scale, 16, 16);
    const head = new THREE.Mesh(
      headGeom,
      new THREE.MeshStandardMaterial({ color: 0x8c8 })
    );
    head.position.y = legLength + torsoLength + 25 * scale;
    group.add(head);

    scene.add(group);
    humanRef.current = group;
  }

  return (
    <div
      ref={mountRef}
      style={{ width: "800px", height: "600px", margin: "auto" }}
    />
  );
}
