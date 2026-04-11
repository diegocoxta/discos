import Header from "@/components/Header";
import List from "@/components/List";

import { getWants } from "../discogs";

export default async function AppPage() {
  const collection = await getWants();

  return (
    <>
      <Header />
      <List list={collection.wants} listType="wants" />
    </>
  );
}
