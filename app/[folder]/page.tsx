import { notFound } from "next/navigation";

import Container from "@/components/Container";
import Header from "@/components/Header";
import VinylList from "@/components/VinylList";
import FolderList from "@/components/FolderList";

import { getCollection, getFolders, getWishlist } from "../discogs";

interface FolderPageProps {
  params: {
    folder: string;
  };
}

export default async function FolderPage(props: FolderPageProps) {
  const { folder } = await props.params;
  const collection = await getCollection("0");
  const collectionFolder = await getCollection(folder);
  const wishlist = await getWishlist();
  const folders = await getFolders();
  const currentFolder = folders.folders.find((i) => i.id.toString() === folder);

  if (!currentFolder) {
    notFound();
  }

  return (
    <Container>
      <Header
        counter={{
          wishlist: wishlist.pagination.items,
          collection: collection.pagination.items,
        }}
      />
      <VinylList list={collectionFolder.releases} listType="collection" />
      <FolderList list={folders.folders} />
    </Container>
  );
}
