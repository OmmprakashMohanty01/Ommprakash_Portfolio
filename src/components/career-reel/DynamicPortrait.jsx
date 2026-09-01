import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

// 1. Custom GLSL Multi-State Shader
const fragmentShader = `
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform float uScroll;
  uniform vec2 uResolution;
  
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    
    // --- STATE 1: Hero (Clean, subtle breathing & fluid lens distortion) ---
    float breath = sin(uTime * 0.5) * 0.008;
    vec2 heroUv = uv + vec2(breath * sin(uv.y * 8.0), breath * cos(uv.x * 8.0));
    
    // --- STATE 2: Bento Grid / Tech (RGB Chromatic Split) ---
    // Activates as scroll moves past 20% of the page
    float glitchIntensity = smoothstep(0.15, 0.45, uScroll) * (1.0 - smoothstep(0.55, 0.85, uScroll));
    float rgbShift = sin(uTime * 8.0) * 0.02 * glitchIntensity;
    
    vec4 texColorHero = texture2D(uTexture, heroUv);
    
    // RGB Channel separation
    float r = texture2D(uTexture, heroUv + vec2(rgbShift, 0.0)).r;
    float g = texture2D(uTexture, heroUv).g;
    float b = texture2D(uTexture, heroUv - vec2(rgbShift, 0.0)).b;
    vec4 texColorGlitch = vec4(r, g, b, 1.0);

    // --- STATE 3: Timeline & Footer (Tactical Scanlines / Terminal Feed) ---
    // Activates as scroll reaches the bottom 30% of the page
    float scanlineIntensity = smoothstep(0.65, 1.0, uScroll);
    float scanline = sin(uv.y * uResolution.y * 1.5) * 0.05 * scanlineIntensity;
    vec4 texColorScan = texColorGlitch - vec4(scanline);

    // Blend states based on normalized scroll progress
    vec4 finalColor = mix(texColorHero, texColorGlitch, glitchIntensity);
    finalColor = mix(finalColor, texColorScan, scanlineIntensity);

    // Editorial dark vignette
    float vignette = length(uv - 0.5);
    finalColor.rgb -= vignette * 0.55;

    // Preserve dark aesthetic tone
    finalColor.rgb *= 0.85;

    gl_FragColor = finalColor;
  }
`;

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export default function DynamicPortrait() {
  const { viewport } = useThree();
  const materialRef = useRef();
  
  // Load custom portrait texture from /public/ommprakash-hero-edit.jpg
  const texture = useTexture('/ommprakash-hero-edit.jpg');
  
  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
    }),
    [texture]
  );

  useFrame(({ clock }) => {
    if (materialRef.current) {
      // Continuous fluid animation timer
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
      
      // Calculate normalized scroll position (0 = top, 1 = bottom)
      const scrollY = window.scrollY;
      const maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1);
      const normalizedScroll = Math.min(Math.max(scrollY / maxScroll, 0), 1);
      
      // Smoothly interpolate scroll uniform to prevent abrupt snapping
      materialRef.current.uniforms.uScroll.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uScroll.value,
        normalizedScroll,
        0.05
      );
    }
  });

  return (
    <mesh>
      {/* Fullscreen responsive plane */}
      <planeGeometry args={[viewport.width, viewport.height]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
      />
    </mesh>
  );
}
