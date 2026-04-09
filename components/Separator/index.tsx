import styles from "./styles.module.css";

interface SeparatorProps {
  title: string;
  children: React.ReactNode;
}

export default function Separator(props: SeparatorProps) {
  return (
    <div className={styles.separator}>
      <h2>{props.title}</h2>
      <div className={styles.items}>{props.children}</div>
    </div>
  );
}
