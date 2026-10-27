import Sleeve from "@/components/Sleeve";

import { Field, Instance, ReleaseDetails } from "@/lib/types";
import { cleanName, formatDate, mergeNoteData } from "@/lib/utils";

import styles from "./styles.module.css";

interface VinylDetailsProps {
  release: ReleaseDetails;
  instance?: Instance;
  customFields?: Field[];
}

export default function VinylDetails(props: VinylDetailsProps) {
  const notes = mergeNoteData(props.instance?.notes, props.customFields);
  const color = notes?.find((note) => note.name === "Color")?.value;

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
        {notes && notes.length > 0 && (
          <div
            className={styles.instance}
            style={{
              backgroundColor: color ? `${color}1A` : "#efefef",
            }}
          >
            {notes
              ?.filter((field) => field.public)
              ?.sort((a, b) => a.position! - b.position!)
              ?.map((field) => (
                <p key={field.name}>
                  <strong>{field.name}:</strong>
                  {field.name?.includes("Date")
                    ? formatDate(field.value)
                    : field.value}
                </p>
              ))}
          </div>
        )}
        {props.release?.tracklist.length > 0 && (
          <div className={styles.tracklist}>
            <h3>Tracklist</h3>
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
            <h3>Styles</h3>
            <ul>
              {props.release?.styles?.map((style, index) => (
                <li key={`${index}-${style}`}>{style}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
