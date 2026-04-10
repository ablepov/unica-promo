import { type ReactNode } from "react";
import { Cormorant_Garamond, Manrope } from "next/font/google";

import { ObsidianRouteBodyClass } from "./route-body-class";

const display = Cormorant_Garamond({
  variable: "--font-obsidian-display",
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700"],
});

const sans = Manrope({
  variable: "--font-obsidian-sans",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

export function ObsidianThemeShell({ children }: { children: ReactNode }) {
  return (
    <div className={`${display.variable} ${sans.variable}`}>
      <ObsidianRouteBodyClass />
      {children}
    </div>
  );
}
