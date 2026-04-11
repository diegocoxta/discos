import Container from "@/components/Container";
import Header from "@/components/Header";
import FolderList from "@/components/FolderList";
import Footer from "@/components/Footer";

import { getCollection, getFolders, getWishlist } from "@/app/discogs";

export default async function FolderLayoutPage({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
      {children}
      <FolderList list={folders.folders} />
      <Footer />
    </Container>
  );
}
