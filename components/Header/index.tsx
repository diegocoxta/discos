"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./styles.module.css";

interface HeaderProps {
  counter: { [key: string]: number };
}

export default function Header(props: HeaderProps) {
  const pathname = usePathname();

  const navLinks = [
    { key: "collection", name: "Collection", href: "/" },
    { key: "wishlist", name: "Wishlist", href: "/wishlist" },
  ];

  return (
    <header className={styles.container}>
      <h1 className={styles.logo}>vinyl.</h1>

      <ul className={styles.nav}>
        {navLinks.map((link) => {
          const isActive = pathname === link.href;

          return (
            <li
              className={`${styles.item} ${isActive ? styles.active : ""}`}
              key={link.href}
            >
              <Link href={link.href} className={styles.link}>
                {link.name}
                <span className={styles.counter}>
                  {props.counter[link.key]}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </header>
  );
}
