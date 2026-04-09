import styles from "./page.module.css";

import Sleeve from "@/components/Sleeve";
import Vinyl from "@/components/Vinyl";
import Shelf from "@/components/Shelf";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Sleeve cover={"/covers/juan-luis-guerra-romance-rosa.jpg"} />

        <Vinyl
          cover={"/covers/juan-luis-guerra-romance-rosa.jpg"}
          size={280}
          isPlaying
        />

        <Shelf stackOrder="first-on-top">
          <Sleeve cover={"/covers/karol-g-tropicoqueta.jpg"} color="#428A79" />
          <Sleeve cover={"/covers/juan-luis-guerra-romance-rosa.jpg"} />
          <Sleeve cover={"/covers/karol-g-tropicoqueta.jpg"} color="#428A79" />
          <Sleeve cover={"/covers/juan-luis-guerra-romance-rosa.jpg"} />
          <Sleeve cover={"/covers/karol-g-tropicoqueta.jpg"} color="#428A79" />
          <Sleeve cover={"/covers/juan-luis-guerra-romance-rosa.jpg"} />
        </Shelf>
      </main>
    </div>
  );
}
