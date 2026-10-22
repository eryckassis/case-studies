import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SiteHeader } from "@/components/header";
import { PageTransition } from "@/components/page-transition";
import { ProjectHero } from "@/components/project";
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

  return (
    <PageTransition>
      <SiteHeader
        brand={["YOUR", "NAME"]}
        menuHref="/#cases"
        contactHref="mailto:you@example.com"
      />

      <main className="project-page">
        <div className="project-container">
          <ProjectHero project={project} />
        </div>
      </main>
    </PageTransition>
  );
}
