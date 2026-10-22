import type { ProjectTitleProps } from "@/types";

import { ProjectReveal } from "@/components/page-transition";

export function ProjectTitle({ projectId, lines, scope }: ProjectTitleProps) {
  return (
    <h1 className="project-hero__title">
      {lines.map((line, index) => (
        <span key={`${line}-${index}`} className="project-hero__title-line">
          <ProjectReveal
            delay={index * 0.1}
          >
            <span data-project-copy={`${projectId}-${scope}-title-${index}`}>
              {line}
            </span>
          </ProjectReveal>
        </span>
      ))}
    </h1>
  );
}
