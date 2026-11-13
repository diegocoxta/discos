import styles from "./styles.module.css";

type RankingType = { name: string; count: number }[];

interface StatsProps {
  total: number;
  artistCount: number;
  wishlistCount: number;
  topDecade?: { name: string; count: number };
  topArtists: RankingType;
  topStyles: RankingType;
}

function Ranking(props: { title: string; items: RankingType }) {
  if (props.items.length === 0) return null;

  return (
    <div className={styles.ranking}>
      <h3>{props.title}</h3>
      <ol>
        {props.items.map((item) => (
          <li key={item.name}>
            <span>{item.name}</span>
            <span className={styles.count}>{item.count}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function Stats(props: StatsProps) {
  const numbers = [
    { label: "discos na estante", value: props.total },
    { label: "artistas diferentes", value: props.artistCount },
    { label: "na lista de desejos", value: props.wishlistCount },
    ...(props.topDecade
      ? [{ label: "década favorita", value: props.topDecade.name }]
      : []),
  ];

  return (
    <div className={styles.container}>
      <ul className={styles.numbers}>
        {numbers.map((item) => (
          <li key={item.label}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
      <div className={styles.rankings}>
        <Ranking title="Artistas mais presentes" items={props.topArtists} />
        <Ranking title="Estilos mais presentes" items={props.topStyles} />
      </div>
    </div>
  );
}
