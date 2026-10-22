"use client";

import { useCallback, useMemo, useRef, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { animate } from "framer-motion";

import type {
  PageTransitionContextValue,
  ProjectTransitionTarget,
} from "@/types";

import { PageTransitionContext } from "./transition-context";

const CARD_STAGE_DURATION = 1.27;
const MEDIA_STAGE_DURATION = 1.26;
const BACK_STAGE_DURATION = 1.3;
const BACK_STAGE_PAUSE = 0.367;

const CARD_EASE = [0.9, 0, 0.58, 1] as const;
const MORPH_EASE = [0.46, 0, 0.09, 1] as const;
const BACK_EASE = [0.46, 0, 0.09, 0.99] as const;
const COPY_EASE = [0.25, 0.46, 0.45, 0.94] as const;

type TransitionProviderProps = Readonly<{
  children: ReactNode;
}>;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function wait(duration: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, duration * 1000);
  });
}

function isRendered(element: HTMLElement) {
  const rect = element.getBoundingClientRect();

  return rect.width > 0 && rect.height > 0;
}

function findRenderedElement(selector: string, excluded?: HTMLElement) {
  return Array.from(document.querySelectorAll<HTMLElement>(selector)).find(
    (element) => element !== excluded && isRendered(element),
  );
}

function waitForRenderedElement(
  selector: string,
  excluded?: HTMLElement,
  timeout = 5000,
) {
  return new Promise<HTMLElement | null>((resolve) => {
    const existing = findRenderedElement(selector, excluded);

    if (existing) {
      resolve(existing);
      return;
    }

    const observer = new MutationObserver(() => {
      const element = findRenderedElement(selector, excluded);

      if (!element) {
        return;
      }

      observer.disconnect();
      window.clearTimeout(timer);
      resolve(element);
    });

    const timer = window.setTimeout(() => {
      observer.disconnect();
      resolve(null);
    }, timeout);

    observer.observe(document.body, {
      attributes: true,
      childList: true,
      subtree: true,
    });
  });
}

function cloneForTransition(element: HTMLElement, rect: DOMRect) {
  const clone = element.cloneNode(true) as HTMLElement;

  clone.removeAttribute("data-page-transition-surface");
  clone.setAttribute("aria-hidden", "true");
  clone.querySelectorAll<HTMLElement>("[id]").forEach((child) => {
    child.removeAttribute("id");
  });

  Object.assign(clone.style, {
    position: "fixed",
    top: `${rect.top}px`,
    left: `${rect.left}px`,
    width: `${rect.width}px`,
    height: `${rect.height}px`,
    margin: "0",
    pointerEvents: "none",
    transformOrigin: "top left",
    zIndex: "1000",
  });

  document.body.append(clone);
  return clone;
}

function setTransitionState(state: "forward" | "back") {
  document.documentElement.dataset.routeTransition = state;
}

function clearTransitionState() {
  delete document.documentElement.dataset.routeTransition;
}

function restoreStyle(element: HTMLElement, style: string | null) {
  if (!style) {
    element.removeAttribute("style");
    return;
  }

  element.setAttribute("style", style);
}

