import Link from "next/link";

import styles from "./styles.module.css";

interface IntroProps {
  total: number;
  since?: number;
}

export default function Intro(props: IntroProps) {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>A coleção de discos do Diego</h2>
      <p className={styles.text}>
        Oi, eu sou o Diego. Estes são os discos que moram na minha estante
        {props.since ? `, colecionados desde ${props.since}` : ""}, e os que
        ainda estou caçando. São {props.total} até agora.
      </p>
      <Link href="/sobre" className={styles.link}>
        Mais sobre a coleção
      </Link>
    </section>
  );
}
