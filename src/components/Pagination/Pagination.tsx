"use client";

import React, { useEffect, useMemo, useState } from "react";
import styles from "./Pagination.module.scss";
import Link from "next/link";
import { BackButton, ForwardButton } from "../svgs";
import cn from "classnames";
import { useSearchParams, useRouter } from "next/navigation";
import { getTotalPages } from "@/helpers/getTotalPages";

const active = cn(styles._active, styles.link);

export default function Pagination({ totalPages }: { totalPages: number }) {
  const [pageNumber, setPageNumber] = useState(1);
  const router = useRouter();
  const pageParams = useSearchParams();

  useEffect(() => {
    const page = pageParams.get("page");

    if (page) {
      const currentPage = Number(page) + 1;
      setPageNumber(Number(page) + 1);

      if (currentPage > totalPages) {
        router.replace(getCurrentQuery(totalPages)); // Редирект на последнюю страницу
      }
    } else {
      setPageNumber(1); 
    }
  }, [pageParams]);

  const params = useMemo(() => new URLSearchParams(pageParams), [pageParams]);

  const getCurrentQuery = (page: number) => {
    const newParams = new URLSearchParams(params);
    if (page > 0) {
      newParams.set("page", String(page - 1));
    } else {
      newParams.delete("page");
    }
    return `?${newParams.toString()}`;
  };

  const handleClick = (page: number) => {
    const newParams = new URLSearchParams(params);
    const apiPage = page - 1;

    if (apiPage >= 0) {
      newParams.set("page", String(apiPage));
    } else {
      newParams.delete("page");
    }

    setPageNumber(page);
    router.replace(`?${newParams.toString()}`);
  };

  // Определяем страницы для отображения
  const visiblePages = useMemo(() => {
    const pages: number[] = [];
    const startPage = Math.max(1, pageNumber - 3);
    const endPage = Math.min(totalPages, pageNumber + 3);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }, [pageNumber, totalPages]);

  return (
      <div className={styles.container}>
        {pageNumber > 1 && (
            <div onClick={() => handleClick(pageNumber - 1)} className={styles.next_button}>
              <BackButton style={{ transform: "rotate(180deg)" }} />
            </div>
        )}
        <div className={styles.counter}>
          {visiblePages.map((item) => (
              <Link
                  key={item}
                  href={getCurrentQuery(item)}
                  className={pageNumber === item ? active : styles.link}
              >
                <p style={{ margin: "0", padding: "0" }}>{item}</p>
              </Link>
          ))}
        </div>
        {pageNumber < totalPages && (
            <div onClick={() => handleClick(pageNumber + 1)} className={styles.next_button}>
              <ForwardButton />
            </div>
        )}
      </div>
  );
}
