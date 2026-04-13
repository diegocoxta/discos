import Container from "@/components/Container";
import Header from "@/components/Header";
import VinylList from "@/components/VinylList";
import Filters from "@/components/Filters";
import Footer from "@/components/Footer";

import { getCollection, getFolders, getWishlist } from "./discogs";

export default async function RootPage() {
  const collection = await getCollection("0");
  const wishlist = await getWishlist();
  const folders = await getFolders();

  return (
    <Container>
      <Header
        counter={{
          wishlist: wishlist.pagination.items,
          collection: collection.pagination.items,
        }}
      />
      <VinylList list={collection.releases} listType="collection" />
      <Filters folders={folders.folders} />
      <Footer />
    </Container>
  );
}
