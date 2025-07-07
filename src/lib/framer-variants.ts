// Example: Where you define itemVariants
// This could be directly in your component file (e.g., page.tsx)
// OR in a separate file like src/lib/framer-variants.ts and then imported.

import { Variants } from 'framer-motion'; // Important for type safety

export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Delays children animations
    },
  },
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// You can have as many variant objects as you need
export const slideInFromLeft: Variants = {
  hidden: { x: -100, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
};