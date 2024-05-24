"use client";

import React, { useEffect, useState } from "react";

import styles from "./index.module.scss";
import Link from "next/link";
import { BackButton, ForwardButton } from "../svgs";

import cn from "classnames";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { getTotalPages } from "@/helpers/getTotalPages";

const active = cn(styles._active, styles.link);

export default function Pagination({
  data,
}: {
  data: any;
}) {
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState<number[] | null>([]);
  const router = useRouter();
  const pageParams = useSearchParams();

  useEffect(() => {
    setTotalPages(getTotalPages(pageNumber, data));
  },[pageNumber, data]);

  const handleClick = (pageNumber: number) => {
    const params = new URLSearchParams(pageParams);
    if (pageNumber > 0) {
      params.set("page", String(pageNumber));
    } else {
      params.delete("page");
    }
    setPageNumber(pageNumber);
    router.replace(`?${params.toString()}`);
  };
  
  const getCurrentQuery = (page: number) => {
    const params = new URLSearchParams(pageParams);
    if (page > 0) {
      params.set("page", String(page));
    } else {
      params.delete("page");
    }
    return `?${params.toString()}`;
  };

  
  return (
    <div className={styles.container}>
      {pageNumber <= 1 ? null : (
        <div
          onClick={() => {
            handleClick(pageNumber - 1);
            setPageNumber(pageNumber - 1);
          }}
          className={styles.next_button}
        >
          <BackButton style={{ transform: "rotate(180deg)" }} />
        </div>
      )}
      <div className={styles.counter}>
        {totalPages != null
          ? totalPages.map((item, index) => (
              <Link
                key={index}
                href={getCurrentQuery(item)}
                className={pageNumber === item ? active : styles.link}
              >
                <p
                  style={{ margin: "0", padding: "0" }}
                  onClick={() => {
                    handleClick(item);
                  }}
                >
                  {item}
                </p>
              </Link>
            ))
          : totalPages === null && (
              <Link href={getCurrentQuery(1)} className={active}>
                <p style={{ margin: "0", padding: "0" }}>1</p>
              </Link>
            )}
      </div>
      {totalPages === null ? null : pageNumber >= totalPages[totalPages.length - 1]  ? null : (
        <div
          onClick={() => {
            handleClick(pageNumber + 1);
            setPageNumber(pageNumber + 1);
          }}
          className={styles.next_button}
        >
          <ForwardButton />
        </div>
      )}
    </div>
  );
}
