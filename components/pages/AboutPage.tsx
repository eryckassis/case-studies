import Image from "next/image";

import { SiteHeader } from "@/components/header";
import { PageTransition } from "@/components/page-transition";

export function AboutPage() {
  return (
    <PageTransition>
      <SiteHeader
        brand={["MIKE", "FAÜS"]}
        menuHref="/"
        contactHref="mailto:you@example.com"
      />

      <main className="px-(--page-gutter)">
        <section className="pt-2.5 pb-20" aria-labelledby="about-title">
          <h1
            id="about-title"
            className="max-w-full text-[clamp(48px,6.26vw,120px)] leading-none font-normal tracking-[-0.04em] desktop:w-[78%]"
          >
            Peintre surréaliste, je explore la place des femmes, l’égalité et
            l’harmonie des couleurs
          </h1>

          <div className="mt-[clamp(100px,13vw,200px)] grid grid-cols-[repeat(var(--layout-columns),minmax(0,1fr))] gap-(--layout-gap)">
            <div className="relative col-span-full aspect-318/399 overflow-hidden md:col-span-3">
              <Image
                src="/images/about/mikeFaus02.jpg"
                alt="Abstract portrait artwork"
                fill
                priority
                sizes="(min-width: 1025px) 21vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>

            <div className="col-span-full pt-8 text-[clamp(22px,1.67vw,32px)] leading-[1.2] tracking-[-0.01em] md:col-start-4 md:col-span-3 md:pt-0 desktop:col-start-9 desktop:col-span-6 desktop:pr-[2vw]">
              <h2 className="mb-7 font-normal uppercase">À propos de moi</h2>
              <p>
                Bonjour, je me présente je suis Français j'ai 27 ans née dans la
                Manche en Normandie. J'ai toujours étais attire par I'art depuis
                tout petit. Je fais des peintures surréalistes qui représente
                les femmes, je suis engagé dans I'égalité homme femme qui est
                encore trop présente dans beaucoup de pays. Mes inspirations
                sont principalement Henri Rousseau et Félix Labisse. Je cherche
                dans mes tableaux créer une harmonie des couleurs.
              </p>
              <p className="mt-7.25">
                Chaque toile que je peins porte mon engagement pour l’égalité et
                ma fascination pour les univers oniriques.
              </p>
            </div>
          </div>
        </section>
      </main>
    </PageTransition>
  );
}
