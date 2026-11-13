import type { Metadata } from "next";

import Container from "@/components/Container";
import SiteHeader from "@/components/SiteHeader";
import Stats from "@/components/Stats";
import Footer from "@/components/Footer";

import { getCollection, getWishlist } from "@/lib/discogs";
import { getCollectionStats } from "@/lib/utils";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Sobre a coleção",
  description:
    "Números e curiosidades da coleção de discos do Diego: artistas, estilos e décadas favoritas.",
};

export default async function AboutPage() {
  const collection = await getCollection("0");
  const wishlist = await getWishlist();
  const stats = getCollectionStats(collection.releases);

  return (
    <Container>
      <SiteHeader />
      <Stats
        {...stats}
        wishlistCount={wishlist.pagination.items}
      />
      <Footer />
    </Container>
  );
}
