import Link from "next/link";

import type { SiteHeaderProps } from "@/types";

import { ClockDial } from "./ClockDial";
import { HeaderBrand } from "./HeaderBrand";
import { HeaderMark } from "./HeaderMark";
import { HeaderNav } from "./HeaderNav";
import { LocalTime } from "./LocalTime";

export function SiteHeader({ brand, menuHref, contactHref }: SiteHeaderProps) {
  return (
    <header
      className=" sticky top-0 z-100 flex h-(--header-height)
        items-center px-(--page-gutter)
        font-sans text-xs/none font-normal tracking-normal uppercase"
    >
      <div
        className="
          grid w-full items-start gap-(--layout-gap)
          grid-cols-[repeat(var(--layout-columns),minmax(0,1fr))]
        "
      >
        <HeaderBrand brand={brand} />

        <HeaderMark />

        <HeaderNav menuHref={menuHref} contactHref={contactHref} />

        <div
          className="
            relative col-span-2 col-start-5 flex justify-between gap-2.75
            md:pl-[24%]
            desktop:col-span-2 desktop:col-start-13 desktop:pl-0
          "
        >
          <Link
            href={contactHref}
            className="md:hidden focus-visible:bg-foreground focus-visible:text-background focus-visible:outline-none"
          >
            Contact
          </Link>

          <LocalTime />

          <ClockDial />
        </div>
      </div>
    </header>
  );
}
