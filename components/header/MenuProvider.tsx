"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { animate, useReducedMotion } from "framer-motion";

type MenuPage = "cases" | "about";

type MenuContextValue = {
  openMenu: () => void;
};

type MenuProviderProps = Readonly<{
  children: ReactNode;
  casesPreview: ReactNode;
  aboutPreview: ReactNode;
}>;

const MenuContext = createContext<MenuContextValue | null>(null);
const EASE = [0.46, 0, 0.09, 1] as const;
const DURATION = 1.3;
const FULL_CLIP = "inset(0% 0% 0% 0%)";
const PREVIEW_CLIP = "inset(0% 62.6% 0% 0%)";

function pageFor(pathname: string): MenuPage {
  return pathname === "/about" ? "about" : "cases";
}

function hrefFor(page: MenuPage) {
  return page === "about" ? "/about" : "/";
}

function cloneSurface() {
  const source = document.querySelector<HTMLElement>(
    "[data-page-transition-surface]",
  );

  if (!source) return null;

  const clone = source.cloneNode(true) as HTMLElement;
  clone.removeAttribute("data-page-transition-surface");
  clone.setAttribute("aria-hidden", "true");
  clone.querySelectorAll<HTMLElement>("[id]").forEach((element) => {
    element.removeAttribute("id");
  });

  Object.assign(clone.style, {
    position: "fixed",
    inset: "0",
    width: "100vw",
    height: "100dvh",
    overflow: "hidden",
    pointerEvents: "none",
    transformOrigin: "center center",
    zIndex: "1",
  });

  return clone;
}

export function MenuProvider({
  children,
  casesPreview,
  aboutPreview,
}: MenuProviderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const reducedMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [sourcePage, setSourcePage] = useState<MenuPage>("cases");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const sourceHostRef = useRef<HTMLDivElement>(null);
  const destinationRef = useRef<HTMLDivElement>(null);
  const sourceCloneRef = useRef<HTMLElement | null>(null);
  const pendingPageRef = useRef<MenuPage | null>(null);
  const busyRef = useRef(false);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const previousOverflowRef = useRef("");

  const destinationPage: MenuPage = sourcePage === "cases" ? "about" : "cases";
  const destinationPreview =
    destinationPage === "cases" ? casesPreview : aboutPreview;

  const cleanup = useCallback(() => {
    sourceCloneRef.current?.remove();
    sourceCloneRef.current = null;
    pendingPageRef.current = null;
    document.documentElement.style.overflow = previousOverflowRef.current;
    dialogRef.current?.close();
    setOpen(false);
    busyRef.current = false;
    previousFocusRef.current?.focus();
  }, []);

  const openMenu = useCallback(() => {
    if (busyRef.current) return;

    const clone = cloneSurface();
    if (!clone) return;

    busyRef.current = true;
    sourceCloneRef.current = clone;
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    previousOverflowRef.current = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    setSourcePage(pageFor(pathname));
    setOpen(true);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const dialog = dialogRef.current;
    const sourceHost = sourceHostRef.current;
    const destination = destinationRef.current;
    const source = sourceCloneRef.current;

    if (!dialog || !sourceHost || !destination || !source) {
      cleanup();
      return;
    }

    dialog.showModal();
    sourceHost.append(source);

    const width = window.innerWidth;
    const duration = reducedMotion ? 0 : DURATION;

    void Promise.all([
      animate(source, { x: width * 0.0745, scale: 0.75, clipPath: PREVIEW_CLIP }, { duration, ease: EASE }),
      animate(destination, { x: [width, width * 0.397], scale: [1, 0.75] }, { duration, ease: EASE }),
    ]).then(() => {
      busyRef.current = false;
    });

    return () => source.remove();
  }, [cleanup, open, reducedMotion]);

  useEffect(() => {
    const pendingPage = pendingPageRef.current;

    if (!open || !pendingPage || pageFor(pathname) !== pendingPage) {
      return;
    }

    let frameOne = 0;
    let frameTwo = 0;

    frameOne = window.requestAnimationFrame(() => {
      frameTwo = window.requestAnimationFrame(() => {
        cleanup();
      });
    });

    return () => {
      window.cancelAnimationFrame(frameOne);
      window.cancelAnimationFrame(frameTwo);
    };
  }, [cleanup, open, pathname]);

  async function closeMenu() {
    const source = sourceCloneRef.current;
    const destination = destinationRef.current;
    if (!source || !destination || busyRef.current) return;

    busyRef.current = true;
    const duration = reducedMotion ? 0 : DURATION;
    await Promise.all([
      animate(source, { x: 0, scale: 1, clipPath: FULL_CLIP }, { duration, ease: EASE }),
      animate(destination, { x: window.innerWidth, scale: 1 }, { duration, ease: EASE }),
    ]);
    cleanup();
  }

  async function selectPage(page: MenuPage) {
    const source = sourceCloneRef.current;
    const destination = destinationRef.current;
    if (!source || !destination || busyRef.current) return;

    if (page === sourcePage) {
      await closeMenu();
      return;
    }

    busyRef.current = true;
    const duration = reducedMotion ? 0 : DURATION;
    await Promise.all([
      animate(source, { x: -window.innerWidth, scale: 0.86 }, { duration, ease: EASE }),
      animate(destination, { x: 0, scale: 1, clipPath: FULL_CLIP }, { duration, ease: EASE }),
    ]);

    pendingPageRef.current = page;
    router.push(hrefFor(page));
  }

  return (
    <MenuContext.Provider value={{ openMenu }}>
      {children}
      <dialog
        ref={dialogRef}
        aria-label="Selecionar página"
        onCancel={(event) => {
          event.preventDefault();
          void closeMenu();
        }}
        className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none overflow-hidden border-0 bg-[#858471] p-0 text-foreground backdrop:bg-[#858471]"
      >
        {open && (
          <>
            <div ref={sourceHostRef} />
            <div
              ref={destinationRef}
              inert
              aria-hidden="true"
              className="pointer-events-none fixed inset-0 z-2 h-dvh w-screen origin-center overflow-hidden"
              style={{ clipPath: PREVIEW_CLIP }}
            >
              {destinationPreview}
            </div>

            <button
              type="button"
              onClick={() => void closeMenu()}
              className="absolute top-4 right-4 z-10 cursor-pointer text-xs leading-none uppercase focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              Close
            </button>

            <div className="absolute inset-0 z-5 flex items-center justify-center gap-[4.2vw]">
              <button
                type="button"
                aria-label={`Abrir ${sourcePage}`}
                onClick={() => void selectPage(sourcePage)}
                className="h-[75dvh] w-[28.05vw] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4"
              />
              <button
                type="button"
                aria-label={`Abrir ${destinationPage}`}
                onClick={() => void selectPage(destinationPage)}
                className="h-[75dvh] w-[28.05vw] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4"
              />
            </div>
          </>
        )}
      </dialog>
    </MenuContext.Provider>
  );
}

export function useMenu() {
  const context = useContext(MenuContext);
  if (!context) throw new Error("useMenu must be used inside MenuProvider");
  return context;
}
