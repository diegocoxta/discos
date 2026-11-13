"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./styles.module.css";
import Vinyl from "../Vinyl";

interface HeaderProps {
  counter: { [key: string]: number };
}

export default function Header(props: HeaderProps) {
  const pathname = usePathname();

  return (
    <header className={styles.container}>
      <h1 className={styles.logo}>
        <Vinyl size={20} />
        <span>discos.</span>
      </h1>

      <ul className={styles.nav}>
        <li
          className={`${styles.item} ${pathname !== "/wishlist" && pathname !== "/sobre" ? styles.active : ""}`}
        >
          <Link href="/" className={styles.link}>
            Coleção
            <span className={styles.counter}>
              {props.counter["collection"] || 0}
            </span>
          </Link>
        </li>
        <li
          className={`${styles.item} ${pathname === "/wishlist" ? styles.active : ""}`}
        >
          <Link href="/wishlist" className={styles.link}>
            Desejos
            <span className={styles.counter}>
              {props.counter["wishlist"] || 0}
            </span>
          </Link>
        </li>
        <li
          className={`${styles.item} ${pathname === "/sobre" ? styles.active : ""}`}
        >
          <Link href="/sobre" className={styles.link}>
            Sobre
          </Link>
        </li>
      </ul>
    </header>
  );
}
