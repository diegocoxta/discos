import Sleeve from "@/components/Sleeve";
import { RecordType } from "@/components/Vinyl";

import styles from "./styles.module.css";

interface ShelfProps {
  stackOrder?: "last-on-top" | "first-on-top";
  records: RecordType[];
  size?: number;
}

export default function Shelf(props: ShelfProps) {
  const { stackOrder = "last-on-top", records = [], size = 200 } = props;

  const totalItems = records.length;

  const isLastOnTop = stackOrder === "last-on-top";
  const shadowClass = isLastOnTop ? styles.shadowLeft : styles.shadowRight;

  return (
    <div className={styles.container}>
      {records.map((record, index) => {
        const currentZIndex = isLastOnTop ? index : totalItems - index;

        return (
          <div
            key={index}
            className={`${styles.item} ${shadowClass}`}
            style={{ zIndex: currentZIndex }}
          >
            <div className={styles.details}>
              {record.title && <p className={styles.tooltip}>{record.title}</p>}
              {record.artist && (
                <p className={styles.tooltip}>{record.artist}</p>
              )}
              {record.year && <p className={styles.tooltip}>{record.year}</p>}
            </div>
            <Sleeve size={size} {...record} />
          </div>
        );
      })}
    </div>
  );
}
