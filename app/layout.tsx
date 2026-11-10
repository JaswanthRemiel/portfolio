import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { getContent } from "@/lib/data";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const { profile } = getContent();

export const metadata: Metadata = {
  title: profile.title,
  description: profile.description,
};

export const viewport: Viewport = {
  themeColor: "#1652d8",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
