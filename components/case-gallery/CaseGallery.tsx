import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { cancelFrame, frame } from "framer-motion";

import type { CaseGalleryProps } from "@/types";

import { CaseCard } from "./CaseCard";

export function CaseGallery({ items }: CaseGalleryProps) {
  const wrapperRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const content = contentRef.current;

    if (!wrapper || !content) {
      return;
    }

    const lenis = new Lenis({
      wrapper,
      content,
      orientation: "horizontal",
      gestureOrientation: "both",
      infinite: true,
      smoothWheel: true,
      syncTouch: true,
      lerp: 0.075,
      autoRaf: false,
      autoResize: true,
      overscroll: false,
      respectReducedMotion: true,
    });

    function update({ timestamp }: { timestamp: number }) {
      lenis.raf(timestamp);
    }
    frame.update(update, true);

    return () => {
      cancelFrame(update);
      lenis.destroy();
    };
  }, []);

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
        className="
          flex h-full w-max items-end
          gap-(--case-gallery-gap)
        "
      >
        {items.map((caseStudy, index) => (
          <CaseCard
            key={caseStudy.id}
            caseStudy={caseStudy}
            preload={index === 0}
          />
        ))}
      </div>
    </section>
  );
}
