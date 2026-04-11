"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./styles.module.css";

export default function Header() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Collection", href: "/" },
    { name: "Wantlist", href: "/wantlist" },
  ];

  return (
    <header className={styles.container}>
      <h1 className={styles.logo}>vinyl.</h1>

      <nav className={styles.nav}>
        {navLinks.map((link) => {
          const isActive = pathname === link.href;

          return (
            <li
              className={`${styles.item} ${isActive ? styles.active : ""}`}
              key={link.href}
            >
              <Link href={link.href} className={styles.link}>
                {link.name}
              </Link>
            </li>
          );
        })}
      </nav>
    </header>
  );
}
