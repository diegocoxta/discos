import Container from "@/components/Container";
import SiteHeader from "@/components/SiteHeader";
import VinylList from "@/components/VinylList";
import Filters from "@/components/Filters";
import Footer from "@/components/Footer";

import {
  getCollection,
  getCustomFields,
  getFolders,
} from "@/lib/discogs";

import { sortByAcquisition } from "@/lib/utils";

export const revalidate = 300;

export default async function RootPage() {
  const collection = await getCollection("0");
  const folders = await getFolders();
  const customFields = await getCustomFields();

  const customFieldDateId = customFields.fields.find(
    (field) => field.name === "Acquisition Date",
  )?.id;

  const listItems = sortByAcquisition(
    collection.releases,
    customFieldDateId,
  );

  return (
    <Container>
      <SiteHeader />
      <VinylList list={listItems} customFields={customFields.fields} />
      <Filters folders={folders.folders} />
      <Footer />
    </Container>
  );
}
