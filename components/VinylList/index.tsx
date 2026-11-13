"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";
import { Search, Shuffle, X } from "lucide-react";

import Sleeve from "@/components/Sleeve";

import { cleanName, createVinylLink, formatDate } from "@/lib/utils";
import { Field, Instance, Want } from "@/lib/types";

import styles from "./styles.module.css";

interface VinylListProps {
  customFields?: Field[];
  list: Want[] | Instance[];
  heading?: { title: string; count: number };
}

function search(
  list: (Want | Instance)[],
  searchQuery: string,
): (Want | Instance)[] {
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
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const list = search(props.list, searchQuery);

  function openRandomRecord() {
    const record = list[Math.floor(Math.random() * list.length)];

    router.push(createVinylLink(record));
  }

  const placeholder = props.heading
    ? `Buscar em ${props.heading.title} (${props.heading.count} ${props.heading.count === 1 ? "disco" : "discos"})`
    : "Busque por título, artista, gênero, estilo, ano etc.";

  const customFieldColorId = props.customFields?.find(
    (field) => field.name === "Color",
  )?.id;

  return (
    <>
      <div className={styles.searchRow}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            className={styles.searchBar}
            value={searchQuery}
            placeholder={placeholder}
            onChange={(e) => setSearchQuery(e.currentTarget.value)}
          />
          <div className={styles.searchIcon}>
            {searchQuery !== "" && (
              <X onClick={() => setSearchQuery("")} data-clickable />
            )}
            {searchQuery === "" && <Search />}
          </div>
        </div>
        <button
          type="button"
          className={styles.shuffle}
          onClick={openRandomRecord}
          disabled={list.length === 0}
          aria-label="Abrir um disco aleatório"
          title="Abrir um disco aleatório"
        >
          <Shuffle />
        </button>
      </div>
      <ul className={styles.list}>
        {list.length === 0 && (
          <p>
            {searchQuery !== ""
              ? `Nenhum resultado para "${searchQuery}"`
              : "Nenhum resultado."}
          </p>
        )}
        {list.map((record, index: number) => {
          let color = undefined;

          if ("instance_id" in record && record.notes) {
            color = record.notes?.find(
              (note) => note.field_id === customFieldColorId,
            )?.value;
          }

          return (
            <li
              key={"instance_id" in record ? record.instance_id : record.id}
              className={styles.item}
              style={{ zIndex: 10 + (list.length - index) }}
            >
              <Link href={createVinylLink(record)}>
                <Sleeve
                  size={224}
                  cover={record.basic_information.cover_image}
                  color={color}
                />
                <h2 className={styles.title}>
                  {record.basic_information.title}
                </h2>
              </Link>

              <p
                onClick={() =>
                  setSearchQuery(record.basic_information.artists[0].name)
                }
                className={styles.artist}
              >
                {cleanName(record.basic_information.artists[0].name)}
              </p>
              <p className={styles.date}>
                Adicionado em {formatDate(record.date_added)}
              </p>
              {!("instance_id" in record) && record.notes && (
                <p className={styles.note}>“{record.notes}”</p>
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
}
