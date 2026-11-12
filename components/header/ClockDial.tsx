"use client";

import { useRef, type KeyboardEvent, type PointerEvent } from "react";

import { useTheme } from "@/components/theme/ThemeProvider";

const MINUTES_PER_DAY = 24 * 60;

function formatTime(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;

  return `${String(hours).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`;
}

export function ClockDial() {
  const { minutes, selectTime } = useTheme();
  const dialRef = useRef<HTMLDivElement>(null);
  const currentMinutes = minutes ?? 0;

  function selectFromPointer(event: PointerEvent<HTMLDivElement>) {
    const rect = dialRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = event.clientX - (rect.left + rect.width / 2);
    const y = event.clientY - (rect.top + rect.height / 2);

    if (x === 0 && y === 0) return;

    const angle = (Math.atan2(x, -y) + 2 * Math.PI) % (2 * Math.PI);
    selectTime((angle / (2 * Math.PI)) * MINUTES_PER_DAY);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    let next = currentMinutes;

    switch (event.key) {
      case "ArrowRight":
      case "ArrowUp":
        next += 15;
        break;
      case "ArrowLeft":
      case "ArrowDown":
        next -= 15;
        break;
      case "PageUp":
        next += 60;
        break;
      case "PageDown":
        next -= 60;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = MINUTES_PER_DAY - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    selectTime(next);
  }

  return (
    <div
      ref={dialRef}
      role="slider"
      tabIndex={0}
      aria-label="Choisir une heure"
      aria-valuemin={0}
      aria-valuemax={MINUTES_PER_DAY - 1}
      aria-valuenow={currentMinutes}
      aria-valuetext={formatTime(currentMinutes)}
      onKeyDown={handleKeyDown}
      onPointerDown={(event) => {
        if (event.button !== 0) return;

        event.currentTarget.setPointerCapture(event.pointerId);
        event.currentTarget.focus();
        selectFromPointer(event);
      }}
      onPointerMove={(event) => {
        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
          selectFromPointer(event);
        }
      }}
      className="absolute right-0 top-0 size-13 touch-none cursor-pointer
        rounded-full border border-current
        focus-visible:outline-2 focus-visible:outline-offset-4
        focus-visible:outline-foreground"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          transform: `rotate(${(currentMinutes / MINUTES_PER_DAY) * 360}deg)`,
        }}
      >
        <span
          className="absolute left-1/2 top-2.5 size-2.25
            -translate-x-1/2 -translate-y-1/2 rounded-full
            border border-current desktop:size-1.75"
        />
      </span>
    </div>
  );
}
