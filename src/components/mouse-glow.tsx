"use client";

import React, { useEffect } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";

export function MouseGlow() {
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  // Add a spring for a smooth trailing effect
  const springX = useSpring(mouseX, { stiffness: 50, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 15 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Creates a dynamic glowing orb using CSS radial gradient
  const background = useMotionTemplate`radial-gradient(600px circle at ${springX}px ${springY}px, rgba(10, 102, 194, 0.12), transparent 60%)`;

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-50 transition-opacity duration-300"
      style={{ background }}
    />
  );
}
