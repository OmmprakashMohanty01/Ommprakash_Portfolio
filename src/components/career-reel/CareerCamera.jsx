import React, { useEffect, useRef, useMemo } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * CareerCamera — Dual-mode camera controller
 * 
 * Mode 'flat':     GSAP ScrollTrigger drives the camera along the career track (existing behavior).
 * Mode 'revealed': Camera lerps to a CatmullRomCurve3 spline for the fly-through.
 * 
 * The transition between modes is driven by `transitionProgress` (a MotionValue, 0→1).
 * During the transition, we smoothly interpolate from wherever the GSAP camera is
 * to the start of the spline, creating the "pull-back into the void" effect.
 */
export default function CareerCamera({ isMobile, mode, transitionProgress }) {
  const { camera } = useThree();
  const gsapTimelines = useRef([]);
  const splineProgress = useRef(0);

  // The fly-through spline (same geometry as the old DioramaCamera)
  const splinePath = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 1.5, 12),
      new THREE.Vector3(-6, 2.5, 0),
      new THREE.Vector3(0, 1.5, -15),
      new THREE.Vector3(6, 0.5, -30),
      new THREE.Vector3(0, 1.5, -45),
    ]);
  }, []);

  // Store the camera position at the moment the transition starts
  const flatCameraSnapshot = useRef(new THREE.Vector3(0, 0, 5));
  const flatRotationSnapshot = useRef(new THREE.Euler(0, 0, 0));
  const hasSnapshotted = useRef(false);

  // Reusable vectors to avoid GC pressure
  const _lookTarget = useRef(new THREE.Vector3());

  // --- GSAP ScrollTrigger setup (flat mode) ---
  useEffect(() => {
    // Only set up GSAP timelines in flat mode
    if (mode === 'revealed') return;

    // Reset camera
    camera.position.set(0, 0, 5);
    camera.rotation.set(0, 0, 0);
    hasSnapshotted.current = false;

    // Hero intro: z=5 → z=-7
    const heroTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: 1,
      }
    });
    heroTl.to(camera.position, { z: -7, ease: "power1.inOut" });

    // Work sequence: SportSense → BrandingEngine → ZeroOne
    const workTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#work",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      }
    });

    // Part 1: SportSense → BrandingEngine
    workTl.to(camera.position, { z: -22, x: 2, ease: "power1.inOut", duration: 1 });
    workTl.to(camera.rotation, { y: 0.1, duration: 1 }, "<");

    // Part 2: BrandingEngine → ZeroOne
    workTl.to(camera.position, { z: -35, x: 10, ease: "power2.inOut", duration: 1 });
    workTl.to(camera.rotation, { y: 0, duration: 1 }, "<");

    gsapTimelines.current = [heroTl, workTl];

    return () => {
      gsapTimelines.current.forEach(tl => {
        tl.scrollTrigger?.kill();
        tl.kill();
      });
      gsapTimelines.current = [];
    };
  }, [camera, isMobile, mode]);

  // --- Per-frame update ---
  useFrame((state, delta) => {
    if (!transitionProgress) return;

    const progress = typeof transitionProgress.get === 'function' 
      ? transitionProgress.get() 
      : 0;

    // In flat mode with no transition happening, GSAP handles everything
    if (mode === 'flat' && progress === 0) return;

    // Snapshot the camera position when transition begins
    if (progress > 0 && !hasSnapshotted.current) {
      flatCameraSnapshot.current.copy(camera.position);
      flatRotationSnapshot.current.copy(camera.rotation);
      hasSnapshotted.current = true;
    }

    // During transition or in revealed mode:
    // Interpolate between the flat snapshot and the spline start based on progress
    if (progress > 0) {
      // Kill GSAP control during transition
      gsapTimelines.current.forEach(tl => {
        if (tl.scrollTrigger) tl.scrollTrigger.disable();
      });

      // Target position on the spline
      // During transition (0→1): lerp from snapshot to spline start
      // In revealed mode (progress === 1): drive along spline
      const splineT = mode === 'revealed' ? splineProgress.current : 0;
      const splinePos = splinePath.getPointAt(Math.min(Math.max(splineT, 0), 1));

      // Blend between flat snapshot and spline position
      const blendedPos = new THREE.Vector3().lerpVectors(
        flatCameraSnapshot.current,
        splinePos,
        progress
      );

      camera.position.lerp(blendedPos, 0.08);

      // Look-at: blend between original forward and spline look-ahead
      const lookAheadT = Math.min(splineT + 0.05, 1);
      const splineLookAt = splinePath.getPointAt(lookAheadT);

      // In flat mode, the original look-at is just forward along z
      const flatLookAt = new THREE.Vector3(
        flatCameraSnapshot.current.x,
        flatCameraSnapshot.current.y,
        flatCameraSnapshot.current.z - 10
      );

      _lookTarget.current.lerpVectors(flatLookAt, splineLookAt, progress);
      camera.lookAt(_lookTarget.current);
    }

    // In revealed mode, slowly advance along the spline (ambient drift)
    if (mode === 'revealed') {
      splineProgress.current += delta * 0.02; // Very slow ambient crawl
      if (splineProgress.current > 1) splineProgress.current = 0; // Loop
    }
  });

  return null;
}
