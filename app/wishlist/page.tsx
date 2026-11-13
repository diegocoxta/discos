import type { Metadata } from "next";

import Container from "@/components/Container";
import Header from "@/components/Header";
import VinylList from "@/components/VinylList";
import Footer from "@/components/Footer";

import { getCollection, getWishlist } from "@/lib/discogs";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Lista de desejos",
  description: "Os discos que o Diego ainda está procurando.",
};

export default async function WishlistPage() {
  const collection = await getCollection("0");
  const wishlist = await getWishlist();

  return (
    <Container>
      <Header
        counter={{
          wishlist: wishlist.pagination.items,
          collection: collection.pagination.items,
        }}
      />
      <VinylList list={wishlist.wants} />
      <Footer />
    </Container>
  );
}
