import Image from "next/image";

import type { ProjectMediaProps } from "@/types";

export function ProjectMedia({ project }: ProjectMediaProps) {
  return (
    <div
      data-project-hero-media={project.id}
      className="project-hero__image"
    >
      <Image
        fill
        preload
        src={project.image.src}
        alt={project.image.alt}
        draggable={false}
        sizes="(max-width: 767px) calc(100vw - 16px), (max-width: 1024px) 50vw, 42vw"
        className="object-cover"
      />
    </div>
  );
}
