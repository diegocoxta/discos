import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";

import "./globals.css";

const sourceSans = Source_Sans_3({
  variable: "--main-primary-font",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const description =
  "A coleção pessoal de discos de vinil do Diego Costa: o que está na estante e o que ainda está na lista de desejos.";

export const metadata: Metadata = {
  metadataBase: new URL("https://discos.diegocoxta.com"),
  title: {
    default: "discos. — a coleção de vinis do Diego Costa",
    template: "%s | discos.",
  },
  description,
  openGraph: {
    title: "discos. — a coleção de vinis do Diego Costa",
    description,
    siteName: "discos.",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${sourceSans.variable}`}>
      <body>
        {modal}
        {children}
      </body>
    </html>
  );
}
