import styles from "./page.module.css";

import Sleeve from "@/components/Sleeve";
import Vinyl, { RecordType } from "@/components/Vinyl";
import Shelf from "@/components/Shelf";
import Box from "@/components/Box";
import Swiper from "@/components/Swiper";

export default function Home() {
  const minhaColecao: RecordType[] = [
    {
      id: "1",
      cover: "/covers/karol-g-tropicoqueta.jpg",
      artist: "Peter Frampton",
      title: "Frampton Comes Alive!",
      year: "1976",
      color: "#428A79",
    },
    {
      id: "2",
      cover: "/covers/juan-luis-guerra-romance-rosa.jpg",
      artist: "Pekka Pohjola",
      title: "Space Waltz",
      year: "1985",
    },
    {
      id: "3",
      cover: "/covers/karol-g-tropicoqueta.jpg",
      artist: "King Gizzard & The Lizard Wizard",
      title: "Butterfly 3000",
      year: "2021",
      color: "#428A79",
    },
    {
      id: "4",
      cover: "/covers/karol-g-tropicoqueta.jpg",
      artist: "Peter Frampton",
      title: "Frampton Comes Alive!",
      year: "1976",
      color: "#428A79",
    },
    {
      id: "5",
      cover: "/covers/juan-luis-guerra-romance-rosa.jpg",
      artist: "Pekka Pohjola",
      title: "Space Waltz",
      year: "1985",
    },
    {
      id: "6",
      cover: "/covers/karol-g-tropicoqueta.jpg",
      artist: "King Gizzard & The Lizard Wizard",
      title: "Butterfly 3000",
      year: "2021",
      color: "#428A79",
    },
  ];

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Swiper records={minhaColecao} />

        <Sleeve size={200} {...minhaColecao[1]} />
        <Sleeve color="#428A79" isOpened {...minhaColecao[0]} />
        <Vinyl size={280} isPlaying {...minhaColecao[1]} />

        <Shelf stackOrder="first-on-top" size={200} records={minhaColecao} />

        <Box
          size={100}
          color="#339ee5" // Aquele verde limão que você testou
          records={minhaColecao}
        />
      </main>
    </div>
  );
}
