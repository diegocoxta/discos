interface SearchResponse {
  results: { collectionViewUrl?: string }[];
}

export async function getAppleMusicAlbumUrl(
  term: string,
): Promise<string | null> {
  const query = new URLSearchParams({
    term,
    country: "BR",
    entity: "album",
    limit: "1",
  });

  try {
    const request = await fetch(`https://itunes.apple.com/search?${query}`, {
      next: { revalidate: 86400, tags: ["apple-music"] },
    });

    if (!request.ok) {
      console.error(
        `[apple-music] ${request.status} ${request.statusText} — ${term}`,
      );
      return null;
    }

    const data = (await request.json()) as SearchResponse;
    return data.results[0]?.collectionViewUrl ?? null;
  } catch (error) {
    console.error(error);
    return null;
  }
}
