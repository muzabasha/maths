import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Math Explorer – From Zero to Excellence",
  description:
    "An interactive applied mathematics presentation for 10th standard students. Explore polynomials, optimization, and real-world problem solving through fun stories and games.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${outfit.variable} antialiased dark`}
        style={{ fontFamily: "var(--font-outfit), var(--font-inter), sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
