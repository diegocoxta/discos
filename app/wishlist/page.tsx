import type { Metadata } from "next";

import Container from "@/components/Container";
import SiteHeader from "@/components/SiteHeader";
import VinylList from "@/components/VinylList";
import Footer from "@/components/Footer";

import { getWishlist } from "@/lib/discogs";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Lista de desejos",
  description: "Os discos que ainda estou procurando.",
};

export default async function WishlistPage() {
  const wishlist = await getWishlist();

  return (
    <Container>
      <SiteHeader />
      <VinylList list={wishlist.wants} randomHref="/wishlist/random" />
      <Footer />
    </Container>
  );
}
