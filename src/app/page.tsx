import { Cormorant_Garamond, Manrope } from "next/font/google";

import { ObsidianLanding } from "@/components/designs/obsidian/landing";

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

export default function Home() {
  return (
    <div className={`${display.variable} ${sans.variable}`}>
      <ObsidianLanding />
    </div>
  );
}
