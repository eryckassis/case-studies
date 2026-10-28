"use client";

import Image from "next/image";

import type { CaseCardMediaProps } from "@/types";

export function CaseCardMedia({
  image,
  video,
  preload = false,
}: CaseCardMediaProps) {
  return (
    <div
      data-project-transition-media
      className="
        relative aspect-(--case-card-ratio)
        overflow-hidden
      "
    >
      {video ? (
        <video
          src={video.src}
          poster={video.poster ?? image?.src}
          autoPlay
          muted
          loop
          playsInline
          preload={preload ? "auto" : "metadata"}
          aria-label={image?.alt ?? "Vídeo do projeto"}
          className="
            pointer-events-none absolute inset-0
            h-full w-full scale-[1.15]
            select-none object-cover
          "
        />
      ) : image ? (
        <Image
          fill
          unoptimized
          src={image.src}
          alt={image.alt}
          preload={preload}
          draggable={false}
          sizes="(max-width: 767px) 83vw, (max-width: 1024px) 36.6vw, 28.74vw"
          className="
            pointer-events-none scale-[1.15]
            select-none object-cover
          "
        />
      ) : null}
    </div>
  );
}
