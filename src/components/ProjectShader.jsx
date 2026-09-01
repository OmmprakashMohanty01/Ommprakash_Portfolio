import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform float uHover;
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  uniform vec2 uImageResolution;

  varying vec2 vUv;

  void main() {
    // Math for object-fit: cover
    vec2 uv = vUv;
    float aspect = uResolution.x / uResolution.y;
    float imgAspect = uImageResolution.x / uImageResolution.y;
    
    if (aspect > imgAspect) {
        float scale = imgAspect / aspect;
        uv.y = (uv.y - 0.5) * scale + 0.5;
    } else {
        float scale = aspect / imgAspect;
        uv.x = (uv.x - 0.5) * scale + 0.5;
    }

    // Distance from mouse to current pixel (adjusted for aspect ratio)
    vec2 st = gl_FragCoord.xy / uResolution.xy;
    st.y = 1.0 - st.y; // Flip Y for WebGL vs DOM coordinates
    
    // Adjust aspect ratio for distance calculation so the circle is perfectly round
    float aspect = uResolution.x / uResolution.y;
    vec2 mouse = uMouse;
    vec2 diff = st - mouse;
    diff.x *= aspect;
    
    float dist = length(diff);

    // Liquid bulge effect
    float radius = 0.3;
    float strength = 0.5 * uHover; // Only active when hovered
    
    // Smoothstep creates a soft boundary for the bulge
    float bulge = 1.0 - smoothstep(0.0, radius, dist);
    
    // Displace the UVs away from the center of the mouse
    vec2 dir = normalize(diff);
    uv -= dir * bulge * strength * (dist / radius);

    // Sample texture with distorted UVs
    vec4 tex = texture2D(uTexture, uv);
    gl_FragColor = tex;
  }
`;

const ShaderMesh = ({ imageSrc, hovered, mousePosition, resolution }) => {
  const meshRef = useRef();
  const materialRef = useRef();
  const texture = useTexture(imageSrc);

  const uniforms = useMemo(() => ({
    uTexture: { value: texture },
    uHover: { value: 0.0 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uResolution: { value: new THREE.Vector2(1, 1) },
    uImageResolution: { value: new THREE.Vector2(1, 1) }
  }), [texture]);

  useEffect(() => {
    if (texture) {
      uniforms.uImageResolution.value.set(texture.image.width, texture.image.height);
    }
  }, [texture, uniforms]);

  useFrame((state) => {
    if (!materialRef.current) return;
    
    // Smoothly interpolate hover state
    const targetHover = hovered ? 1.0 : 0.0;
    materialRef.current.uniforms.uHover.value = THREE.MathUtils.lerp(
      materialRef.current.uniforms.uHover.value, 
      targetHover, 
      0.1
    );

    // Smoothly interpolate mouse position
    materialRef.current.uniforms.uMouse.value.lerp(mousePosition.current, 0.1);
    
    // Update resolution
    materialRef.current.uniforms.uResolution.value.set(resolution.current.width, resolution.current.height);
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial 
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
      />
    </mesh>
  );
};

export default function ProjectShader({ image }) {
  const [hovered, setHovered] = React.useState(false);
  const containerRef = useRef(null);
  
  // Track mouse coordinates normalized [0, 1] relative to the container
  const mousePosition = useRef(new THREE.Vector2(0.5, 0.5));
  const resolution = useRef({ width: 1, height: 1 });

  const handlePointerMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mousePosition.current.set(x, y);
  };

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        resolution.current = { width: rect.width, height: rect.height };
      }
    };
    
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 w-full h-full z-0"
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onPointerMove={handlePointerMove}
    >
      <Canvas 
        frameloop="demand" 
        dpr={[1, 1.5]} 
        gl={{ alpha: true, antialias: false }}
        camera={{ position: [0, 0, 1], fov: 90 }} // Orthographic-like setup to fill screen
      >
        <React.Suspense fallback={null}>
          <ShaderMesh 
            imageSrc={image} 
            hovered={hovered} 
            mousePosition={mousePosition} 
            resolution={resolution} 
          />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
