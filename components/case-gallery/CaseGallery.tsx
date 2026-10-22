"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import {
  cancelFrame,
  frame,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

import type { CaseGalleryProps } from "@/types";

import { CaseCard } from "./CaseCard";

export function CaseGallery({ items }: CaseGalleryProps) {
  const wrapperRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const sequenceRef = useRef<HTMLDivElement>(null);

  const cardScaleTarget = useMotionValue(1);
  const cardScale = useSpring(cardScaleTarget, {
    stiffness: 180,
    damping: 28,
    mass: 0.4,
    restDelta: 0.001,
  });

  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const content = contentRef.current;
    const sequence = sequenceRef.current;

    if (!wrapper || !content || !sequence) {
      return;
    }

    const scrollWrapper: HTMLElement = wrapper;
    const scrollContent: HTMLDivElement = content;
    const loopSequence: HTMLDivElement = sequence;

    function updateLoopSize(scroll?: Lenis) {
      const styles = window.getComputedStyle(scrollWrapper);

      const horizontalPadding =
        Number.parseFloat(styles.paddingLeft) +
        Number.parseFloat(styles.paddingRight);

      const viewportWidth = scrollWrapper.clientWidth - horizontalPadding;

      const loopWidth = loopSequence.getBoundingClientRect().width;

      scrollContent.style.width = `${loopWidth + viewportWidth}px`;
      scroll?.resize();
    }

    updateLoopSize();

    const lenis = new Lenis({
      wrapper: scrollWrapper,
      content: scrollContent,
      orientation: "horizontal",
      gestureOrientation: "both",
      infinite: true,
      smoothWheel: true,
      syncTouch: true,

      lerp: 0.06,
      wheelMultiplier: 0.85,

      autoRaf: false,
      autoResize: true,
      overscroll: false,
      respectReducedMotion: true,
    });

    function updateCardScale(scroll: Lenis) {
      if (shouldReduceMotion) {
        cardScaleTarget.set(1);
        return;
      }

      const velocityStrength = Math.min(Math.abs(scroll.velocity) / 22, 1);

      cardScaleTarget.set(1 - velocityStrength * 0.07);
    }

    lenis.on("scroll", updateCardScale);

    const resizeObserver = new ResizeObserver(() => {
      updateLoopSize(lenis);
    });

    resizeObserver.observe(scrollWrapper);
    resizeObserver.observe(loopSequence);

    function update({ timestamp }: { timestamp: number }) {
      lenis.raf(timestamp);
    }

    frame.update(update, true);

    return () => {
      lenis.off("scroll", updateCardScale);
      resizeObserver.disconnect();
      cancelFrame(update);
      cardScaleTarget.set(1);
      lenis.destroy();
    };
  }, [cardScaleTarget, shouldReduceMotion]);

  return (
    <section
      ref={wrapperRef}
      aria-labelledby="selected-cases-title"
      tabIndex={0}
      className="
        h-(--case-gallery-height)
        overflow-x-auto overflow-y-hidden
        overscroll-x-contain
        px-(--page-gutter) pb-(--page-gutter)
        select-none scrollbar-none
        [&::-webkit-scrollbar]:hidden
      "
    >
      <h1 id="selected-cases-title" className="sr-only">
        Selected case studies
      </h1>

      <div
        ref={contentRef}
        className="relative h-full min-w-full overflow-hidden"
      >
        <div className="absolute bottom-0 left-0 flex">
          <div
            ref={sequenceRef}
            className="
              flex shrink-0 gap-(--case-gallery-gap)
              pr-(--case-gallery-gap)
            "
          >
            {items.map((caseStudy, index) => (
              <CaseCard
                key={caseStudy.id}
                caseStudy={caseStudy}
                scrollScale={cardScale}
                preload={index === 0}
              />
            ))}
          </div>

          <div
            aria-hidden="true"
            className="
              flex shrink-0 gap-(--case-gallery-gap)
              pr-(--case-gallery-gap)
            "
          >
            {items.map((caseStudy) => (
              <CaseCard
                key={`loop-${caseStudy.id}`}
                caseStudy={caseStudy}
                scrollScale={cardScale}
                duplicate
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
