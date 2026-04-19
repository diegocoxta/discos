"use client";

import { useState } from "react";
import Link from "next/link";
import Fuse from "fuse.js";
import { Search, X } from "lucide-react";

import Sleeve from "@/components/Sleeve";

import { cleanName, slug } from "@/lib/utils";
import { Release, Want } from "@/lib/types";

import styles from "./styles.module.css";

interface VinylListProps {
  listType: "collection" | "wants";
  list: Want[] | Release[];
}

function search(
  list: (Want | Release)[],
  searchQuery: string,
): (Want | Release)[] {
  if (!searchQuery.trim()) return list;

  const fuse = new Fuse(list, {
    includeScore: true,
    threshold: 0.3,
    ignoreLocation: true,
    useExtendedSearch: true,
    keys: [
      { name: "basic_information.title", weight: 0.4 },
      { name: "basic_information.artists.name", weight: 0.3 },
      { name: "basic_information.genres", weight: 0.1 },
      { name: "basic_information.styles", weight: 0.1 },
      { name: "basic_information.year", weight: 0.1 },
    ],
  });

  const results = fuse.search(searchQuery);

  return results.map((result) => result.item);
}

export default function VinylList(props: VinylListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const list = search(props.list, searchQuery);

  function createVinylLink(record: Want | Release) {
    return `/vinyl/${record.id}${"instance_id" in record ? `/${record.instance_id}` : ""}/${slug(record.basic_information.title)}-${slug(
      record.basic_information.artists[0].name,
    )}`;
  }

  return (
    <>
      <div className={styles.searchContainer}>
        <input
          type="text"
          className={styles.searchBar}
          value={searchQuery}
          placeholder="Search by title, artist, genre, style, year, etc."
          onChange={(e) => setSearchQuery(e.currentTarget.value)}
        />
        <div className={styles.searchIcon}>
          {searchQuery !== "" && (
            <X onClick={() => setSearchQuery("")} data-clickable />
          )}
          {searchQuery === "" && <Search />}
        </div>
      </div>
      <ul className={styles.list}>
        {list.length === 0 && (
          <p>
            {searchQuery !== ""
              ? `No results found by "${searchQuery}"`
              : "No results found."}
          </p>
        )}
        {list.map((record, index: number) => (
          <li
            key={record.id}
            className={styles.item}
            style={{ zIndex: 10 + (list.length - index) }}
          >
            <Link href={createVinylLink(record)}>
              <Sleeve
                id={record.id.toString()}
                size={224}
                cover={record.basic_information.cover_image}
              />
              <h2 className={styles.title}>{record.basic_information.title}</h2>
            </Link>

            <Link
              href={`/artist/${slug(record.basic_information.artists[0].name)}`}
              className={styles.artist}
            >
              {cleanName(record.basic_information.artists[0].name)}
            </Link>
            <p className={styles.date}>
              Added on{" "}
              {new Date(record.date_added).toLocaleDateString(undefined, {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}
