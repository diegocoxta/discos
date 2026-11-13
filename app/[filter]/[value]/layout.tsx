import Container from "@/components/Container";
import SiteHeader from "@/components/SiteHeader";
import Filters from "@/components/Filters";
import Footer from "@/components/Footer";

import { getFolders } from "@/lib/discogs";

export default async function FilterLayoutPage({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const folders = await getFolders();

  return (
    <Container>
      <SiteHeader />
      {children}
      <Filters folders={folders.folders} />
      <Footer />
    </Container>
  );
}
