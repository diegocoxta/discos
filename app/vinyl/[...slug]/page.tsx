import { notFound } from "next/navigation";

import VinylDetails from "@/components/VinylDetails";

import { getCustomFields, getInstance, getRelease } from "@/lib/discogs";

export const revalidate = 3600;
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

  if (slug.length > 2) {
    instance = (await getInstance(id, instanceid)) ?? undefined;
    customFields = await getCustomFields();
  }

  return (
    <VinylDetails
      release={vinyl}
      instance={instance}
      customFields={customFields?.fields}
    />
  );
}
