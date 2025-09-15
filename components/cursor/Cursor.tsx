"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCursor } from "./CursorProvider";

// Clamp utility
const clamp = (n: number, min: number, max: number) => Math.min(Math.max(n, min), max);

export const Cursor: React.FC<{ visibleOnTouch?: boolean }> = ({ visibleOnTouch = false }) => {
  const { pos, vel, pressed, hovering } = useCursor();

  const speed = Math.hypot(vel.x, vel.y);
  const scale = clamp(1 + Math.min(speed * 0.03, 0.6) + (pressed ? 0.25 : 0), 0.8, 2.2);
  const hoverScale = hovering === "none" ? 1 : 1.25;

  return (
    <>
      {/* Hide native cursor globally */}
      <style jsx global>{`
        html,
        body {
          cursor: ${visibleOnTouch ? "none" : "none"};
        }
        @media (hover: none) and (pointer: coarse) {
          html,
          body {
            cursor: auto;
          }
        }
      `}</style>

      <AnimatePresence>
        <motion.div
          key="custom-cursor"
          aria-hidden
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            x: pos.x,
            y: pos.y,
            scale: scale * hoverScale,
            opacity: 1,
          }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            mass: 1,
          }}
          style={{
            position: "fixed",
            left: 0,
            top: 0,
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            boxShadow: "0 0 20px rgba(0,0,0,0.1)",
            pointerEvents: "none",
            zIndex: 9999,
            transform: "translate(-50%, -50%)",
            overflowX: "visible", // Added as requested
          }}
        />
      </AnimatePresence>
    </>
  );
};