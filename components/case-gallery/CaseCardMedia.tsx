"use client";

import Image from "next/image";

import type { CaseCardMediaProps } from "@/types";

export function CaseCardMedia({
  src,
  alt,
  preload = false,
}: CaseCardMediaProps) {
  return (
    <div
      className="
        relative aspect-(--case-card-ratio)
        overflow-hidden
      "
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
        className="
          pointer-events-none scale-[1.15]
          select-none object-cover
        "
      />
    </div>
  );
}
