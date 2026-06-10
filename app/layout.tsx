import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Panoplia — The Full Armor of Truth",
  description:
    "AI-powered government transparency platform. Fighting waste, corruption, and crime with data, accountability, and truth.",
  keywords: [
    "government transparency",
    "anti-corruption",
    "accountability",
    "AI analysis",
    "civic tech",
  ],
  openGraph: {
    title: "Panoplia — The Full Armor of Truth",
    description: "AI-powered government transparency and accountability platform.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full`}>
      <body
        className="min-h-full antialiased"
        style={{ background: "var(--background)", color: "var(--foreground)" }}
      >
        {children}
      </body>
    </html>
  );
}
