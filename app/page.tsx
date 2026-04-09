import styles from "./page.module.css";

import Sleeve from "@/components/Sleeve";
import Vinyl, { RecordType } from "@/components/Vinyl";
import Shelf from "@/components/Shelf";
import Box from "@/components/Box";
import Swiper from "@/components/Swiper";
import Separator from "@/components/Separator";

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
    {
      id: "7",
      cover: "/covers/juan-luis-guerra-romance-rosa.jpg",
      artist: "Pekka Pohjola",
      title: "Space Waltz",
      year: "1985",
    },
  ];

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Separator title="Component: Vinyl (and variants with custom color, isPlaying and size)">
          <Vinyl {...minhaColecao[1]} />
          <Vinyl color="#428A79" size={200} isPlaying {...minhaColecao[0]} />
        </Separator>

        <Separator title="Component: Sleeve">
          <Sleeve {...minhaColecao[1]} />
        </Separator>
        <Separator title="Component: Sleeve (with custom color, size and opened state)">
          <Sleeve color="#428A79" size={200} isOpened {...minhaColecao[0]} />
        </Separator>

        <Separator title="Component: Box (with custom color, size and different records)">
          <Box size={100} color="#339ee5" records={minhaColecao} />
          <Box size={100} color="#a4e533" records={minhaColecao.slice(4, 7)} />
          <Box size={100} color="#e533ca" records={minhaColecao} />
        </Separator>

        <Separator title="Component: Self">
          <Shelf stackOrder="first-on-top" size={200} records={minhaColecao} />
        </Separator>

        <Separator title="Component: Swiper">
          <Swiper records={minhaColecao} />
        </Separator>
      </main>
    </div>
  );
}
