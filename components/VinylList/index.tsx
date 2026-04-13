import Link from "next/link";

import Sleeve from "@/components/Sleeve";

import { Release, Want } from "@/app/discogs";
import { cleanName, slug } from "@/app/utils";

import styles from "./styles.module.css";

interface VinylListProps {
  listType: "collection" | "wants";
  list: Want[] | Release[];
}

export default function VinylList(props: VinylListProps) {
  return (
    <ul className={styles.list}>
      {props.list.map((record, index: number) => (
        <li
          key={record.id}
          className={styles.item}
          style={{ zIndex: 10 + (props.list.length - index) }}
        >
          <Link href={`/vinyl/${record.id}`}>
            <Sleeve
              id={record.id.toString()}
              size={224}
              cover={record.basic_information.cover_image}
            />
            <h2 className={styles.title}>{record.basic_information.title}</h2>
          </Link>

          <Link
            href={`/artist/${slug(record.basic_information.artists[0].name)}`}
            className={styles.artist}
          >
            {cleanName(record.basic_information.artists[0].name)}
          </Link>
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
