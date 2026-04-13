import { notFound } from "next/navigation";

import VinylDetails from "@/components/VinylDetails";

import { getCollection, getRelease } from "@/app/discogs";

export const revalidate = 86400;
export const dynamicParams = true;

interface VinylPageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  const collection = await getCollection("0");

  return collection?.releases?.map((record) => ({
    id: record.id.toString(),
  }));
}

export default async function VinylPage(props: VinylPageProps) {
  const { id } = await props.params;
  const vinyl = await getRelease(id);

  if (!vinyl) {
    notFound();
  }

  return <VinylDetails release={vinyl} />;
}
