import React, { useRef, useEffect } from "react";
import { extend, useFrame } from "@react-three/fiber";
import {
  ShaderMaterial,
  Vector2,
  DataTexture,
  RGBAFormat,
  FloatType,
} from "three";

// fragment shader with time-based color oscillation and wavy distortion
const fragmentShader = `
  uniform float uTime;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;

    //  wavy distortion
    uv.x += sin(uTime*0.5 + uv.y * 2.0) * 0.01;
    uv.y += cos(uTime*0.5 + uv.x * 2.0) * 0.01;

    // Oscillating base colors
    float r = 0.5 + 0.5 * sin(uTime + uv.x*2.0);
    float g = 0.5 + 0.5 * sin(uTime + uv.y*2.5 + 1.0);
    float b = 0.5 + 0.5 * sin(uTime + (uv.x+uv.y)*2.0 + 2.0);

    vec3 baseColor = vec3(r, g, b);

    // Blend towards pastel (soft white)
    vec3 pastelColor = mix(baseColor, vec3(0.85, 0.85, 0.95), 0.4);


    gl_FragColor = vec4(pastelColor, 1.0);
}

`;
// Simple vertex shader to pass UVs
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

extend({ ShaderMaterial });

export default function ColorfulFog() {
  const simulationMaterialRef = useRef();
  const textureRef = useRef();

  useEffect(() => {
    // Initialize texture data
    const size = 512;
    const data = new Float32Array(size * size * 4); // RGBA

    // initialize with random colors
    for (let i = 0; i < data.length; i += 4) {
      data[i] = Math.random(); // Red
      data[i + 1] = Math.random(); // Green
      data[i + 2] = Math.random(); // Blue
      data[i + 3] = 1.0; // Alpha
    }

    // creates tex from raw data, w, h, format, type
    const texture = new DataTexture(data, size, size, RGBAFormat, FloatType);
    texture.needsUpdate = true; // Mark texture for GPU update
    textureRef.current = texture;
  }, []);

  // updating the time triggers re-render
  useFrame(() => {
    const simulationMaterial = simulationMaterialRef.current;
    if (simulationMaterial && textureRef.current) {
      // on each frame, update time uniform
      simulationMaterial.uniforms.uTime.value += 0.01;
    }
  });

  return (
    <mesh>
      <planeGeometry args={[16, 10]} />
      <shaderMaterial
        ref={simulationMaterialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTexture: { value: textureRef.current || null },
          uResolution: {
            value: new Vector2(window.innerWidth, window.innerHeight),
          },
          uTime: { value: 0 },
        }}
      />
    </mesh>
  );
}
