"use client";

import type { MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { usePageTransition } from "@/components/page-transition";
import type { ProjectNextCaseProps } from "@/types";

const MotionLink = motion.create(Link);
const textEase = [0.16, 1, 0.3, 1] as const;

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
  const reducedMotion = useReducedMotion();

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (isModifiedClick(event)) {
      return;
    }

    const title = event.currentTarget.querySelector<HTMLElement>(
      "[data-next-case-heading]",
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
      <MotionLink
        href={project.href}
        onClick={handleClick}
        initial="rest"
        whileHover={reducedMotion ? undefined : "hover"}
        whileFocus={reducedMotion ? undefined : "hover"}
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
            data-next-case-heading
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
            <motion.span
              data-next-case-title
              initial={reducedMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
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
                <motion.span
                  variants={{ hidden: { y: "100%" }, visible: { y: "0%" } }}
                  transition={{ duration: 1, ease: textEase }}
                  className="relative block h-full"
                >
                  <motion.span
                    variants={{ rest: { y: "0%" }, hover: { y: "-100%" } }}
                    transition={{ duration: 0.65, ease: textEase }}
                    className="relative block h-full will-change-transform"
                  >
                    <span className="block h-full">next case</span>
                    <span
                      aria-hidden="true"
                      className="absolute top-full left-0 block h-full"
                    >
                      next case
                    </span>
                  </motion.span>
                </motion.span>
              </span>
            </motion.span>

            <span
              aria-label={project.title}
              className="
                mt-[-16px] block
                desktop:mt-[-32px]
                min-[89.875rem]:mt-[-2.23vw]
              "
            >
              {project.titleLines.map((line, index) => (
                <motion.span
                  key={`${line}-${index}`}
                  aria-hidden="true"
                  initial={reducedMotion ? false : "hidden"}
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  className="block overflow-hidden"
                >
                  <span data-page-transition-title-inner className="block">
                    <motion.span
                      variants={{ hidden: { y: "100%" }, visible: { y: "0%" } }}
                      transition={{
                        duration: 1,
                        delay: reducedMotion ? 0 : 0.08 * (index + 1),
                        ease: textEase,
                      }}
                      className="block will-change-transform"
                    >
                      {line}
                    </motion.span>
                  </span>
                </motion.span>
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
                aria-label={project.image?.alt ?? `${project.title} — vídeo`}
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
      </MotionLink>
    </section>
  );
}
