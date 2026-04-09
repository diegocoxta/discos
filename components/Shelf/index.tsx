import React from "react";
import styles from "./styles.module.css";

interface ShelfProps {
  children: React.ReactNode;
  stackOrder?: "last-on-top" | "first-on-top";
}

export default function Shelf(props: ShelfProps) {
  const { children, stackOrder = "last-on-top" } = props;

  const childrenArray = React.Children.toArray(children);
  const totalItems = childrenArray.length;

  const isLastOnTop = stackOrder === "last-on-top";
  const shadowClass = isLastOnTop ? styles.shadowLeft : styles.shadowRight;

  return (
    <div className={styles.container}>
      {childrenArray.map((child, index) => {
        const currentZIndex = isLastOnTop ? index : totalItems - index;

        return (
          <div
            key={index}
            className={`${styles.item} ${shadowClass}`}
            style={{ zIndex: currentZIndex }}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
}
