import Container from "@/components/Container";
import Header from "@/components/Header";
import VinylList from "@/components/VinylList";

import { getCollection, getWishlist } from "../discogs";

export default async function AppPage() {
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
      <VinylList list={wishlist.wants} listType="wants" />
    </Container>
  );
}
