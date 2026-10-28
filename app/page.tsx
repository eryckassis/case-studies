import { SiteHeader } from "@/components/header";
import { CaseGallery } from "@/components/case-gallery";
import { PageTransition } from "@/components/page-transition";
import { caseStudies } from "@/data/case-studies";

export default function Home() {
  return (
    <PageTransition>
      <SiteHeader
        brand={["MIKE", "FAÜS"]}
        menuHref="#cases"
        contactHref="mailto:you@example.com"
      />

      <main id="cases" className="min-h-[calc(100svh-var(--header-height))]">
        <CaseGallery items={caseStudies} />
      </main>
    </PageTransition>
  );
}
