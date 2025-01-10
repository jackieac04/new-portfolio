import React, { useRef, useEffect } from "react";
import { extend, useFrame } from "@react-three/fiber";
import {
  ShaderMaterial,
  Vector2,
  DataTexture,
  RGBAFormat,
  FloatType,
} from "three";

// Shader code (GLSL)
const fragmentShader = `
  uniform sampler2D uTexture;
  uniform vec2 uResolution;
  uniform float uTime;
  varying vec2 vUv;

  void main() {
    // Add time-based distortion to UVs
    vec2 uv = vUv;
    uv.x += sin(uTime + uv.y * 10.0) * 0.02; // Horizontal wave
    uv.y += cos(uTime + uv.x * 10.0) * 0.02; // Vertical wave

    // Sample texture color
    vec4 texColor = texture2D(uTexture, uv);

    // If no texture is available, default to a colorful gradient
    if (texColor.a == 0.0) {
      texColor = vec4(uv.x, uv.y, sin(uTime) * 0.5 + 0.5, 1.0);
    }

    gl_FragColor = texColor;
  }
`;

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

    for (let i = 0; i < data.length; i += 4) {
      data[i] = Math.random(); // Red
      data[i + 1] = Math.random(); // Green
      data[i + 2] = Math.random(); // Blue
      data[i + 3] = 1.0; // Alpha
    }

    const texture = new DataTexture(data, size, size, RGBAFormat, FloatType);
    texture.needsUpdate = true; // Mark texture for GPU update
    textureRef.current = texture;
  }, []);

  useFrame(() => {
    const simulationMaterial = simulationMaterialRef.current;
    if (simulationMaterial && textureRef.current) {
      simulationMaterial.uniforms.uTime.value += 0.01;

      // Optionally, animate the texture for more dynamic behavior

      const data = textureRef.current.image.data;
      for (let i = 0; i < data.length; i += 4) {
        data[i] = (Math.sin(data[i] + 0.01) + 1.0) * 0.5; // Example: Red channel
      }
      textureRef.current.needsUpdate = true;
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
