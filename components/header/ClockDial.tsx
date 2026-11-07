"use client";

import { motion, useReducedMotion } from "framer-motion";

import { useTheme } from "@/components/theme/ThemeProvider";

export function ClockDial() {
  const { theme, toggleTheme } = useTheme();
  const shouldReduceMotion = useReducedMotion();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      aria-label="Dark mode"
      aria-pressed={isDark}
      onClick={toggleTheme}
      className="absolute right-0 top-0 size-13 cursor-pointer rounded-full
        border border-current
        focus-visible:outline-2 focus-visible:outline-offset-4
        focus-visible:outline-foreground"
    >
      <motion.span
        aria-hidden="true"
        initial={false}
        animate={{ rotate: isDark ? 180 : 0 }}
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : { type: "spring", stiffness: 180, damping: 22 }
        }
        className="absolute inset-0"
      >
        <span
          className="absolute left-1/2 top-2.5 size-2.25
            -translate-x-1/2 -translate-y-1/2 rounded-full
            border border-current desktop:size-1.75"
        />
      </motion.span>
    </button>
  );
}
