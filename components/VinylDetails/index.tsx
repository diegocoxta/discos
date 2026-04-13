import Sleeve from "@/components/Sleeve";

import { ReleaseDetails } from "@/app/discogs";

import styles from "./styles.module.css";
import { cleanName } from "@/app/utils";
import { colors } from "../Vinyl/colors";

interface VinylDetailsProps {
  release: ReleaseDetails;
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
        size={224}
        cover={props.release?.images[0].uri}
        id={props.release?.id.toString()}
      />
      <div className={styles.details}>
        <h2>{props.release?.title}</h2>
        <p className={styles.artist}>
          {cleanName(props.release?.artists[0].name)}
        </p>
        <p className={styles.year}>{props.release?.year}</p>
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
                <li key={index}>{style}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
