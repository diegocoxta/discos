import { notFound } from "next/navigation";

import VinylList from "@/components/VinylList";

import { getCollection, getFolders } from "@/app/discogs";

export const revalidate = 86400;
export const dynamicParams = true;

interface FolderPageProps {
  params: {
    folder: string;
  };
}

export async function generateStaticParams() {
  const folders = await getFolders();

  return folders.folders.map((folder) => ({ folder: folder.id.toString() }));
}

export default async function FolderPage(props: FolderPageProps) {
  const { folder } = await props.params;
  const collectionFolder = await getCollection(folder);

  if (collectionFolder.pagination.items === 0) {
    notFound();
  }

  return <VinylList list={collectionFolder.releases} listType="collection" />;
}
