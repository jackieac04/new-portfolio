import React, { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import FakeGlowMaterial from "./FakeGlowMaterial.js";

export default function Firefly({
  light = true,
  bodyColor = 0xfff09c,
  lightColor = 0x00ffa5,
  initialPosition = [0, 0, 0],
  allFireflies,
}) {
  const groupRef = useRef(null);
  const pointLightRef = useRef(null);

  const SPEED = 0.01; // Constant speed
  const REPULSION_RADIUS = 0.2; // Repulsion radius to avoid clumping
  const BOUNDARY = 10; // Screen boundary in world units

  const velocity = useRef(
    new THREE.Vector3(
      (Math.random() - 0.5) * 0.02 + 0.01,
      (Math.random() - 0.5) * 0.02 + 0.01,
      0
    )
  ); // Start with zero velocity

  // Firefly setup
  useEffect(() => {
    if (!groupRef.current) return;

    const group = groupRef.current;
    const scale = 0.05;

    // Body
    const flyGeometry = new THREE.SphereGeometry(Math.random() * 5, 32, 16);
    const flyMaterial = new FakeGlowMaterial();
    const body = new THREE.Mesh(flyGeometry, flyMaterial);
    group.add(body);

    if (light) {
      const pointLight = new THREE.PointLight(lightColor, 0.5, 10);
      pointLight.position.set(0, -0.5, 0);
      pointLightRef.current = pointLight;
      group.add(pointLight);
    }

    group.position.set(...initialPosition);
    group.scale.set(scale, scale, scale);

    // Cleanup
    return () => {
      flyGeometry.dispose();
      flyMaterial.dispose();
    };
  }, [bodyColor, lightColor, light, initialPosition]);

  // Animation logic
  useFrame(() => {
    if (!groupRef.current) return;

    const group = groupRef.current;
    const position = group.position;

    // Stay within screen boundaries
    if (position.x > BOUNDARY || position.x < 0) {
      velocity.current = new THREE.Vector3(
        -velocity.current.x,
        velocity.current.y,
        0
      );
    }
    if (position.y > BOUNDARY || position.y < 0) {
      velocity.current = new THREE.Vector3(
        velocity.current.x,
        -velocity.current.y,
        0
      );
    }
    // Ensure constant speed by normalizing the velocity vector
    velocity.current.normalize().multiplyScalar(SPEED);

    // Add separation force to avoid clumping
    allFireflies?.forEach((other) => {
      if (other !== group && other.position) {
        const distance = position.distanceTo(other.position);
        if (distance < REPULSION_RADIUS) {
          const repulsion = new THREE.Vector3()
            .subVectors(position, other.position)
            .normalize()
            .multiplyScalar((REPULSION_RADIUS - distance) * 0.01); // Repulsion force strength
          velocity.current.add(repulsion);
        }
      }
    });

    // Update position based on velocity
    position.add(velocity.current);

    // Update light intensity for pulsation
    if (pointLightRef.current) {
      const time = Date.now() * 0.001;
      pointLightRef.current.intensity = 0.5 + Math.sin(time * 2) * 0.2;
    }
  });

  return <group ref={groupRef} />;
}
