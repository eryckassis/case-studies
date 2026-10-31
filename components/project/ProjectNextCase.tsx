"use client";

import type { MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";

import { usePageTransition } from "@/components/page-transition";
import type { ProjectNextCaseProps } from "@/types";

function isModifiedClick(event: MouseEvent<HTMLAnchorElement>) {
  return (
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey ||
    event.currentTarget.target === "_blank"
  );
}

export function ProjectNextCase({ project }: ProjectNextCaseProps) {
  const { openProject } = usePageTransition();

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (isModifiedClick(event)) {
      return;
    }

    const title = event.currentTarget.querySelector<HTMLElement>(
      "[data-next-case-title]",
    );
    const media = event.currentTarget.querySelector<HTMLElement>(
      "[data-next-case-media]",
    );

    if (!title || !media) {
      return;
    }

    event.preventDefault();
    void openProject({
      href: project.href,
      projectId: project.id,
      media,
      title,
      titleExit: "up",
    });
  }

  const titleId = `next-case-${project.id}`;

  return (
    <section
      aria-labelledby={titleId}
      className="
        flex min-h-svh items-end
        pt-24 pb-(--page-gutter)
        desktop:pt-[230px] desktop:pb-4
        min-[89.875rem]:pt-[15.99vw]
        min-[89.875rem]:pb-[1.11vw]
      "
    >
      <Link
        href={project.href}
        onClick={handleClick}
        className="
          grid w-full grid-cols-6
          gap-(--layout-gap)
          text-foreground no-underline
          focus-visible:outline
          focus-visible:outline-offset-4
          focus-visible:outline-foreground
          desktop:grid-cols-14
        "
      >
        <div
          className="
            relative col-span-6 mb-[95px]
            desktop:col-start-1 desktop:col-span-8
            desktop:mb-[-22px]
          "
        >
          <h2
            id={titleId}
            className="
              font-sans
              text-[length:var(--project-title-size)]
              leading-[1.24] font-normal
              tracking-[-0.04em] lowercase
              desktop:max-w-[644px]
              desktop:text-[90px]
              min-[89.875rem]:max-w-[44.78vw]
              min-[89.875rem]:text-[6.26vw]
            "
          >
            <span
              data-next-case-title
              className="
                relative block h-[1.24em]
                overflow-hidden
              "
            >
              <span
                data-page-transition-title-inner
                className="
                  relative block h-full
                  will-change-transform
                "
              >
                <span className="block h-full">next case</span>

                <span
                  aria-hidden="true"
                  className="absolute top-full left-0 block h-full"
                >
                  next case
                </span>
              </span>
            </span>

            <span
              aria-label={project.title}
              className="
                mt-[-16px] block overflow-hidden
                desktop:mt-[-32px]
                min-[89.875rem]:mt-[-2.23vw]
              "
            >
              {project.titleLines.map((line, index) => (
                <span
                  key={`${line}-${index}`}
                  aria-hidden="true"
                  className="block"
                >
                  {line}
                </span>
              ))}
            </span>
          </h2>

          <div
            className="
              hidden
              desktop:absolute desktop:top-full desktop:left-0
              desktop:grid desktop:w-full
              desktop:grid-cols-2
              desktop:gap-(--layout-gap)
              desktop:pt-9 desktop:pb-4
              desktop:text-xs/[1.14]
              desktop:uppercase
              min-[89.875rem]:pt-[2.5vw]
            "
          >
            <div>
              <span className="block">{project.client}</span>
              <span className="block">{project.year}</span>
            </div>

            <div>
              <span className="block">{project.category}</span>

              <div className="mt-[1.2px]">
                {project.services.map((service) => (
                  <span key={service} className="block">
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div
          className="
            col-start-3 col-span-4
            aspect-[192/221]
            min-[48rem]:col-start-4
            min-[48rem]:col-span-3
            desktop:col-start-13
            desktop:col-span-2
            desktop:mt-[30px]
          "
        >
          <div
            data-next-case-media
            className="
              relative h-full w-full
              overflow-hidden
              will-change-[top,left,width,height]
            "
          >
            {project.video ? (
              <video
                src={project.video.src}
                poster={project.video.poster ?? project.image?.src}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label={
                  project.image?.alt ?? `${project.title} — vídeo`
                }
                className="
                  pointer-events-none
                  absolute inset-0
                  h-full w-full
                  scale-[1.3]
                  select-none object-cover
                  will-change-transform
                  desktop:scale-[1.4]
                "
              />
            ) : project.image ? (
              <Image
                fill
                unoptimized
                src={project.image.src}
                alt={project.image.alt}
                draggable={false}
                sizes="(max-width: 1024px) 66vw, 14vw"
                className="
                  pointer-events-none
                  scale-[1.3]
                  select-none object-cover
                  will-change-transform
                  desktop:scale-[1.4]
                "
              />
            ) : null}
          </div>
        </div>
      </Link>
    </section>
  );
}
