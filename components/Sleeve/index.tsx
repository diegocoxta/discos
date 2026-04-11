import { getImageProps } from "next/image";

import Vinyl, { RecordType } from "@/components/Vinyl";

import styles from "./styles.module.css";

interface SleeveProps extends Pick<RecordType, "cover" | "color"> {
  size?: number;
  isOpened?: boolean;
}

export default function Sleeve(props: SleeveProps) {
  const { cover, size = 300, color, isOpened } = props;

  let src = "";

  if (cover) {
    const { props } = getImageProps({
      alt: "",
      src: cover,
      width: size || 300,
      height: size || 300,
      fetchPriority: "high",
    });

    src = props.src;
  }

  return (
    <div
      className={styles.container}
      data-opened={isOpened}
      style={
        {
          "--sleeve-opened-effect": `translateX(${size * 0.5}px) rotate(-10deg)`,
          width: `${isOpened ? size * 1.5 : size}px`,
          height: `${size}px`,
        } as React.CSSProperties
      }
    >
      <div
        className={styles.sleeve}
        style={
          {
            backgroundImage: `url(${src})`,
            width: `${size}px`,
            height: `${size}px`,
          } as React.CSSProperties
        }
      />
      <div className={styles.vinyl}>
        <Vinyl cover={cover} size={size - 20} color={color} />
      </div>
    </div>
  );
}
