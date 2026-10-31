import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SiteHeader } from "@/components/header";
import { PageTransition } from "@/components/page-transition";
import {
  ProjectHero,
  ProjectNextCase,
  ProjectSection,
} from "@/components/project";
import { caseStudies } from "@/data/case-studies";

export const instant = false;

export function generateStaticParams() {
  return caseStudies.map((project) => ({ projectId: project.id }));
}

function getProject(projectId: string) {
  const project = caseStudies.find((candidate) => candidate.id === projectId);

  if (!project) {
    notFound();
  }

  return project;
}

function getNextProject(projectId: string) {
  const currentIndex = caseStudies.findIndex(
    (project) => project.id === projectId,
  );

  return caseStudies[(currentIndex + 1) % caseStudies.length];
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[projectId]">): Promise<Metadata> {
  const { projectId } = await params;
  const project = getProject(projectId);

  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectPage({
  params,
}: PageProps<"/work/[projectId]">) {
  const { projectId } = await params;
  const project = getProject(projectId);
  const nextProject = getNextProject(project.id);

  return (
    <PageTransition>
      <SiteHeader
        brand={["MIKE", "FAÜS"]}
        menuHref="/#cases"
        contactHref="mailto:you@example.com"
      />

      <main className="project-page">
        <div className="project-container">
          <ProjectHero project={project} />

          <div className="pt-[80px] desktop:pt-[230px] min-[89.875rem]:pt-[15.99vw]">
            {project.sections.map((section, index) => (
              <ProjectSection
                key={section.id}
                section={section}
                index={index}
              />
            ))}
          </div>

          <ProjectNextCase project={nextProject} />
        </div>
      </main>
    </PageTransition>
  );
}
