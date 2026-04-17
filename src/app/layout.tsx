import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Geologica, Wix_Madefor_Display } from "next/font/google";
import "./globals.css";

const geologica = Geologica({
  variable: "--font-promo-sans",
  subsets: ["latin", "cyrillic"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const display = Wix_Madefor_Display({
  variable: "--font-promo-display",
  subsets: ["latin", "cyrillic"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Unica AI | Управляемый запуск AI в enterprise-контуре",
  description:
    "Unica — enterprise AI-платформа для управляемого запуска AI-сценариев: cloud, on-prem, роли, аудит, оркестрация, документы, знания и интеграции.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${geologica.variable} ${display.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
