import slugify from "slugify";

export function cleanName(name: string) {
  return name.replace(/\s\(\d+\)$/, "").trim();
}

export function slug(name: string) {
  return slugify(name, { lower: true });
}
