import Vinyl from "@/components/Vinyl";

import { Profile } from "@/lib/types";

import styles from "./styles.module.css";

interface IntroProps {
  total: number;
  since?: number;
  profile?: Profile | null;
}

function endSentence(text: string) {
  return /[.!?…]$/.test(text) ? text : `${text}.`;
}

export default function Intro(props: IntroProps) {
  const bio = props.profile?.profile?.trim();
  const greeting = bio
    ? endSentence(bio)
    : props.profile?.name
      ? `Oi, eu sou ${props.profile.name}.`
      : "";

  return (
    <section className={styles.container}>
      <div className={styles.avatar}>
        <Vinyl
          size={180}
          cover={props.profile?.avatar_url || undefined}
          coverAlt={props.profile?.name}
        />
      </div>
      <h1 className={styles.title}>Minha estante de discos</h1>
      <p className={styles.text}>
        {greeting ? `${greeting} ` : ""}Estes são os discos que moram na minha
        estante
        {props.since ? `, colecionados desde ${props.since}` : ""}, e os que
        ainda estou caçando. São {props.total} até agora.
      </p>
    </section>
  );
}
