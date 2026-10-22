import type { ProjectHeroProps } from "@/types";

import { ProjectMedia } from "./ProjectMedia";
import { ProjectMeta } from "./ProjectMeta";
import { ProjectTitle } from "./ProjectTitle";

export function ProjectHero({ project }: ProjectHeroProps) {
  return (
    <section className="project-hero">
      <div className="project-hero__left">
        <ProjectTitle
          projectId={project.id}
          lines={project.titleLines}
          scope="desktop"
        />

        <ProjectMeta project={project} scope="desktop" />
      </div>

      <div className="project-hero__right">
        <div className="project-hero__image-wrapper">
          <ProjectMedia project={project} />
        </div>

        <div className="project-hero__mobile-content">
          <ProjectTitle
            projectId={project.id}
            lines={project.titleLines}
            scope="mobile"
          />

          <ProjectMeta project={project} scope="mobile" />
        </div>

        <div className="project-hero__description">
          <p>{project.description}</p>
        </div>
      </div>
    </section>
  );
}
