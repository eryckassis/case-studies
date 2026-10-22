import type { HeaderBrandProps } from "@/types";
import { ProjectBackLink } from "@/components/page-transition";

export function HeaderBrand({ brand }: HeaderBrandProps) {
  return (
    <div className="col-span-2 col-start-1 desktop:col-span-3">
      <ProjectBackLink
        href="/"
        aria-label={`${brand.join(" ")} — página inicial`}
        className="inline-flex flex-col items-start desktop:gap-0.5 focus-visible:bg-foreground focus-visible:text-background focus-visible:outline-none"
      >
        <span>{brand[0]}</span>
        <span>{brand[1]}</span>
      </ProjectBackLink>
    </div>
  );
}
