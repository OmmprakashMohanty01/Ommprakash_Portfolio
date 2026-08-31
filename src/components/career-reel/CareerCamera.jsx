import React, { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CareerCamera({ isMobile }) {
  const { camera } = useThree();
  const tl = useRef();

  useEffect(() => {
    // Reset camera position
    camera.position.set(0, 0, 5);
    camera.rotation.set(0, 0, 0);

    // Create a GSAP timeline that drives the camera
    tl.current = gsap.timeline({
      scrollTrigger: {
        trigger: "#work", // The BentoGrid section
        start: "top center", 
        end: "bottom top",
        scrub: 1, // Smooth scrubbing
      }
    });

    // We know project z-positions are roughly: 
    // SportSense: -10
    // BrandingEngine: -25
    // ZeroOne: -40

    // STATE 01 -> 02: PUSH to SportSense
    tl.current.to(camera.position, {
      z: -7, // Stop a bit before -10
      ease: "power1.inOut",
      duration: 1
    });

    // STATE 03 -> 04: TRANSITION to Branding Engine
    tl.current.to(camera.position, {
      z: -22,
      x: 2, // Slight pan
      ease: "power1.inOut",
      duration: 1
    });
    
    // Pan rotation
    tl.current.to(camera.rotation, {
      y: 0.1,
      duration: 1
    }, "<");

    // STATE 04 -> 05: PULL to ZERO ONE
    tl.current.to(camera.position, {
      z: -35,
      x: 10, // Match ZeroOne x pos
      ease: "power2.inOut",
      duration: 1
    });

    tl.current.to(camera.rotation, {
      y: 0,
      duration: 1
    }, "<");

    return () => {
      if (tl.current) {
        tl.current.scrollTrigger?.kill();
        tl.current.kill();
      }
    };
  }, [camera, isMobile]);

  return null;
}
