import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Unica AI | Obsidian Concept",
  description:
    "Экспериментальный маршрут Unica в стилистике Obsidian: корпоративная AI-платформа, оркестрация, governance, архитектура и демо-заявка.",
};

export default function ObsidianDesignPage() {
  return (
    <div className={`${display.variable} ${sans.variable}`}>
      <ObsidianLanding />
    </div>
  );
}
