import slugify from "slugify";
import { Field, Instance, Note } from "./types";

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
  return new Date(date).toLocaleDateString(undefined, {
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
