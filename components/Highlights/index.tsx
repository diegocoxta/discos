import Link from "next/link";

import Sleeve from "@/components/Sleeve";

import { Instance } from "@/lib/types";
import { cleanName, createVinylLink } from "@/lib/utils";

import styles from "./styles.module.css";

interface HighlightsProps {
  title: string;
  records: Instance[];
  colorFieldId?: number;
}

export default function Highlights(props: HighlightsProps) {
  if (props.records.length === 0) return null;

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{props.title}</h2>
      <ul className={styles.list}>
        {props.records.map((record) => (
          <li key={record.instance_id} className={styles.item}>
            <Link href={createVinylLink(record)}>
              <Sleeve
                size={160}
                cover={record.basic_information.cover_image}
                color={
                  record.notes?.find(
                    (note) => note.field_id === props.colorFieldId,
                  )?.value
                }
              />
              <h3 className={styles.recordTitle}>
                {record.basic_information.title}
              </h3>
            </Link>
            <p className={styles.artist}>
              {cleanName(record.basic_information.artists[0].name)}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
