import type { ProjectMetaProps } from "@/types";

import { ProjectReveal } from "@/components/page-transition";

export function ProjectMeta({ project, scope }: ProjectMetaProps) {
  const prefix = `${project.id}-${scope}`;

  return (
    <div className="project-hero__content">
      <div className="project-hero__meta">
        <ProjectReveal delay={0.15}>
          <span data-project-copy={`${prefix}-client`}>{project.client}</span>
        </ProjectReveal>

        <ProjectReveal delay={0.25}>
          <span data-project-copy={`${prefix}-year`}>{project.year}</span>
        </ProjectReveal>
      </div>

      <div className="project-hero__classification">
        <div className="project-hero__category">
          <ProjectReveal delay={0.15}>
            <span data-project-copy={`${prefix}-category`}>
              {project.category}
            </span>
          </ProjectReveal>
        </div>

        <ProjectReveal delay={0.25}>
          <div
            data-project-copy={`${prefix}-services`}
            className="project-hero__services"
          >
            {project.services.map((service) => (
              <span key={service}>{service}</span>
            ))}
          </div>
        </ProjectReveal>
      </div>
    </div>
  );
}
