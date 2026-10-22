import type { CaseStudy } from "@/types";

export const caseStudies = [
  {
    id: "project-one",
    title: "Project One",
    href: "/work/project-one",
    image: {
      src: "/images/cases/project-one.jpg",
      alt: "Visual do projeto Project One",
    },
  },
  {
    id: "project-two",
    title: "Project Two",
    href: "/work/project-two",
    image: {
      src: "/images/cases/project-one.jpg",
      alt: "Visual do projeto Project Two",
    },
  },
  {
    id: "project-three",
    title: "Project Three",
    href: "/work/project-three",
    image: {
      src: "/images/cases/project-one.jpg",
      alt: "Visual do projeto Project Three",
    },
  },
  {
    id: "project-four",
    title: "Project Four",
    href: "/work/project-four",
    image: {
      src: "/images/cases/project-one.jpg",
      alt: "Visual do projeto Project Four",
    },
  },
  {
    id: "project-five",
    title: "Project Five",
    href: "/work/project-five",
    image: {
      src: "/images/cases/project-one.jpg",
      alt: "Visual do projeto Project Five",
    },
  },
  {
    id: "project-six",
    title: "Project Six",
    href: "/work/project-six",
    image: {
      src: "/images/cases/project-one.jpg",
      alt: "Visual do projeto Project Six",
    },
  },
] as const satisfies readonly CaseStudy[];
