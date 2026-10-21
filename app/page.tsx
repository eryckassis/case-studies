import { SiteHeader } from "@/components/header";

export default function Home() {
  return (
    <>
      <SiteHeader
        brand={["YOUR", "NAME"]}
        menuHref="#cases"
        contactHref="mailto:you@example.com"
      />

      <main id="cases" className="min-h-[calc(100svh-var(--header-height))]" />
    </>
  );
}
