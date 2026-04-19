import { notFound } from "next/navigation";

import VinylDetails from "@/components/VinylDetails";

import { getInstance, getRelease } from "@/lib/discogs";

export const revalidate = 86400;
export const dynamicParams = true;

interface VinylPageProps {
  params: {
    slug: string[];
  };
}

export default async function VinylPage(props: VinylPageProps) {
  const { slug } = await props.params;
  const [id, instanceid] = slug;

  const vinyl = await getRelease(id);
  let instance = undefined;

  if (slug.length > 2) {
    instance = await getInstance(id, instanceid);
  }

  if (!vinyl) {
    notFound();
  }

  return <VinylDetails release={vinyl} instance={instance} />;
}
