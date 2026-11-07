import { ProjectBackLink } from "@/components/page-transition";

export function HeaderMark() {
  return (
    <ProjectBackLink
      href="/"
      aria-label="Case Studies — página inicial"
      className="hidden h-12.75 w-25.25 desktop:col-span-3 desktop:col-start-5 desktop:flex desktop:items-start focus-visible:bg-foreground focus-visible:text-background focus-visible:outline-none"
    >
      <span
        aria-hidden="true"
        className="block aspect-345/117 w-full bg-current
          [mask:url('/svg/faus-logo.svg')_center/contain_no-repeat]
          [-webkit-mask:url('/svg/faus-logo.svg')_center/contain_no-repeat]"
      />
    </ProjectBackLink>
  );
}
