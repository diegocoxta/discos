import { getProfile } from "@/lib/discogs";

import styles from "./styles.module.css";

export default async function Footer() {
  const profile = await getProfile();

  return (
    <div className={styles.container}>
      <p className={styles.text}>
        {profile?.name ? `Feito por ${profile.name}. ` : ""}Os dados vêm da{" "}
        <a
          href={`https://www.discogs.com/user/${process.env.DISCOGS_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          minha conta no Discogs
        </a>
        .
      </p>
    </div>
  );
}
