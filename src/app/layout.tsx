import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Unica AI",
  description: "Enterprise AI platform for controlled rollout in cloud, on-prem, and hybrid contours.",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/unica-logo.svg", type: "image/svg+xml" },
    ],
    shortcut: [{ url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ru" className="h-full antialiased">
      <body className="min-h-full bg-[var(--page)] text-[var(--ink)]">{children}</body>
    </html>
  );
}
