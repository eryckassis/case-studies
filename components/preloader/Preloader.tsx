"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

import { caseStudies } from "@/data/case-studies";

type PreloaderProps = {
  children: ReactNode;
};

type PreloaderPhase = "loading" | "burst" | "done";

const IMAGE_STEP_MS = 180;
const MINIMUM_LOAD_MS = 2220;
const HOLD_AFTER_LOAD_MS = 300;
const BURST_DURATION_MS = 1000;
const MAX_IMAGE_WAIT_MS = 8000;

const images = caseStudies.map((project) =>
  "video" in project ? project.video.poster : project.image.src,
);

const burstTiles = [
  { x: "-18vw", y: "-160vh", rotate: -4 },
  { x: "-15vw", y: "-170vh", rotate: 5 },
  { x: "-10vw", y: "-180vh", rotate: -6 },
  { x: "-1vw", y: "-190vh", rotate: 7 },
  { x: "6vw", y: "-160vh", rotate: -8 },
  { x: "7vw", y: "-170vh", rotate: 3 },
  { x: "13vw", y: "-180vh", rotate: -5 },
  { x: "24vw", y: "-190vh", rotate: 7 },
] as const;

function preloadImage(src: string) {
  return new Promise<void>((resolve) => {
    const image = new window.Image();

    image.onload = () => resolve();
    image.onerror = () => resolve();
    image.decoding = "async";
    image.src = src;
  });
}

export function Preloader({ children }: PreloaderProps) {
  const pathname = usePathname();
  const [phase, setPhase] = useState<PreloaderPhase>(() =>
    pathname === "/" && images.length > 0 ? "loading" : "done",
  );
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const isVisible = phase !== "done";

  useEffect(() => {
    if (!isVisible) return;

    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const startedAt = Date.now();
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let cancelled = false;
    let exitTimer: number | undefined;
    let finishTimer: number | undefined;
    let imageTimeout: number | undefined;

    const imageStepTimer = window.setInterval(() => {
      setActiveImageIndex((currentIndex) =>
        Math.min(currentIndex + 1, images.length - 1),
      );
    }, IMAGE_STEP_MS);

    const maximumWait = new Promise<void>((resolve) => {
      imageTimeout = window.setTimeout(resolve, MAX_IMAGE_WAIT_MS);
    });

    void Promise.race([
      Promise.all(images.map(preloadImage)).then(() => undefined),
      maximumWait,
    ]).then(() => {
      if (cancelled) return;

      if (imageTimeout !== undefined) window.clearTimeout(imageTimeout);

      const elapsedTime = Date.now() - startedAt;
      const remainingTime = Math.max(0, MINIMUM_LOAD_MS - elapsedTime);

      exitTimer = window.setTimeout(() => {
        if (cancelled) return;

        window.clearInterval(imageStepTimer);

        if (reducedMotion) {
          setPhase("done");
          return;
        }

        setPhase("burst");
        finishTimer = window.setTimeout(() => {
          if (!cancelled) setPhase("done");
        }, BURST_DURATION_MS);
      }, remainingTime + HOLD_AFTER_LOAD_MS);
    });

    return () => {
      cancelled = true;
      window.clearInterval(imageStepTimer);
      if (imageTimeout !== undefined) window.clearTimeout(imageTimeout);
      if (exitTimer !== undefined) window.clearTimeout(exitTimer);
      if (finishTimer !== undefined) window.clearTimeout(finishTimer);
    };
  }, [isVisible]);

  const currentImage = images[activeImageIndex] ?? images[0];

  return (
    <>
      <div className="contents" inert={isVisible}>
        {children}
      </div>

      {isVisible && currentImage ? (
        <div
          role="status"
          aria-label="Loading page"
          className="fixed inset-0 z-[1100] flex min-h-svh items-center justify-center overflow-hidden bg-background"
        >
          <div className="relative aspect-square w-[min(217px,calc((100vw-64px)*0.448))]">
            {phase === "burst"
              ? burstTiles.map((tile, index) => (
                  <motion.span
                    key={`${tile.x}-${tile.y}`}
                    aria-hidden="true"
                    className="absolute inset-0 z-2 bg-cover bg-center will-change-transform"
                    initial={{ opacity: 1, rotate: 0, scale: 1, x: 0, y: 0 }}
                    animate={{
                      opacity: 1,
                      rotate: tile.rotate,
                      scale: 0.9,
                      x: tile.x,
                      y: tile.y,
                    }}
                    transition={{
                      delay: index * 0.025,
                      duration: 0.9,
                      ease: [0.72, 0, 1, 1],
                    }}
                    style={{ backgroundImage: `url("${currentImage}")` }}
                  />
                ))
              : null}

            <motion.div
              aria-hidden="true"
              className="relative z-4 size-full bg-cover bg-center will-change-transform"
              animate={
                phase === "burst"
                  ? { rotate: -2, scale: 0.92, y: "-150vh" }
                  : { rotate: 0, scale: 1, y: 0 }
              }
              transition={{ duration: 0.85, ease: [0.72, 0, 1, 1] }}
              style={{ backgroundImage: `url("${currentImage}")` }}
            >
              <div className="absolute inset-0 grid place-items-center">
                <span
                  className="block aspect-345/117 w-25 bg-white
                    [mask:url('/svg/faus-logo.svg')_center/contain_no-repeat]
                    [-webkit-mask:url('/svg/faus-logo.svg')_center/contain_no-repeat]"
                />
              </div>
            </motion.div>
          </div>
        </div>
      ) : null}
    </>
  );
}
