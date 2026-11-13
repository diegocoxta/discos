import Header from "@/components/Header";
import Intro from "@/components/Intro";

import {
  getCollection,
  getCustomFields,
  getProfile,
  getWishlist,
} from "@/lib/discogs";
import { sortByAcquisition } from "@/lib/utils";

export default async function SiteHeader() {
  const [collection, wishlist, profile, customFields] = await Promise.all([
    getCollection("0"),
    getWishlist(),
    getProfile(),
    getCustomFields(),
  ]);

  const customFieldDateId = customFields.fields.find(
    (field) => field.name === "Acquisition Date",
  )?.id;

  const oldest = sortByAcquisition(collection.releases, customFieldDateId).at(
    -1,
  );

  return (
    <>
      <Intro
        profile={profile}
        total={collection.pagination.items}
        since={oldest && new Date(oldest.date_added).getUTCFullYear()}
      />
      <Header
        counter={{
          wishlist: wishlist.pagination.items,
          collection: collection.pagination.items,
        }}
      />
    </>
  );
}
