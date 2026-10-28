import Image from "next/image";

import type { ProjectMediaProps } from "@/types";

export function ProjectMedia({ project }: ProjectMediaProps) {
  return (
    <div
      data-project-hero-media={project.id}
      className="project-hero__image"
    >
      {project.video ? (
        <video
          src={project.video.src}
          poster={project.video.poster ?? project.image?.src}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-label={project.image?.alt ?? `${project.title} — vídeo`}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : project.image ? (
        <Image
          fill
          preload
          src={project.image.src}
          alt={project.image.alt}
          draggable={false}
          sizes="(max-width: 767px) calc(100vw - 16px), (max-width: 1024px) 50vw, 42vw"
          className="object-cover"
        />
      ) : null}
    </div>
  );
}
