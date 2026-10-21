"use client";

import { useEffect, useState } from "react";
import type { LocalTimeProps } from "@/types";

type LocalTimeValue = {
  display: string;
  iso?: string;
};

const EMPTY_TIME: LocalTimeValue = {
  display: "--:--",
};

const formatter = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

function readLocalTime(): LocalTimeValue {
  const display = formatter.format(new Date());

  return {
    display,
    iso: display,
  };
}

export function LocalTime({ label = "Local time" }: LocalTimeProps) {
  const [time, setTime] = useState<LocalTimeValue>(EMPTY_TIME);

  useEffect(() => {
    const update = () => setTime(readLocalTime());

    update();

    const intervalId = window.setInterval(update, 60_000);

    return () => window.clearInterval(intervalId);
  }, []);

  const [hours, minutes] = time.display.split(":");

  return (
    <div className="hidden w-[100px] md:block">
      <span className="block">{label}</span>

      <time dateTime={time.iso} className="block desktop:mt-0.5">
        {hours}
        <span aria-hidden="true">&nbsp;&nbsp;&nbsp;. </span>
        <span className="sr-only">:</span>
        {minutes}
      </time>
    </div>
  );
}
