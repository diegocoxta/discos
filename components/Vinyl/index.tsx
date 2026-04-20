import Image from "next/image";
import styles from "./styles.module.css";

export interface Vinylype {
  cover?: string;
  title: string;
  artist: string;
  year: string;
  color?: string;
}

interface VinylProps extends Pick<Vinylype, "cover" | "color"> {
  isPlaying?: boolean;
  size?: number;
}

export default function Vinyl(props: VinylProps) {
  const { cover, color, isPlaying = false, size = 300 } = props;

  return (
    <div
      className={`${styles.container} ${isPlaying ? styles.playing : ""}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: color || "#000",
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
