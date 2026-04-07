import type { ReactNode } from "react";
import type { Metadata } from "next";
import { IBM_Plex_Mono, Onest, Prata } from "next/font/google";
import "./globals.css";

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

const prata = Prata({
  variable: "--font-prata",
  subsets: ["latin", "cyrillic"],
  weight: "400",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
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
      className={`${onest.variable} ${prata.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
