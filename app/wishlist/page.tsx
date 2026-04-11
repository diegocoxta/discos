import Header from "@/components/Header";
import List from "@/components/List";

import { getCollection, getWishlist } from "../discogs";

export default async function AppPage() {
  const collection = await getCollection(0);
  const wishlist = await getWishlist();

  return (
    <>
      <Header
        counter={{
          wishlist: wishlist.pagination.items,
          collection: collection.pagination.items,
        }}
      />
      <List list={wishlist.wants} listType="wants" />
    </>
  );
}
