import styles from "./styles.module.css";

export default function Footer() {
  return (
    <div className={styles.container}>
      <p className={styles.text}>
        Data fetched from my{" "}
        <a
          href="https://www.discogs.com/user/diegocoxta"
          target="_blank"
          rel="noopener noreferrer"
        >
          Discogs account
        </a>
      </p>
    </div>
  );
}
