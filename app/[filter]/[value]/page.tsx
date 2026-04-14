import { notFound } from "next/navigation";

import VinylList from "@/components/VinylList";

import { getCollection, getFolders } from "@/lib/discogs";
import { slug } from "@/lib/utils";

export const revalidate = 86400;
export const dynamicParams = true;

interface FilterPageProps {
  params: {
    value: string;
    filter: string;
  };
}

export async function generateStaticParams() {
  const folders = await getFolders();
  const collection = await getCollection("0");

  return [
    ...folders?.folders?.map((folder) => ({
      filter: "folder",
      value: folder.id.toString(),
    })),
    ...collection?.filters?.artists?.map((artist) => ({
      filter: "artist",
      value: slug(artist),
    })),
    ...collection?.filters?.styles.map((style) => ({
      filter: "style",
      value: slug(style),
    })),
  ];
}

export default async function FilterPage(props: FilterPageProps) {
  const { value, filter } = await props.params;
  const collection = await getCollection(filter === "folder" ? value : "0");

  const list = collection?.releases?.filter((release) => {
    if (filter === "artist") {
      return release.basic_information.artists.some(
        (artist) => slug(artist.name) === slug(value),
      );
    }

    if (filter === "style") {
      return release.basic_information.styles.some(
        (style) => slug(style) === slug(value),
      );
    }

    return true;
  });

  if (!list || list.length === 0) {
    notFound();
  }

  return <VinylList list={list} listType="collection" />;
}
