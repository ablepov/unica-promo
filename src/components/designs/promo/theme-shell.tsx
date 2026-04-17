import { type ReactNode } from "react";
import { Cormorant_Garamond, Manrope } from "next/font/google";

import { PromoRouteBodyClass } from "./route-body-class";

const display = Cormorant_Garamond({
  variable: "--font-promo-display",
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700"],
});

const sans = Manrope({
  variable: "--font-promo-sans",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

export function PromoThemeShell({ children }: { children: ReactNode }) {
  return (
    <div className={`${display.variable} ${sans.variable}`}>
      <PromoRouteBodyClass />
      {children}
    </div>
  );
}
