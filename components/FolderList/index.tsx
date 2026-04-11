"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { ListFilter, X } from "lucide-react";

import { Folder } from "@/app/discogs";

import styles from "./styles.module.css";
import Link from "next/link";

interface FolderListProps {
  list: Folder[];
}

export default function FolderList(props: FolderListProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  function renderCounter(count: number) {
    if (count > 999) return "1K+";
    return count.toString();
  }

  return (
    <div className={styles.container}>
      {isOpen && (
        <nav className={styles.list}>
          {props.list
            .filter((i) => i.count > 0 && i.name.toLowerCase() !== "all")
            .map((loc) => (
              <Link
                href={`/${loc.id}`}
                key={loc.id}
                className={`${styles.item} ${pathname === `/${loc.id}` ? styles.active : ""}`}
              >
                <span>{loc.name}</span>
                <span className={styles.counter}>
                  {renderCounter(loc.count)}
                </span>
              </Link>
            ))}

          <div className={styles.divider} />

          <Link
            href="/"
            className={`${styles.item} ${pathname === `/` ? styles.active : ""}`}
          >
            All records
          </Link>
        </nav>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={styles.fab}
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <X size={32} color="white" />
        ) : (
          <ListFilter size={32} color="white" />
        )}
      </button>
    </div>
  );
}
