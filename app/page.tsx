import Container from "@/components/Container";
import Header from "@/components/Header";
import VinylList from "@/components/VinylList";
import Filters from "@/components/Filters";
import Footer from "@/components/Footer";
import Intro from "@/components/Intro";

import {
  getCollection,
  getCustomFields,
  getFolders,
  getProfile,
  getWishlist,
} from "@/lib/discogs";

import { sortByAcquisition } from "@/lib/utils";

export const revalidate = 3600;

export default async function RootPage() {
  const collection = await getCollection("0");
  const wishlist = await getWishlist();
  const profile = await getProfile();
  const folders = await getFolders();
  const customFields = await getCustomFields();

  const customFieldDateId = customFields.fields.find(
    (field) => field.name === "Acquisition Date",
  )?.id;

  const listItems = sortByAcquisition(
    collection.releases,
    customFieldDateId,
  );

  const since = listItems.length
    ? new Date(listItems[listItems.length - 1].date_added).getUTCFullYear()
    : undefined;

  return (
    <Container>
      <Intro
        profile={profile}
        total={collection.pagination.items}
        since={since}
      />
      <Header
        counter={{
          wishlist: wishlist.pagination.items,
          collection: collection.pagination.items,
        }}
      />
      <VinylList list={listItems} customFields={customFields.fields} />
      <Filters folders={folders.folders} />
      <Footer />
    </Container>
  );
}
