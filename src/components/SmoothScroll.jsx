"use client";
import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";

const SmoothScroll = ({ children }) => {
  return (
    <ReactLenis
      root
      options={{ lerp: 0.1, duration: 1.2, syncTouch: false, autoRaf: true }}
    >
      {children}
    </ReactLenis>
  );
};

export default SmoothScroll;
