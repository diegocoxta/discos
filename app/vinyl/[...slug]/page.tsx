import { notFound } from "next/navigation";

import VinylDetails from "@/components/VinylDetails";

import { getCustomFields, getInstance, getRelease } from "@/lib/discogs";

interface VinylPageProps {
  params: {
    slug: string[];
  };
}

export default async function VinylPage(props: VinylPageProps) {
  const { slug } = await props.params;
  const [id, instanceid] = slug;

  const vinyl = await getRelease(id);

  let customFields = undefined;
  let instance = undefined;

  if (slug.length > 2) {
    instance = await getInstance(id, instanceid);
    customFields = await getCustomFields();
  }

  if (!vinyl) {
    notFound();
  }

  return (
    <VinylDetails
      release={vinyl}
      instance={instance}
      customFields={customFields?.fields}
    />
  );
}
