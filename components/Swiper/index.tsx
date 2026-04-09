"use client";

import { useState } from "react";
import Image from "next/image";

import { RecordType } from "@/components/Vinyl";

import styles from "./styles.module.css";

interface SwiperProps {
  records: RecordType[];
}

export default function Swiper({ records = [] }: SwiperProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < records.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const activeRecord = records[currentIndex];

  // Função central que calcula a posição 3D de cada carta
  const getCardStyle = (index: number) => {
    const offset = index - currentIndex;
    const absOffset = Math.abs(offset);

    // Se estiver muito longe (mais de 5 itens de distância), escondemos para poupar performance
    if (absOffset > 5) return { opacity: 0, pointerEvents: "none" };

    if (offset === 0) {
      // ESTADO ATIVO (Frente e Centro)
      return {
        zIndex: 100,
        transform: "translateY(0) scale(1)",
        opacity: 1,
      };
    } else if (offset > 0) {
      // PILHA DE CIMA / FUTURO (Atrás e deslocado para cima)
      return {
        zIndex: 100 - offset,
        // Sobe 25px e diminui 4% da escala a cada item de distância
        transform: `translateY(-${offset * 25}px) scale(${1 - offset * 0.04})`,
        opacity: 1 - offset * 0.05, // Escurece levemente os de trás
      };
    } else {
      // PILHA DE BAIXO / PASSADO (Atrás e deslocado totalmente para baixo)
      return {
        zIndex: 100 - absOffset,
        // Cai para baixo da imagem ativa (280px) e cria uma lombada de 12px por item
        transform: `translateY(${200 + absOffset * 12}px) rotateX(-80deg) scale(${1 - absOffset * 0.02})`,
        opacity: 1,
      };
    }
  };

  if (!records.length) return null;

  return (
    <div className={styles.wrapper}>
      {/* Metadados do Disco Ativo */}
      {activeRecord && (
        <div className={styles.infoArea} key={activeRecord.id}>
          <p className={styles.artist}>{activeRecord.artist}</p>
          <h2 className={styles.title}>{activeRecord.title}</h2>
          <p className={styles.year}>{activeRecord.year}</p>
        </div>
      )}

      {/* Container Principal da Animação */}
      <div className={styles.carouselContainer}>
        <button
          className={`${styles.arrowBtn} ${styles.prevBtn}`}
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          &#10094; {/* Seta Esquerda HTML entity */}
        </button>

        <div className={styles.stackArea}>
          {records.map((record, index) => (
            <div
              key={record.id || index}
              className={styles.card}
              style={getCardStyle(index) as React.CSSProperties}
              // Permite clicar em um disco da pilha de cima para avançar direto pra ele
              onClick={() => index > currentIndex && setCurrentIndex(index)}
            >
              <Image
                src={record.cover}
                alt={record.title}
                className={styles.coverImage}
                fill
              />
            </div>
          ))}
        </div>

        <button
          className={`${styles.arrowBtn} ${styles.nextBtn}`}
          onClick={handleNext}
          disabled={currentIndex === records.length - 1}
        >
          &#10095; {/* Seta Direita HTML entity */}
        </button>
      </div>
    </div>
  );
}
