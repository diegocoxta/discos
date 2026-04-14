"use server";

import {
  ApiResponse,
  Folder,
  Release,
  ReleaseDetails,
  Want,
} from "@/lib/types";

import { cleanName } from "@/lib/utils";

async function getResource<T>(url: string): Promise<T> {
  const request = await fetch(`https://api.discogs.com/${url}`, {
    headers: {
      Authorization: `Discogs token=${process.env.DISCOGS_TOKEN}`,
    },
    next: { revalidate: 3600 * 24 },
  });

  const data = await request.json();

  return data as T;
}

type GetCollectionType = ApiResponse & {
  releases: Release[];
  filters: {
    artists: string[];
    styles: string[];
  };
};

export async function getCollection(
  folderid: string,
): Promise<GetCollectionType> {
  const data = await getResource<GetCollectionType>(
    `users/diegocoxta/collection/folders/${folderid}/releases?sort=added&sort_order=desc`,
  );

  data.filters = {
    artists: [
      ...new Set(
        data.releases?.flatMap((release) =>
          release.basic_information.artists.map((a) => cleanName(a.name)),
        ),
      ),
    ],
    styles: [
      ...new Set(
        data.releases?.flatMap((release) => release.basic_information.styles),
      ),
    ],
  };

  return data;
}

type GetWishlistType = ApiResponse & {
  wants: Want[];
};

export async function getWishlist(): Promise<GetWishlistType> {
  const data = await getResource<GetWishlistType>(
    "users/diegocoxta/wants?sort=added&sort_order=desc",
  );

  return data;
}

type GetFoldersType = { folders: Folder[] };

export async function getFolders(): Promise<GetFoldersType> {
  const data = await getResource<GetFoldersType>(
    "users/diegocoxta/collection/folders",
  );

  return data;
}

export async function getRelease(id: string): Promise<ReleaseDetails> {
  const data = await getResource<ReleaseDetails>(`releases/${id}`);

  return data;
}
