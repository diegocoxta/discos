import { notFound } from "next/navigation";

import VinylList from "@/components/VinylList";

import { getCollection, getCustomFields, getFolders } from "@/lib/discogs";
import { slug } from "@/lib/utils";
import { Instance } from "@/lib/types";

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
  const customFields = await getCustomFields();

  const customFieldDateId = customFields.fields.find(
    (field) => field.name === "Acquisition Date",
  )?.id;

  const list = collection?.releases
    ?.filter((release) => {
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
    })
    .map((item) => ({
      ...item,
      date_added: item.notes.find((note) => note.field_id === customFieldDateId)
        ?.value,
    }))
    .toSorted((a, b) => {
      return (
        new Date(
          b.notes?.find((note) => note.field_id === customFieldDateId)?.value ??
            "",
        ).getTime() -
        new Date(
          a.notes?.find((note) => note.field_id === customFieldDateId)?.value ??
            "",
        ).getTime()
      );
    }) as Instance[];

  if (!list || list.length === 0) {
    notFound();
  }

  return <VinylList list={list} customFields={customFields.fields} />;
}
