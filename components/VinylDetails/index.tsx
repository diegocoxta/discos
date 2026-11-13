import Sleeve from "@/components/Sleeve";

import { Field, Instance, ReleaseDetails } from "@/lib/types";
import {
  cleanName,
  formatDate,
  mergeNoteData,
  searchSlug,
} from "@/lib/utils";

import styles from "./styles.module.css";

interface VinylDetailsProps {
  release: ReleaseDetails;
  instance?: Instance;
  customFields?: Field[];
  showStores?: boolean;
}

const FIELD_LABELS: Record<string, string> = {
  Color: "Cor",
  "Acquisition Date": "Data de aquisição",
  Source: "Onde comprei",
};

const STORY_FIELD = "Story";

function getStoreLinks(release: ReleaseDetails) {
  const term = `${cleanName(release.artists[0].name)} ${release.title}`;
  const termSlug = searchSlug(term);

  const amazonQuery = new URLSearchParams({
    k: term,
    rh: "p_n_binding_browse-bin:19416266011",
  });

  const amazonUsQuery = new URLSearchParams({
    k: `${term} vinyl`,
    i: "popular",
  });

  return [
    {
      name: "Mercado Livre BR",
      href: `https://lista.mercadolivre.com.br/musica-filmes-seriados/musica/vinil/${termSlug}_NoIndex_True`,
    },
    {
      name: "Mercado Libre AR",
      href: `https://listado.mercadolibre.com.ar/musica-peliculas-series/musica/vinilo/${termSlug}_NoIndex_True`,
    },
    {
      name: "Amazon BR",
      href: `https://www.amazon.com.br/s?${amazonQuery}`,
    },
    {
      name: "Amazon US",
      href: `https://www.amazon.com/s?${amazonUsQuery}`,
    },
  ];
}

export default function VinylDetails(props: VinylDetailsProps) {
  const notes = mergeNoteData(props.instance?.notes, props.customFields);
  const color = notes?.find((note) => note.name === "Color")?.value;
  const fields = notes
    ?.filter((field) => field.public && field.name !== STORY_FIELD)
    .sort((a, b) => a.position! - b.position!);
  const story = notes?.find((note) => note.name === STORY_FIELD)?.value;

  return (
    <div
      className={styles.container}
      style={{
        backgroundColor: color ? `${color}33` : "transparent",
      }}
    >
      <Sleeve
        isOpened
        size={200}
        cover={props.release?.images?.[0]?.uri}
        color={color}
      />
      <div className={styles.details}>
        <h2>{props.release?.title}</h2>
        <p>
          {cleanName(props.release?.artists[0].name)} • {props.release?.year}
        </p>
        {fields && fields.length > 0 && (
          <div
            className={styles.instance}
            style={{
              backgroundColor: color ? `${color}1A` : "#efefef",
            }}
          >
            {fields.map((field) => (
              <p key={field.name}>
                <strong>{FIELD_LABELS[field.name!] ?? field.name}:</strong>
                {field.name?.includes("Date")
                  ? formatDate(field.value)
                  : field.value}
              </p>
            ))}
          </div>
        )}
        {story && <blockquote className={styles.story}>{story}</blockquote>}
        {props.release?.tracklist.length > 0 && (
          <div className={styles.tracklist}>
            <h3>Faixas</h3>
            <ol>
              {props.release.tracklist.map((track, index) => (
                <li key={index} className={styles.track}>
                  {track.position} - {track.title}{" "}
                  <span className={styles.duration}>{track.duration}</span>
                </li>
              ))}
            </ol>
          </div>
        )}
        {props.release?.styles?.length > 0 && (
          <div className={styles.styles}>
            <h3>Estilos</h3>
            <ul>
              {props.release?.styles?.map((style, index) => (
                <li key={`${index}-${style}`}>{style}</li>
              ))}
            </ul>
          </div>
        )}
        {props.showStores && props.release && (
          <div className={styles.stores}>
            <h3>Comprar</h3>
            <ul>
              {getStoreLinks(props.release).map((store) => (
                <li key={store.name}>
                  <a href={store.href} target="_blank" rel="noopener noreferrer">
                    {store.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
