import Image from "next/image";

import { RecordType } from "@/components/Vinyl";

import styles from "./styles.module.css";

interface BoxProps {
  size?: number;
  color?: string;
  records?: Pick<RecordType, "cover">[];
}

export default function Box(props: BoxProps) {
  const { size = 200, color = "#f4a6c8", records = [] } = props;
  const displayRecords = records.slice(0, 3);
  const baseScale = size / 100;

  return (
    <div
      className={styles.container}
      style={{
        width: size,
        height: size,
        fontSize: `${baseScale}px`,
      }}
    >
      <div className={styles.coversArea}>
        {displayRecords.map((record, index) => {
          return (
            <Image
              key={index}
              fill
              src={record.cover}
              alt={`Vinyl Cover ${index + 1}`}
              className={styles.coverItem}
              style={{
                zIndex: 10 - index * 2,
                transform: `translateY(-${index * 6}em) scale(${1 - index * 0.05})`,
                filter: `brightness(${1 - index * 0.15})`,
              }}
            />
          );
        })}

        {displayRecords.length === 0 && (
          <div className={styles.coverItem} style={{ zIndex: 10 }} />
        )}
      </div>

      <div className={styles.crateFront}>
        <div className={styles.crateColorLayer}>
          <div
            className={styles.crateHole}
            style={{
              boxShadow: `inset 0 2em 4em rgba(0, 0, 0, 0.4), 0 0 0 500em ${color}`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
