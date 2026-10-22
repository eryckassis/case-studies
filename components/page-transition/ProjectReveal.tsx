import { cloneElement } from "react";

import type { ProjectRevealProps } from "@/types";

export function ProjectReveal({
  delay,
  children,
}: ProjectRevealProps) {
  return cloneElement(children, {
    "data-project-reveal": "",
    "data-project-reveal-delay": delay,
  });
}
