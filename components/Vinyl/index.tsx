import Image from "next/image";
import styles from "./styles.module.css";

export interface RecordType {
  id: string;
  cover?: string;
  title: string;
  artist: string;
  year: string;
  color?: string;
}

interface VinylProps extends Pick<RecordType, "cover" | "color"> {
  isPlaying?: boolean;
  size?: number;
}

export default function Vinyl(props: VinylProps) {
  const { cover, color = "#000", isPlaying = false, size = 300 } = props;

  return (
    <div
      className={`${styles.container} ${isPlaying ? styles.playing : ""}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: color, // Injeção dinâmica da cor via props
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
