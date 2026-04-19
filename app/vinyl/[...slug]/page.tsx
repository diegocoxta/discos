import { notFound } from "next/navigation";

import VinylDetails from "@/components/VinylDetails";

import {
  getCollection,
  getInstance,
  getRelease,
  getWishlist,
} from "@/lib/discogs";
import { slug } from "@/lib/utils";

export const revalidate = 86400;
export const dynamicParams = true;

interface VinylPageProps {
  params: {
    slug: string[];
  };
}

export async function generateStaticParams() {
  const collection = await getCollection("0");
  const wishlist = await getWishlist();

  const collectionItems = collection.releases.map((record) => ({
    slug: [
      record.id.toString(),
      "instance_id" in record && record.instance_id.toString(),
      `${slug(record.basic_information.title)}-${slug(record.basic_information.artists[0].name)}`,
    ],
  }));

  const wishlistItems = wishlist.wants.map((record) => ({
    slug: [
      record.id.toString(),
      `${slug(record.basic_information.title)}-${slug(record.basic_information.artists[0].name)}`,
    ],
  }));

  return [...collectionItems, ...wishlistItems];
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
