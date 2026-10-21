"use client";

import { motion } from "framer-motion";

import type { AnimatedCaseTitleProps } from "@/types";

export function AnimatedCaseTitle({ title, controls }: AnimatedCaseTitleProps) {
  return (
    <h2
      className="
        mb-(--case-title-gap) overflow-hidden
        whitespace-nowrap font-sans text-xs/none
        font-normal tracking-normal uppercase
      "
    >
      <motion.span
        initial={false}
        animate={controls}
        className="relative block will-change-transform"
      >
        <span className="block">{title}</span>

        <span aria-hidden="true" className="absolute top-full left-0 block">
          {title}
        </span>
      </motion.span>
    </h2>
  );
}
