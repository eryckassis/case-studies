import { CaseGallery } from "@/components/case-gallery";
import { SiteHeader } from "@/components/header";
import { PageTransition } from "@/components/page-transition";
import { caseStudies } from "@/data/case-studies";

export function CasesPage() {
  return (
    <PageTransition>
      <SiteHeader
        brand={["MIKE", "FAÜS"]}
        menuHref="#cases"
        contactHref="mailto:you@example.com"
      />

      <main
        id="cases"
        className="min-h-[calc(100svh-var(--header-height))]"
      >
        <CaseGallery items={caseStudies} />
      </main>
    </PageTransition>
  );
}
