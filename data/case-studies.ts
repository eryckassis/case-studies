import type { ProjectDetails } from "@/types";

export const caseStudies = [
  {
    id: "project-one",
    title: "Project One",
    href: "/work/project-one",
    titleLines: ["project", "one"],
    client: "Client Name",
    year: "2026",
    category: "Art Direction",
    services: ["Digital Design", "Development"],
    description:
      "Project One brings strategy, visual direction and digital design into a single experience. Replace this introductory text with the final project narrative when the case-study content is ready.",
    video: {
      src: "/videos/woman.mp4",
      poster: "/images/cases/project-one.jpg",
    },
  },
  {
    id: "project-two",
    title: "Project Two",
    href: "/work/project-two",
    titleLines: ["project", "two"],
    client: "Client Name",
    year: "2026",
    category: "Art Direction",
    services: ["Digital Design", "Development"],
    description:
      "Project Two brings strategy, visual direction and digital design into a single experience. Replace this introductory text with the final project narrative when the case-study content is ready.",
    image: {
      src: "/images/cases/project-02.jpg",
      alt: "Visual do projeto Project Two",
    },
  },
  {
    id: "project-three",
    title: "Project Three",
    href: "/work/project-three",
    titleLines: ["project", "three"],
    client: "Client Name",
    year: "2026",
    category: "Art Direction",
    services: ["Digital Design", "Development"],
    description:
      "Project Three brings strategy, visual direction and digital design into a single experience. Replace this introductory text with the final project narrative when the case-study content is ready.",
    image: {
      src: "/images/cases/project-03.png",
      alt: "Visual do projeto Project Three",
    },
  },
  {
    id: "project-four",
    title: "Project Four",
    href: "/work/project-four",
    titleLines: ["project", "four"],
    client: "Client Name",
    year: "2026",
    category: "Art Direction",
    services: ["Digital Design", "Development"],
    description:
      "Project Four brings strategy, visual direction and digital design into a single experience. Replace this introductory text with the final project narrative when the case-study content is ready.",
    image: {
      src: "/images/cases/project-04.jpeg",
      alt: "Visual do projeto Project Four",
    },
  },
  {
    id: "project-five",
    title: "Project Five",
    href: "/work/project-five",
    titleLines: ["project", "five"],
    client: "Client Name",
    year: "2026",
    category: "Art Direction",
    services: ["Digital Design", "Development"],
    description:
      "Project Five brings strategy, visual direction and digital design into a single experience. Replace this introductory text with the final project narrative when the case-study content is ready.",
    image: {
      src: "/images/cases/project-one.jpg",
      alt: "Visual do projeto Project Five",
    },
  },
  {
    id: "project-six",
    title: "Project Six",
    href: "/work/project-six",
    titleLines: ["project", "six"],
    client: "Client Name",
    year: "2026",
    category: "Art Direction",
    services: ["Digital Design", "Development"],
    description:
      "Project Six brings strategy, visual direction and digital design into a single experience. Replace this introductory text with the final project narrative when the case-study content is ready.",
    image: {
      src: "/images/cases/project-one.jpg",
      alt: "Visual do projeto Project Six",
    },
  },
] as const satisfies readonly ProjectDetails[];
