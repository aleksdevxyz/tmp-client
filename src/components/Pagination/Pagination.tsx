"use client";

import React, { useEffect, useState } from "react";

import styles from "./index.module.scss";
import Link from "next/link";
import { BackButton, ForwardButton } from "../svgs";

import cn from "classnames";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const active = cn(styles._active, styles.link);

export default function Pagination({ currentPage, totalPages }: {totalPages: number, currentPage: number }) {
  const [pageNumber, setPageNumber] = useState(currentPage);
  const [ perPage, setPerPage ] = useState(totalPages)
  const router = useRouter();

  useEffect(() => {
    setPageNumber(currentPage);
    setPerPage(totalPages);
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
      {pageNumber === 1 ? null : (
        <div
          onClick={() => {
            handleClick(pageNumber - 1);
            setPageNumber(pageNumber - 1);
            setPerPage(perPage - 1);
          }}
          className={styles.next_button}
        >
          <BackButton style={{ transform: "rotate(180deg)" }} />
        </div>
      )}
      <div onClick={() => handleClick(currentPage)} className={styles.counter}>
        {[...Array(perPage)].map((_, index) => (
          <Link
            onClick={() => {
              setPageNumber(index + 1);
              handleClick(index + 1);
            }}
            key={Math.random()}
            href={`?page=${index + 1}`}
            className={pageNumber === index + 1 ? active : styles.link}
          >
            {index + 1}
          </Link>
        ))}
      </div>
      <div
        onClick={() => {
          handleClick(pageNumber + 1);
          setPageNumber(pageNumber + 1);
          setPerPage(perPage + 1);
        }}
        className={styles.next_button}
      >
        <ForwardButton />
      </div>
    </div>
  );
}
