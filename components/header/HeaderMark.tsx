import { ProjectBackLink } from "@/components/page-transition";
import Image from "next/image";

export function HeaderMark() {
  return (
    <ProjectBackLink
      href="/"
      aria-label="Case Studies — página inicial"
      className="hidden h-12.75 w-25.25 desktop:col-span-3 desktop:col-start-5 desktop:flex desktop:items-start focus-visible:bg-foreground focus-visible:text-background focus-visible:outline-none"
    >
      <Image
        className="h-auto w-full object-contain"
        src="/svg/faus-logo.svg"
        alt=""
        aria-hidden="true"
        width={345}
        height={117}
      />
    </ProjectBackLink>
  );
}
