"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Folders, X } from "lucide-react";

import { Field, Folder } from "@/lib/types";

import styles from "./styles.module.css";
import Link from "next/link";

interface FiltersProps {
  folders: Folder[];
}

export default function Filters(props: FiltersProps) {
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
          <div className={styles.scrollArea}>
            {props.folders &&
              props.folders
                .filter((i) => i.count > 0 && i.name.toLowerCase() !== "all")
                .map((loc) => (
                  <Link
                    href={`/folder/${loc.id}`}
                    key={loc.id}
                    className={`${styles.item} ${pathname === `/folder/${loc.id}` ? styles.active : ""}`}
                  >
                    <span>{loc.name}</span>
                    <span className={styles.counter}>
                      {renderCounter(loc.count)}
                    </span>
                  </Link>
                ))}
          </div>

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
          <Folders size={32} color="white" />
        )}
      </button>
    </div>
  );
}
