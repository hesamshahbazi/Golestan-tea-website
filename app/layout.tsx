import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/lib/lang";

const cormorant = Cormorant_Garamond({
  weight: ["300", "400"],
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  weight: ["300", "400"],
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GOLESTAN TEA — Premium Persian-Inspired Teas",
  description:
    "Where ritual meets refinement. Discover Golestan's luxury collection of Persian-inspired teas, born from centuries of tradition.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="bg-pure-black text-off-white font-inter overflow-x-hidden">
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
