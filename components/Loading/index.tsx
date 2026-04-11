import Vinyl from "@/components/Vinyl";

import styles from "./styles.module.css";

export default function Loading() {
  return (
    <div className={styles.container}>
      <Vinyl isPlaying size={100} />
      <h2>Loading...</h2>
    </div>
  );
}
