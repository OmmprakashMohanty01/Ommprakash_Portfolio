import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

const ParticleShader = {
  uniforms: {
    uTexture: { value: null },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uTime: { value: 0 }
  },
  vertexShader: `
    uniform vec2 uMouse;
    uniform float uTime;
    varying vec2 vUv;
    varying float vDistance;

    void main() {
      vUv = uv;
      vec3 pos = position;
      
      // Calculate distance from mouse to vertex in UV space
      float dist = distance(uv, uMouse);
      vDistance = dist;
      
      // Magnetic repel effect (particles push outward and swirl)
      float effect = smoothstep(0.25, 0.0, dist);
      pos.z += effect * 2.2; 
      pos.x += sin(uTime * 2.0 + pos.y * 8.0) * effect * 0.45;
      pos.y += cos(uTime * 2.0 + pos.x * 8.0) * effect * 0.45;

      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      gl_Position = projectionMatrix * mvPosition;
      
      // Dynamic point size based on Z-depth
      gl_PointSize = (16.0 * (1.0 + effect * 1.5)) / -mvPosition.z;
    }
  `,
  fragmentShader: `
    uniform sampler2D uTexture;
    varying vec2 vUv;
    varying float vDistance;

    void main() {
      // Sample original balcony photo color
      vec4 color = texture2D(uTexture, vUv);
      
      // Soft circular point shape
      vec2 coord = gl_PointCoord - vec2(0.5);
      if (length(coord) > 0.5) discard;
      if (color.a < 0.05) discard;
      
      // Subtle cyan rim highlight when repelled by cursor
      float repelGlow = smoothstep(0.25, 0.0, vDistance);
      color.rgb += vec3(0.0, 0.95, 1.0) * repelGlow * 0.3;
      
      gl_FragColor = color;
    }
  `
};

export default function ContactParticles() {
  const meshRef = useRef();
  const texture = useTexture('/balcony-night.jpg');
  
  // High-density 200x200 resolution grid of vertices
  const geometry = useMemo(() => new THREE.PlaneGeometry(4.5, 7.8, 200, 200), []);

  useFrame(({ clock, pointer }) => {
    if (meshRef.current && meshRef.current.material) {
      meshRef.current.material.uniforms.uTime.value = clock.getElapsedTime();
      
      // Smoothly map cursor pointer coordinates (-1 to 1) to UV space (0 to 1)
      const targetMouse = new THREE.Vector2(
        (pointer.x + 1) / 2, 
        (pointer.y + 1) / 2
      );
      meshRef.current.material.uniforms.uMouse.value.lerp(targetMouse, 0.08);
    }
  });

  return (
    <points ref={meshRef} geometry={geometry} position={[0, 0, 0]}>
      <shaderMaterial 
        args={[ParticleShader]} 
        uniforms-uTexture-value={texture}
        transparent
        depthWrite={false}
      />
    </points>
  );
}
