import type { CaseStudy } from "./case-study";

export type ProjectDetails = CaseStudy &
  Readonly<{
    titleLines: readonly [string, ...string[]];
    client: string;
    year: string;
    category: string;
    services: readonly string[];
    description: string;
  }>;

export type ProjectHeroProps = Readonly<{
  project: ProjectDetails;
}>;

export type ProjectTitleProps = Readonly<{
  projectId: string;
  lines: ProjectDetails["titleLines"];
  scope: "desktop" | "mobile";
}>;

export type ProjectMetaProps = Readonly<{
  project: ProjectDetails;
  scope: "desktop" | "mobile";
}>;

export type ProjectMediaProps = Readonly<{
  project: ProjectDetails;
}>;
