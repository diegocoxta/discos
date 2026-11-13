"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Profile } from "@/lib/types";

import styles from "./styles.module.css";
import Vinyl from "../Vinyl";

interface HeaderProps {
  counter: { [key: string]: number };
  profile?: Profile | null;
}

export default function Header(props: HeaderProps) {
  const pathname = usePathname();
  const tagline = [props.profile?.location, props.profile?.profile]
    .filter(Boolean)
    .join(" · ");

  return (
    <header className={styles.container}>
      <h1 className={styles.logo}>
        <Vinyl size={20} />
        <span>discos.</span>
      </h1>

      {props.profile && (
        <div className={styles.profile}>
          {props.profile.avatar_url && (
            <Image
              src={props.profile.avatar_url}
              alt={props.profile.name}
              width={40}
              height={40}
              className={styles.avatar}
            />
          )}
          <div className={styles.profileInfo}>
            <strong>{props.profile.name}</strong>
            {tagline && <span>{tagline}</span>}
          </div>
        </div>
      )}

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
