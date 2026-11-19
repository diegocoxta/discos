import { notFound } from "next/navigation";

import VinylDetails from "@/components/VinylDetails";

import {
  getCustomFields,
  getInstance,
  getRelease,
  getWishlist,
} from "@/lib/discogs";

export const revalidate = 300;
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

  if (!vinyl) {
    notFound();
  }

  let customFields = undefined;
  let instance = undefined;
  let streamingUrl = undefined;

  if (slug.length > 2) {
    instance = (await getInstance(id, instanceid)) ?? undefined;
    customFields = await getCustomFields();
  } else {
    // Wishlist items have no custom fields, so their link lives in the notes.
    const want = (await getWishlist()).wants.find(
      (want) => String(want.id) === id,
    );
    streamingUrl = want?.notes?.match(/https?:\/\/\S+/)?.[0];
  }

  return (
    <VinylDetails
      release={vinyl}
      instance={instance}
      customFields={customFields?.fields}
      showStores={slug.length <= 2}
      streamingUrl={streamingUrl}
    />
  );
}
