"use server";

import {
  ApiResponse,
  Field,
  Folder,
  Instance,
  Pagination,
  Profile,
  ReleaseDetails,
  Want,
} from "@/lib/types";

import { cleanName } from "@/lib/utils";

const PER_PAGE = 100;

const EMPTY_PAGINATION: Pagination = {
  page: 1,
  pages: 1,
  per_page: PER_PAGE,
  items: 0,
  urls: { next: "", last: "" },
};

async function getResource<T>(url: string): Promise<T | null> {
  try {
    const request = await fetch(`https://api.discogs.com/${url}`, {
      headers: {
        Authorization: `Discogs token=${process.env.DISCOGS_TOKEN}`,
      },
      next: { revalidate: 3600, tags: ['discogs'] },
    });

    if (!request.ok) {
      console.error(
        `[discogs] ${request.status} ${request.statusText} — ${url}`,
      );
      return null;
    }

    return (await request.json()) as T;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function getAllPages<K extends string, I>(
  url: string,
  key: K,
): Promise<ApiResponse & Record<K, I[]>> {
  type PageType = ApiResponse & Record<K, I[]>;

  const separator = url.includes("?") ? "&" : "?";
  const getPage = (page: number) =>
    getResource<PageType>(`${url}${separator}per_page=${PER_PAGE}&page=${page}`);

  const first = await getPage(1);

  if (!first) {
    return { pagination: EMPTY_PAGINATION, [key]: [] } as unknown as PageType;
  }

  const remaining = await Promise.all(
    Array.from({ length: first.pagination.pages - 1 }, (_, index) =>
      getPage(index + 2),
    ),
  );

  return {
    ...first,
    [key]: [first, ...remaining].flatMap((page) => page?.[key] ?? []),
  };
}

type GetCollectionType = ApiResponse & {
  releases: Instance[];
  filters: {
    artists: string[];
    styles: string[];
    genres: string[];
  };
};

export async function getCollection(
  folderid: string,
): Promise<GetCollectionType> {
  const data = await getAllPages<"releases", Instance>(
    `users/diegocoxta/collection/folders/${folderid}/releases?sort=added&sort_order=desc`,
    "releases",
  );

  return {
    ...data,
    filters: {
      artists: [
        ...new Set(
          data.releases.flatMap((release) =>
            release.basic_information.artists.map((a) => cleanName(a.name)),
          ),
        ),
      ],
      styles: [
        ...new Set(
          data.releases.flatMap((release) => release.basic_information.styles),
        ),
      ],
      genres: [
        ...new Set(
          data.releases.flatMap((release) => release.basic_information.genres),
        ),
      ],
    },
  };
}

type GetWishlistType = ApiResponse & {
  wants: Want[];
};

export async function getWishlist(): Promise<GetWishlistType> {
  return getAllPages<"wants", Want>(
    "users/diegocoxta/wants?sort=added&sort_order=desc",
    "wants",
  );
}

type GetFoldersType = { folders: Folder[] };

export async function getFolders(): Promise<GetFoldersType> {
  const data = await getResource<GetFoldersType>(
    "users/diegocoxta/collection/folders",
  );

  return data ?? { folders: [] };
}

export async function getRelease(id: string): Promise<ReleaseDetails | null> {
  return getResource<ReleaseDetails>(`releases/${id}`);
}

export async function getInstance(
  id: string,
  instanceid: string,
): Promise<Instance | null> {
  return getResource<Instance>(
    `users/diegocoxta/collection/folders/0/releases/${id}/instances/${instanceid}`,
  );
}

type GetCustomFields = { fields: Field[] };

export async function getCustomFields(): Promise<GetCustomFields> {
  const data = await getResource<GetCustomFields>(
    `users/diegocoxta/collection/fields`,
  );

  return data ?? { fields: [] };
}

export async function getProfile(): Promise<Profile | null> {
  return getResource<Profile>("users/diegocoxta");
}
