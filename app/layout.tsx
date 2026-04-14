import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";

import "./globals.css";

const sourceSans = Source_Sans_3({
  variable: "--main-primary-font",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "vinyl.",
  description: "My personal collection of vinyl records, and the ones I want.",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sourceSans.variable}`}>
      <body>
        {modal}
        {children}
      </body>
    </html>
  );
}
