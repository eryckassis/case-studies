"use client";

import type { MouseEvent } from "react";
import Link from "next/link";
import { motion, useAnimationControls, useReducedMotion } from "framer-motion";

import type { CaseCardProps } from "@/types";
import { usePageTransition } from "@/components/page-transition";

import { AnimatedCaseTitle } from "./AnimatedCaseTitle";
import { CaseCardMedia } from "./CaseCardMedia";

const MotionLink = motion.create(Link);

const expoOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

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

export function CaseCard({
  caseStudy,
  scrollScale,
  preload = false,
  duplicate = false,
}: CaseCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const { openProject } = usePageTransition();

  const titleControls = useAnimationControls();
  const cardControls = useAnimationControls();
  const mediaControls = useAnimationControls();

  function handleHover() {
    if (shouldReduceMotion) {
      return;
    }

    titleControls.set({ y: "0%" });
    cardControls.set({ y: 0 });
    mediaControls.set({ y: 0 });

    void titleControls.start({
      y: "-100%",
      transition: {
        duration: 0.3,
        ease: expoOut,
      },
    });

    void cardControls.start({
      y: [0, -2, 0],
      transition: {
        duration: 0.55,
        times: [0, 0.16, 1],
        ease: expoOut,
      },
    });

    void mediaControls.start({
      y: [0, 1, 0],
      transition: {
        duration: 0.55,
        times: [0, 0.16, 1],
        ease: expoOut,
      },
    });
  }

  function handleProjectClick(event: MouseEvent<HTMLAnchorElement>) {
    if (isModifiedClick(event)) {
      return;
    }

    const selectedTitle = event.currentTarget.querySelector<HTMLElement>(
      "[data-case-transition-title]",
    );
    const selectedMedia = event.currentTarget.querySelector<HTMLElement>(
      "[data-project-transition-media]",
    );

    if (!selectedTitle || !selectedMedia) {
      return;
    }

    event.preventDefault();
    void openProject({
      href: caseStudy.href,
      projectId: caseStudy.id,
      media: selectedMedia,
      title: selectedTitle,
    });
  }

  return (
    <div className="w-(--case-card-width) shrink-0">
      <MotionLink
        href={caseStudy.href}
        tabIndex={duplicate ? -1 : undefined}
        initial={false}
        animate={cardControls}
        onClick={handleProjectClick}
        onHoverStart={handleHover}
        onFocus={handleHover}
        style={{
          scale: shouldReduceMotion ? 1 : scrollScale,
        }}
        className="
          block w-full origin-center will-change-transform
          focus-visible:outline focus-visible:outline-offset-2
          focus-visible:outline-foreground
        "
      >
        <AnimatedCaseTitle title={caseStudy.title} controls={titleControls} />

        <motion.div
          initial={false}
          animate={mediaControls}
          className="will-change-transform"
        >
          <CaseCardMedia
            src={caseStudy.image.src}
            alt={caseStudy.image.alt}
            preload={preload}
          />
        </motion.div>
      </MotionLink>
    </div>
  );
}
