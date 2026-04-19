"use server";

import {
  ApiResponse,
  Field,
  Folder,
  Instance,
  Release,
  ReleaseDetails,
  Want,
} from "@/lib/types";

import { cleanName } from "@/lib/utils";

async function getResource<T>(url: string): Promise<T> {
  try {
    const request = await fetch(`https://api.discogs.com/${url}`, {
      headers: {
        Authorization: `Discogs token=${process.env.DISCOGS_TOKEN}`,
      },
      next: { revalidate: 3600 * 24 },
    });

    console.log(`
      Requesting: ${request.url}
      Status: ${request.status}
      X-Discogs-Ratelimit: ${request.headers.get("X-Discogs-Ratelimit")}
      X-Discogs-Ratelimit-Used : ${request.headers.get("X-Discogs-Ratelimit-Used")}
      X-Discogs-Ratelimit-Remaining: ${request.headers.get("X-Discogs-Ratelimit-Remaining")}
    `);

    const data = await request.json();

    return data as T;
  } catch (error) {
    console.error(error);
    return {} as T;
  }
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

type GetInstanceType = Instance & {
  fields: Field[];
};

export async function getInstance(
  id: string,
  instanceid: string,
): Promise<GetInstanceType> {
  const fieldsData = await getResource<{ fields: Field[] }>(
    `users/diegocoxta/collection/fields`,
  );

  const data = await getResource<GetInstanceType>(
    `users/diegocoxta/collection/folders/0/releases/${id}/instances/${instanceid}`,
  );

  data.fields = fieldsData.fields;

  return data;
}
