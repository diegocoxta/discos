import slugify from "slugify";
import { Field, Instance, Note, Release, Want } from "./types";

export function cleanName(name: string) {
  return name.replace(/\s\(\d+\)$/, "").trim();
}

export function slug(name: string) {
  return slugify(name, { lower: true });
}

export function searchSlug(term: string) {
  return slugify(term, { lower: true, strict: true });
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("pt-BR", {
    timeZone: "UTC",
    month: "long",
    year: "numeric",
  });
}

export function sortByAcquisition(
  releases: Instance[],
  acquisitionFieldId?: number,
): Instance[] {
  return releases
    .map((release) => ({
      ...release,
      date_added:
        release.notes?.find((note) => note.field_id === acquisitionFieldId)
          ?.value ?? release.date_added,
    }))
    .toSorted(
      (a, b) =>
        new Date(b.date_added).getTime() - new Date(a.date_added).getTime(),
    );
}

export function mergeNoteData(notes?: Note[], customFields?: Field[]) {
  return (
    notes &&
    notes.map((note) => {
      const field = customFields?.find((field) => field.id === note.field_id);
      return { ...note, ...field };
    })
  );
}

export function createVinylLink(record: Want | Release) {
  return `/vinyl/${record.id}${"instance_id" in record ? `/${record.instance_id}` : ""}/${slug(record.basic_information.title)}-${slug(
    record.basic_information.artists[0].name,
  )}`;
}

function countBy(values: string[]) {
  const counts = new Map<string, number>();

  values.forEach((value) => counts.set(value, (counts.get(value) ?? 0) + 1));

  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .toSorted((a, b) => b.count - a.count);
}

export function getCollectionStats(releases: Instance[]) {
  const artists = countBy(
    releases.flatMap((release) =>
      release.basic_information.artists.map((artist) =>
        cleanName(artist.name),
      ),
    ),
  );

  const decades = countBy(
    releases
      .filter((release) => release.basic_information.year > 0)
      .map(
        (release) =>
          `${Math.floor(release.basic_information.year / 10) * 10}s`,
      ),
  );

  const styles = countBy(
    releases.flatMap((release) => release.basic_information.styles),
  );

  return {
    total: releases.length,
    artistCount: artists.length,
    topArtists: artists.slice(0, 5),
    topDecade: decades[0],
    topStyles: styles.slice(0, 5),
  };
}
