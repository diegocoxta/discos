import styles from "./styles.module.css";

export default function Footer() {
  return (
    <div className={styles.container}>
      <p className={styles.text}>
        Feito por Diego Costa. Os dados vêm da{" "}
        <a
          href="https://www.discogs.com/user/diegocoxta"
          target="_blank"
          rel="noopener noreferrer"
        >
          minha conta no Discogs
        </a>
        .
      </p>
      <p className={styles.text}>
        <a
          href="https://github.com/diegocoxta/discos"
          target="_blank"
          rel="noopener noreferrer"
        >
          Código-fonte no GitHub
        </a>
      </p>
    </div>
  );
}
