"use client";

import React, { useEffect, useState } from "react";

import styles from "./index.module.scss";
import Link from "next/link";
import { BackButton, ForwardButton } from "../svgs";

import cn from "classnames";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const active = cn(styles._active, styles.link);

export default function Pagination({
  currentPage,
  totalPages,
  data,
}: {
  totalPages: number[];
  currentPage: number;
  data: any
}) {
  const [pageNumber, setPageNumber] = useState(currentPage);
  const router = useRouter();

  useEffect(() => {
    setPageNumber(currentPage);
  }, [currentPage, totalPages]);

  const pageParams = useSearchParams();
  const handleClick = (pageNumber: number) => {
    const params = new URLSearchParams(pageParams);
    if (pageNumber > 0) {
      params.set("page", String(pageNumber));
    } else {
      params.delete("page");
    }
    router.replace(`?${params.toString()}`);
  };

  return (
    <div className={styles.container}>
      {pageNumber <= 1 ? null : (
        <div
          onClick={() => {
            handleClick(pageNumber - 1);
          }}
          className={styles.next_button}
        >
          <BackButton style={{ transform: "rotate(180deg)" }} />
        </div>
      )}
      <div className={styles.counter}>
        {totalPages.length > 1 ? (
          totalPages.map((item, index) => (
            <Link
              key={index}
              href={`?page=${item}`}
              className={pageNumber === item ? active : styles.link}
            >
              <p
                style={{ margin: "0", padding: "0" }}
                onClick={() => {
                  handleClick(item);
                }}
              >
                {pageNumber === 0 ? 1 : item}
              </p>
            </Link>
          ))
        ) : data.length < 31 && (
          (
            <Link
              href={`?page=1`}
              className={active}
            >
              <p
                style={{ margin: "0", padding: "0" }}
              >
                1 
              </p>
            </Link>
          )
        )}
      </div>
      {pageNumber >= totalPages[totalPages.length - 1] ? null : (
        <div
          onClick={() => {
            handleClick(pageNumber + 1);
          }}
          className={styles.next_button}
        >
          <ForwardButton />
        </div>
      )}
    </div>
  );
}
