import type { ReactElement, ReactNode } from "react";

export type PageTransitionProps = Readonly<{
  children: ReactNode;
}>;

export type ProjectRevealProps = Readonly<{
  delay: number;
  children: ReactElement<Record<string, unknown>>;
}>;

export type ProjectTransitionTarget = Readonly<{
  href: string;
  projectId: string;
  media: HTMLElement;
  title: HTMLElement;
}>;

export type PageTransitionContextValue = Readonly<{
  openProject: (target: ProjectTransitionTarget) => Promise<void>;
  returnHome: (href: string) => Promise<void>;
}>;
