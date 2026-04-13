"use client";

import { useRouter } from "next/navigation";
import { useRef, useEffect, MouseEvent } from "react";

import styles from "./styles.module.css";

export default function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  function handleDismiss() {
    router.back();
  }

  const handleBackdropClick = (e: MouseEvent) => {
    if (e.target === dialogRef.current) {
      handleDismiss();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      onClose={handleDismiss}
      onClick={handleBackdropClick}
    >
      <div className={styles.content}>
        <button
          onClick={() => dialogRef.current?.close()}
          className={styles.closeBtn}
        >
          ✕
        </button>
        {children}
      </div>
    </dialog>
  );
}
