import Header from "@/components/Header";
import List from "@/components/List";

import { getCollection } from "./discogs";
import Box from "@/components/Box";

export default async function AppPage() {
  const collection = await getCollection();

  return (
    <>
      <Header />
      <List list={collection.releases} listType="collection" />
    </>
  );
}
