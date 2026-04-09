import { getImageProps } from "next/image";

import Vinyl, { VinylProps } from "../Vinyl";

import styles from "./styles.module.css";

interface SleeveProps extends Pick<VinylProps, "color"> {
  cover: string;
  size?: number;
}

export default function Sleeve(props: SleeveProps) {
  const { cover, size = 300, color } = props;

  const {
    props: { src },
  } = getImageProps({
    alt: "",
    src: cover,
    width: size || 300,
    height: size || 300,
    fetchPriority: "high",
  });

  const sizes = { width: `${size}px`, height: `${size}px` };

  return (
    <div className={styles.container} style={sizes}>
      <div
        className={styles.sleeve}
        style={{
          backgroundImage: `url(${src})`,
          ...sizes,
        }}
      />
      <div className={styles.vinyl}>
        <Vinyl cover={cover} size={size - 20} color={color} />
      </div>
    </div>
  );
}
