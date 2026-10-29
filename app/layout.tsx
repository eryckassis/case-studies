import type { Metadata } from "next";
import localFont from "next/font/local";

import { Grain } from "@/components/grain";
import { MenuProvider } from "@/components/header/MenuProvider";
import { AboutPage } from "@/components/pages/AboutPage";
import { CasesPage } from "@/components/pages/CasesPage";
import { TransitionProvider } from "@/components/page-transition";

import "lenis/dist/lenis.css";
import "./globals.css";

const helveticaNow = localFont({
  src: "../public/fonts/HelveticaNowVar-Regular.woff2",
  variable: "--font-helvetica-now",
  weight: "100 900",
  style: "normal",
  display: "swap",
  fallback: ["Arial", "Helvetica", "sans-serif"],
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "Case Studies",
    template: "%s - Case Studies",
  },
  description: "Selected work, design projects and case studies.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${helveticaNow.variable} h-full`}>
      <body className="flex min-h-full flex-col antialiased">
        <TransitionProvider>
          <MenuProvider
            casesPreview={<CasesPage />}
            aboutPreview={<AboutPage />}
          >
            {children}
          </MenuProvider>
        </TransitionProvider>
        <Grain />
      </body>
    </html>
  );
}
