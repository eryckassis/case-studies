import Link from "next/link";

import type { CaseCardProps } from "@/types";

import { CaseCardMedia } from "./CaseCardMedia";

export function CaseCard({ caseStudy, preload = false }: CaseCardProps) {
  return (
    <Link
      href={caseStudy.href}
      className="block w-(--case-card-width) shrink-0
        focus-visible:outline focus-visible:outline-offset-2
        focus-visible:outline-foreground"
    >
      <h2
        className="
          mb-(--case-title-gap) overflow-hidden
          whitespace-nowrap font-sans text-xs/none
          font-normal tracking-normal uppercase
        "
      >
        {caseStudy.title}
      </h2>

      <CaseCardMedia
        src={caseStudy.image.src}
        alt={caseStudy.image.alt}
        preload={preload}
      />
    </Link>
  );
}
