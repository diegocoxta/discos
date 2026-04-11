import styles from "./styles.module.css";

export default function Container(props: React.PropsWithChildren) {
  return <div className={styles.container}>{props.children}</div>;
}
