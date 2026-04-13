import Image from "next/image";
import styles from "./styles.module.css";

import { colors } from "./colors";

export interface Vinylype {
  id: string;
  cover?: string;
  title: string;
  artist: string;
  year: string;
  color?: string;
}

interface VinylProps extends Pick<Vinylype, "cover" | "color" | "id"> {
  isPlaying?: boolean;
  size?: number;
}

export default function Vinyl(props: VinylProps) {
  const { id, cover, color, isPlaying = false, size = 300 } = props;

  console.log(colors[id]);
  return (
    <div
      className={`${styles.container} ${isPlaying ? styles.playing : ""}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: color || colors[id] || "#000",
      }}
    >
      <div className={styles.branding}>
        {cover && (
          <Image
            width={size}
            height={size}
            src={cover}
            alt="Vinyl Cover"
            className={styles.cover}
          />
        )}
        <div className={styles.hole} />
      </div>
    </div>
  );
}
