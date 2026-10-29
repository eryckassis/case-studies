"use client";

import Link from "next/link";

import type { HeaderNavProps } from "@/types";

import { useMenu } from "./MenuProvider";

const focusClasses =
  "focus-visible:bg-foreground focus-visible:text-background focus-visible:outline-none";

export function HeaderNav({ contactHref }: HeaderNavProps) {
  const { openMenu } = useMenu();
  return (
    <nav
      aria-label="Navegação principal"
      className="col-span-2 col-start-3 md:col-span-1 md:col-start-4 desktop:col-span-2 desktop:col-start-9 desktop:-ml-2.5 desktop:-mt-2.5"
    >
      <ul className="flex select-none flex-col items-start desktop:gap-0.5">
        <li>
          <button
            type="button"
            onClick={openMenu}
            aria-haspopup="dialog"
            className={`${focusClasses} desktop:block desktop:px-2.5 desktop:pt-2.5`}
          >
            MENU
          </button>
        </li>

        <li className="hidden md:block">
          <Link
            href={contactHref}
            className={`${focusClasses} desktop:block desktop:px-2.5 desktop:pb-2.5`}
          >
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}
