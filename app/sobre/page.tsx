import type { Metadata } from "next";

import Container from "@/components/Container";
import SiteHeader from "@/components/SiteHeader";
import Stats from "@/components/Stats";
import Footer from "@/components/Footer";

import { getCollection, getWishlist } from "@/lib/discogs";
import { getCollectionStats } from "@/lib/utils";

import styles from "./styles.module.css";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Sobre a coleção",
  description:
    "Números e curiosidades da coleção de discos do Diego: artistas, estilos e décadas favoritas.",
};

export default async function AboutPage() {
  const collection = await getCollection("0");
  const wishlist = await getWishlist();
  const stats = getCollectionStats(collection.releases);

  return (
    <Container>
      <SiteHeader />
      <section className={styles.intro}>
        <h2>Sobre a coleção</h2>
        <p>
          Tudo começou com um disco e virou uma estante inteira. Aqui estão os
          números do que eu ouvi, comprei e guardei até agora.
        </p>
      </section>
      <Stats
        {...stats}
        wishlistCount={wishlist.pagination.items}
      />
      <Footer />
    </Container>
  );
}
