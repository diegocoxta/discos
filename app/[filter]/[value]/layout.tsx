import Container from "@/components/Container";
import Header from "@/components/Header";
import Filters from "@/components/Filters";
import Footer from "@/components/Footer";

import {
  getCollection,
  getFolders,
  getProfile,
  getWishlist,
} from "@/lib/discogs";

export default async function FilterLayoutPage({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const collection = await getCollection("0");
  const wishlist = await getWishlist();
  const profile = await getProfile();
  const folders = await getFolders();

  return (
    <Container>
      <Header
        profile={profile}
        counter={{
          wishlist: wishlist.pagination.items,
          collection: collection.pagination.items,
        }}
      />
      {children}
      <Filters folders={folders.folders} />
      <Footer />
    </Container>
  );
}
