import type { Variants } from "framer-motion";

export const fadeIn = (direction: string, delay: number): Variants => ({
  hidden: {
    y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
    x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
    opacity: 0,
  },
  show: {
    y: 0,
    x: 0,
    opacity: 1,
    transition: {
      type: "tween" as const,
      duration: 1.2,
      delay,
      ease: [0.25, 0.25, 0.25, 0.75] as [number, number, number, number],
    },
  },
});

export const opacite = (_direction: string, delay: number): Variants => ({
  hidden: {
    opacity: 0.09,
  },
  show: {
    opacity: 1,
    transition: {
      type: "tween" as const,
      duration: 0.5,
      delay,
      ease: [0.25, 0.25, 0.25, 0.75] as [number, number, number, number],
    },
  },
});