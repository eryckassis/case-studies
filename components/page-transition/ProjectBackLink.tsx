"use client";

import type { ComponentProps, MouseEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { usePageTransition } from "./usePageTransition";

type ProjectBackLinkProps = ComponentProps<typeof Link>;

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

export function ProjectBackLink({ href, onClick, ...props }: ProjectBackLinkProps) {
  const pathname = usePathname();
  const { returnHome } = usePageTransition();

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);

    if (
      event.defaultPrevented ||
      isModifiedClick(event) ||
      !pathname.startsWith("/work/") ||
      typeof href !== "string"
    ) {
      return;
    }

    event.preventDefault();
    void returnHome(href);
  }

  return <Link href={href} onClick={handleClick} {...props} />;
}
