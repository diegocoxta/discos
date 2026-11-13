import { repository } from "@/package.json";

import { getProfile } from "@/lib/discogs";

import styles from "./styles.module.css";

const repositoryUrl = repository.url.replace(/^git\+/, "").replace(/\.git$/, "");

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
      <p className={styles.text}>
        <a href={repositoryUrl} target="_blank" rel="noopener noreferrer">
          Código-fonte no GitHub
        </a>
      </p>
    </div>
  );
}
