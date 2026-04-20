import Container from "@/components/Container";
import Header from "@/components/Header";
import VinylList from "@/components/VinylList";
import Filters from "@/components/Filters";
import Footer from "@/components/Footer";

import {
  getCollection,
  getCustomFields,
  getFolders,
  getWishlist,
} from "@/lib/discogs";
import { mergeNoteData } from "@/lib/utils";
import { Instance } from "@/lib/types";

export default async function RootPage() {
  const collection = await getCollection("0");
  const wishlist = await getWishlist();
  const folders = await getFolders();
  const customFields = await getCustomFields();

  const customFieldDateId = customFields.fields.find(
    (field) => field.name === "Acquisition Date",
  )?.id;

  const listItems = collection.releases
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

  return (
    <Container>
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
