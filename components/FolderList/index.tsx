import { Folder } from "@/app/discogs";

import Box from "@/components/Box";

import styles from "./styles.module.css";

interface FolderListProps {
  list: Folder[];
}

export default function FolderList(props: FolderListProps) {
  return (
    <div className={styles.container}>
      {props.list
        .filter((folder) => folder.count > 0)
        .map((folder) => {
          const covers = folder.releases.map(
            (release) => release.basic_information.cover_image,
          );

          return (
            <div className={styles.item} key={folder.id}>
              <Box size={60} covers={covers} color="#323d4d" />
              <div className={styles.info}>
                <p className={styles.name}>{folder.name}</p>
                <p className={styles.count}>{folder.count} items</p>
              </div>
            </div>
          );
        })}
    </div>
  );
}