export function TransitionProvider({ children }: TransitionProviderProps) {
  const router = useRouter();
  const transitioningRef = useRef(false);

  const openProject = useCallback(
    async ({
      href,
      projectId,
      media,
      title,
    }: ProjectTransitionTarget) => {
      if (transitioningRef.current) {
        return;
      }

      if (prefersReducedMotion()) {
        router.push(href);
        return;
      }

      transitioningRef.current = true;
      setTransitionState("forward");

      const mediaRect = media.getBoundingClientRect();
      const mediaClone = cloneForTransition(media, mediaRect);
      const originalStyles = new Map<HTMLElement, string | null>();

      function rememberStyle(element: HTMLElement | null) {
        if (element && !originalStyles.has(element)) {
          originalStyles.set(element, element.getAttribute("style"));
        }
      }

      rememberStyle(media);
      const selectedTitle =
        title.querySelector<HTMLElement>(
          "[data-case-transition-title-inner]",
        ) ?? title;
      rememberStyle(selectedTitle);
      media.style.visibility = "hidden";

      let destination: HTMLElement | null = null;
      let destinationStyle: string | null = null;

      try {
        animate(
          selectedTitle,
          { y: "100%" },
          { duration: CARD_STAGE_DURATION, ease: CARD_EASE },
        );

        await wait(CARD_STAGE_DURATION);

        router.push(href);

        destination = await waitForRenderedElement(
          `[data-project-hero-media="${CSS.escape(projectId)}"]`,
        );

        if (!destination) {
          return;
        }

        destinationStyle = destination.getAttribute("style");
        const destinationRect = destination.getBoundingClientRect();
        const cloneImage = mediaClone.querySelector<HTMLElement>("img");

        animate(
          mediaClone,
          {
            top: destinationRect.top,
            left: destinationRect.left,
            width: destinationRect.width,
            height: destinationRect.height,
          },
          { duration: MEDIA_STAGE_DURATION, ease: MORPH_EASE },
        );

        if (cloneImage) {
          animate(
            cloneImage,
            { scale: 1 },
            { duration: MEDIA_STAGE_DURATION, ease: MORPH_EASE },
          );
        }

        await wait(MEDIA_STAGE_DURATION);

        destination.style.visibility = "visible";
        mediaClone.remove();

        const destinationSurface = destination.closest<HTMLElement>(
          "[data-page-transition-surface]",
        );
        const reveals = Array.from(
          destinationSurface?.querySelectorAll<HTMLElement>(
            "[data-project-reveal]",
          ) ?? [],
        );

        let longestReveal = 0;

        reveals.forEach((element) => {
          const delay = Number(element.dataset.projectRevealDelay ?? 0);
          longestReveal = Math.max(longestReveal, delay + 1);

          animate(
            element,
            { y: "0%" },
            {
              delay,
              duration: 1,
              ease: COPY_EASE,
            },
          );
        });

        await wait(longestReveal);
      } finally {
        mediaClone.remove();
        originalStyles.forEach((style, element) => restoreStyle(element, style));
        clearTransitionState();

        if (destination) {
          restoreStyle(destination, destinationStyle);
        }

        transitioningRef.current = false;
      }
    },
    [router],
  );

  const returnHome = useCallback(
    async (href: string) => {
      if (transitioningRef.current) {
        return;
      }

      if (prefersReducedMotion()) {
        router.push(href);
        return;
      }

      const source = findRenderedElement("[data-page-transition-surface]");

      if (!source) {
        router.push(href);
        return;
      }

      transitioningRef.current = true;
      setTransitionState("back");
      source.dataset.transitionSource = "";

      const sourceRect = source.getBoundingClientRect();
      const sourceClone = cloneForTransition(
        source,
        new DOMRect(0, 0, sourceRect.width, window.innerHeight),
      );
      sourceClone.style.overflow = "hidden";
      sourceClone.style.transformOrigin = "center";
      sourceClone.style.clipPath =
        "polygon(0 0, 100% 0, 100% 100%, 0 100%)";

      let destination: HTMLElement | null = null;
      let destinationStyle: string | null = null;
      const animations: { stop: () => void }[] = [];

      try {
        router.push(href);

        destination = await waitForRenderedElement(
          "[data-page-transition-surface]",
          source,
        );

        if (!destination) {
          return;
        }

        destinationStyle = destination.getAttribute("style");
        const viewportWidth = window.innerWidth;

        Object.assign(destination.style, {
          position: "fixed",
          inset: "0",
          width: "100%",
          height: "100svh",
          overflow: "hidden",
          transformOrigin: "center",
          zIndex: "999",
        });

        animations.push(
          animate(
            destination,
            {
              x: [-viewportWidth, -viewportWidth * 0.3975],
              scale: [1, 0.75],
              clipPath: [
                "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                "polygon(62.6% 0, 100% 0, 100% 100%, 62.6% 100%)",
              ],
            },
            { duration: BACK_STAGE_DURATION, ease: BACK_EASE },
          ),
        );

        animations.push(
          animate(
            sourceClone,
            {
              x: viewportWidth * 0.3975,
              scale: 0.75,
              clipPath: "polygon(0 0, 37.4% 0, 37.4% 100%, 0 100%)",
            },
            { duration: BACK_STAGE_DURATION, ease: BACK_EASE },
          ),
        );

        await wait(BACK_STAGE_DURATION + BACK_STAGE_PAUSE);

        animations.push(
          animate(
            sourceClone,
            {
              x: viewportWidth * 1.3975,
              scale: 0.8625,
            },
            { duration: BACK_STAGE_DURATION, ease: BACK_EASE },
          ),
        );

        animations.push(
          animate(
            destination,
            {
              x: 0,
              scale: 1,
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            },
            {
              delay: 0.069,
              duration: BACK_STAGE_DURATION,
              ease: BACK_EASE,
            },
          ),
        );

        await wait(BACK_STAGE_DURATION + 0.069);
      } finally {
        animations.forEach((animation) => animation.stop());
        sourceClone.remove();
        source.removeAttribute("data-transition-source");
        clearTransitionState();

        if (destination) {
          restoreStyle(destination, destinationStyle);
        }

        transitioningRef.current = false;
      }
    },
    [router],
  );

  const value = useMemo<PageTransitionContextValue>(
    () => ({ openProject, returnHome }),
    [openProject, returnHome],
  );

  return (
    <PageTransitionContext.Provider value={value}>
      {children}
    </PageTransitionContext.Provider>
  );
}
