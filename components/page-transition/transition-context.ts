"use client";

import { createContext } from "react";

import type { PageTransitionContextValue } from "@/types";

export const PageTransitionContext =
  createContext<PageTransitionContextValue | null>(null);
