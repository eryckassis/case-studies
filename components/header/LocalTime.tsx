"use client";

import type { LocalTimeProps } from "@/types";
import { useTheme } from "@/components/theme/ThemeProvider";

export function LocalTime({ label = "Heure locale" }: LocalTimeProps) {
  const { minutes, isTimeTravel, resetTime } = useTheme();

  const hours =
    minutes === null ? "--" : String(Math.floor(minutes / 60)).padStart(2, "0");

  const remainder =
    minutes === null ? "--" : String(minutes % 60).padStart(2, "0");

  const display = `${hours}:${remainder}`;

  return (
    <div className="hidden w-[100px] md:block">
      <div className="flex items-center gap-2">
        <span>{isTimeTravel ? "Voyage temporel" : label}</span>

        {isTimeTravel ? (
          <button
            type="button"
            onClick={resetTime}
            aria-label="Revenir à l’heure locale"
            className="cursor-pointer focus-visible:outline-1
              focus-visible:outline-offset-2 focus-visible:outline-foreground"
          >
            ×
          </button>
        ) : null}
      </div>

      <time
        dateTime={minutes === null ? undefined : display}
        className="block desktop:mt-0.5"
      >
        {hours}
        <span aria-hidden="true">&nbsp;&nbsp;&nbsp;. </span>
        <span className="sr-only">:</span>
        {remainder}
      </time>
    </div>
  );
}
