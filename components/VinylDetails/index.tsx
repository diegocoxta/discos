import Sleeve from "@/components/Sleeve";
import { colors } from "@/components/Vinyl/colors";

import { Instance, ReleaseDetails } from "@/lib/types";
import { cleanName } from "@/lib/utils";

import styles from "./styles.module.css";

interface VinylDetailsProps {
  release: ReleaseDetails;
  instance?: Instance;
}

export default function VinylDetails(props: VinylDetailsProps) {
  return (
    <div
      className={styles.container}
      style={{
        backgroundColor: colors[props.release.id]
          ? `${colors[props.release.id]}1A`
          : "transparent",
      }}
    >
      <Sleeve
        isOpened
        size={200}
        cover={props.release?.images[0].uri}
        id={props.release?.id.toString()}
      />
      <div className={styles.details}>
        <h2>{props.release?.title}</h2>
        <p>
          {cleanName(props.release?.artists[0].name)} • {props.release?.year}
        </p>
        {props.instance?.notes && props.instance?.notes.length > 0 && (
          <div className={styles.instance}>
            {props.instance?.fields
              ?.filter((field) => field.public)
              ?.sort((a, b) => a.position - b.position)
              ?.map((field) => (
                <p key={field.name}>
                  <strong>{field.name}:</strong>
                  {
                    props.instance?.notes?.find(
                      (note) => note.field_id === field.id,
                    )?.value
                  }
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
