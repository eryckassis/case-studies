import { ProjectBackLink } from "@/components/page-transition";

export function HeaderMark() {
  return (
    <ProjectBackLink
      href="/"
      aria-label="Case Studies — página inicial"
      className="hidden h-12.75 w-25.25 desktop:col-span-3 desktop:col-start-5 desktop:flex desktop:items-start focus-visible:bg-foreground focus-visible:text-background focus-visible:outline-none"
    >
      <span aria-hidden="true" className="text-[22px]/[0.9] tracking-[-0.04em]">
        CASE
        <br />
        STUDIES
      </span>
    </ProjectBackLink>
  );
}
