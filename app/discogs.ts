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

export async function getCollection(folderid: number): Promise<
  ApiResponse & {
    releases: Release[];
  }
> {
  const request = await fetch(
    `https://api.discogs.com/users/diegocoxta/collection/folders/${folderid}/releases?sort=added&sort_order=desc`,
    { next: { revalidate: 3600 } },
  );
  const data = await request.json();

  return data;
}

export async function getWishlist(): Promise<ApiResponse & { wants: Want[] }> {
  const request = await fetch(
    "https://api.discogs.com/users/diegocoxta/wants?sort=added&sort_order=desc",
    { next: { revalidate: 3600 } },
  );
  const data = await request.json();

  return data;
}
