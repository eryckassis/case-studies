import type { PageTransitionProps } from "@/types";

export function PageTransition({ children }: PageTransitionProps) {
  return (
    <div
      data-page-transition-surface
      className="min-h-svh bg-background"
    >
      {children}
    </div>
  );
}
