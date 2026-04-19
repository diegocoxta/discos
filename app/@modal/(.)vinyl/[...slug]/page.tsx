import Modal from "@/components/Modal";

import VinylPage from "@/app/vinyl/[...slug]/page";
import { getCollection, getWishlist } from "@/lib/discogs";
import { slug } from "@/lib/utils";

interface VinylModalProps {
  params: {
    slug: string[];
  };
}

export const revalidate = 86400;
export const dynamicParams = true;

export async function generateStaticParams() {
  const collection = await getCollection("0");
  const wishlist = await getWishlist();

  const collectionItems = collection.releases.map((record) => ({
    slug: [
      record.id.toString(),
      record.instance_id.toString(),
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

export default async function VinylModal(props: VinylModalProps) {
  const { slug } = await props.params;

  return (
    <Modal>
      <VinylPage params={{ slug }} />
    </Modal>
  );
}
