"use server";

export interface ApiResponse {
  pagination: Pagination;
}
export interface Root {
  pagination: Pagination;
  releases: Release[];
}

export interface Pagination {
  page: number;
  pages: number;
  per_page: number;
  items: number;
  urls: Urls;
}

export interface Urls {
  next: string;
  last: string;
}

export interface Want {
  id: number;
  resource_url: string;
  date_added: string;
  basic_information: BasicInformation;
  rating: number;
}

export interface Release {
  id: number;
  instance_id: number;
  date_added: string;
  rating: number;
  basic_information: BasicInformation;
}

export interface BasicInformation {
  id: number;
  master_id: number;
  master_url?: string;
  resource_url: string;
  thumb: string;
  cover_image: string;
  title: string;
  year: number;
  formats: Format[];
  labels: Label[];
  artists: Artist[];
  genres: string[];
  styles: string[];
}

export interface Format {
  name: string;
  qty: string;
  text?: string;
  descriptions: string[];
}

export interface Label {
  name: string;
  catno: string;
  entity_type: string;
  entity_type_name: string;
  id: number;
  resource_url: string;
}

export interface Artist {
  name: string;
  anv: string;
  join: string;
  role: string;
  tracks: string;
  id: number;
  resource_url: string;
}

export interface Folder {
  id: number;
  name: string;
  count: number;
  resource_url: string;
  releases: Release[];
}

async function getResource(url: string) {
  const request = await fetch(`https://api.discogs.com/${url}`, {
    headers: {
      Authorization: `Discogs token=${process.env.DISCOGS_TOKEN}`,
    },
    next: { revalidate: 3600 * 24 },
  });

  const data = await request.json();

  return data;
}

export async function getCollection(folderid: number): Promise<
  ApiResponse & {
    releases: Release[];
  }
> {
  const data = await getResource(
    `users/diegocoxta/collection/folders/${folderid}/releases?sort=added&sort_order=desc`,
  );

  return data;
}

export async function getWishlist(): Promise<ApiResponse & { wants: Want[] }> {
  const data = await getResource(
    "users/diegocoxta/wants?sort=added&sort_order=desc",
  );

  return data;
}

export async function getFolders(): Promise<{ folders: Folder[] }> {
  const data = await getResource("users/diegocoxta/collection/folders");

  for (const folder of data.folders) {
    const releases = await getCollection(folder.id);
    folder.releases = releases.releases;
  }

  return data;
}
