import Sleeve from "@/components/Sleeve";

import { Release, Want } from "@/app/discogs";

import { colors } from "./colors";

import styles from "./styles.module.css";

interface ListProps {
  listType: "collection" | "wants";
  list: Want[] | Release[];
}

export default function List(props: ListProps) {
  return (
    <ul className={styles.list}>
      {props.list.map((record, index: number) => (
        <li
          key={record.id}
          className={styles.item}
          style={{ zIndex: 10 + (props.list.length - index) }}
        >
          <Sleeve
            color={colors[record.id] || "#000"}
            size={224}
            cover={record.basic_information.cover_image}
          />
          <h2 className={styles.title}>{record.basic_information.title}</h2>
          <p className={styles.artist}>
            {record.basic_information.artists[0].name}
          </p>
          <p className={styles.date}>
            Added on{" "}
            {new Date(record.date_added).toLocaleDateString(undefined, {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>
        </li>
      ))}
    </ul>
  );
}
