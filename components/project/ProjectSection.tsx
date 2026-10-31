import Image from "next/image";

import type { ProjectSectionProps } from "@/types";

export function ProjectSection({ section, index }: ProjectSectionProps) {
  const number = `${String(index + 1).padStart(2, "0")}.`;
  const titleId = `project-section-${section.id}`;

  return (
    <section aria-labelledby={titleId}>
      <figure>
        <div className="relative aspect-video overflow-hidden">
          <Image
            fill
            unoptimized
            src={section.image.src}
            alt={section.image.alt}
            sizes="calc(100vw - (var(--page-gutter) * 2))"
            className="object-cover"
          />
        </div>

        <figcaption className="grid grid-cols-[2rem_1fr] gap-(--layout-gap) py-3 text-xs/none uppercase">
          <span aria-hidden="true">{number}</span>
          <h2 id={titleId}>{section.title}</h2>
        </figcaption>
      </figure>
    </section>
  );
}
