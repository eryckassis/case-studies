"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

const MINUTES_PER_DAY = 24 * 60;

type ThemeContextValue = {
  minutes: number | null;
  isTimeTravel: boolean;
  selectTime: (minutes: number) => void;
  resetTime: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const palette = [
  { minutes: 0, color: [40, 36, 31] },
  { minutes: 5 * 60, color: [48, 43, 38] },
  { minutes: 8 * 60, color: [202, 191, 176] },
  { minutes: 12 * 60, color: [248, 246, 242] },
  { minutes: 17 * 60, color: [224, 211, 194] },
  { minutes: 20 * 60, color: [70, 58, 50] },
  { minutes: MINUTES_PER_DAY, color: [40, 36, 31] },
] as const;

function getLocalMinutes() {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
}

function normalizeMinutes(minutes: number) {
  return (
    ((Math.round(minutes) % MINUTES_PER_DAY) + MINUTES_PER_DAY) %
    MINUTES_PER_DAY
  );
}

function getBackground(minutes: number) {
  const nextIndex = palette.findIndex((stop) => stop.minutes > minutes);
  const from = palette[nextIndex - 1];
  const to = palette[nextIndex];
  const progress = (minutes - from.minutes) / (to.minutes - from.minutes);

  return from.color.map((channel, index) =>
    Math.round(channel + (to.color[index] - channel) * progress),
  );
}

function getLuminance(rgb: number[]) {
  const linear = rgb.map((channel) => {
    const value = channel / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });

  return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [localMinutes, setLocalMinutes] = useState<number | null>(null);
  const [selectedMinutes, setSelectedMinutes] = useState<number | null>(null);

  useEffect(() => {
    const update = () => setLocalMinutes(getLocalMinutes());

    update();
    const intervalId = window.setInterval(update, 60_000);

    return () => window.clearInterval(intervalId);
  }, []);

  const minutes = selectedMinutes ?? localMinutes;

  useEffect(() => {
    if (minutes === null) return;

    const root = document.documentElement;
    const background = getBackground(minutes);
    const isLight = getLuminance(background) > 0.179;

    root.style.setProperty("--background", `rgb(${background.join(" ")})`);
    root.style.setProperty("--foreground", isLight ? "#111111" : "#ffffff");
    root.style.setProperty(
      "--selection-background",
      isLight ? "rgb(68 48 0 / 20%)" : "rgb(255 255 255 / 25%)",
    );
    root.style.colorScheme = isLight ? "light" : "dark";

    return () => {
      root.style.removeProperty("--background");
      root.style.removeProperty("--foreground");
      root.style.removeProperty("--selection-background");
      root.style.removeProperty("color-scheme");
    };
  }, [minutes]);

  return (
    <ThemeContext.Provider
      value={{
        minutes,
        isTimeTravel: selectedMinutes !== null,
        selectTime: (value) => setSelectedMinutes(normalizeMinutes(value)),
        resetTime: () => {
          setLocalMinutes(getLocalMinutes());
          setSelectedMinutes(null);
        },
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}
