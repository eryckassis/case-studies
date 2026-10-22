"use client";

import { useContext } from "react";

import { PageTransitionContext } from "./transition-context";

export function usePageTransition() {
  const context = useContext(PageTransitionContext);

  if (!context) {
    throw new Error("usePageTransition must be used inside TransitionProvider");
  }

  return context;
}
