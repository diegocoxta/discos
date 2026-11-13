import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";

import { getProfile } from "@/lib/discogs";

import "./globals.css";

const sourceSans = Source_Sans_3({
  variable: "--main-primary-font",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getProfile();
  const title = profile?.name
    ? `discos. — a coleção de vinis de ${profile.name}`
    : "discos. — minha coleção de vinis";
  const description = profile?.name
    ? `A coleção pessoal de discos de vinil de ${profile.name}: o que está na estante e o que ainda está na lista de desejos.`
    : "Minha coleção pessoal de discos de vinil: o que está na estante e o que ainda está na lista de desejos.";

  return {
    metadataBase: process.env.SITE_URL
      ? new URL(process.env.SITE_URL)
      : undefined,
    title: {
      default: title,
      template: "%s | discos.",
    },
    description,
    openGraph: {
      title,
      description,
      siteName: "discos.",
      type: "website",
      locale: "pt_BR",
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

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
