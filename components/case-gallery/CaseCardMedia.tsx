"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import type { CaseCardMediaProps } from "@/types";

export function CaseCardMedia({
  src,
  alt,
  preload = false,
}: CaseCardMediaProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="relative aspect-(--case-card-ratio) origin-bottom
        overflow-hidden transform-gpu"
      whileHover={shouldReduceMotion ? undefined : { scale: 0.98 }}
      transition={{
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Image
        fill
        src={src}
        alt={alt}
        preload={preload}
        draggable={false}
        sizes="
            (max-width: 767px) 83vw,
          (max-width: 1024px) 36.6vw,
          28.74vw

            "
        className="pointer-events-none scale-[1.15]
          select-none object-cover"
      />
    </motion.div>
  );
}
