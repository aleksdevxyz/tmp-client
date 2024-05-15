'use client'

import React from "react";

import styles from "./index.module.scss";
import Link from "next/link";
import { BackButton, ForwardButton } from "../svgs";

import cn from "classnames";

const active = cn(styles._active, styles.link);

export default function Pagination() {
  const [currentPage, setCurrentPage] = React.useState(1);

  return (
    <div className={styles.container}>
      <BackButton style={{ transform: "rotate(180deg)" }} className={styles.next_button} />
      <div className={styles.counter}>
        <Link href={"/"} className={currentPage === 1 ? active : styles.link}>
          1
        </Link>
        <Link href={"/"} className={currentPage === 2 ? active : styles.link}>
          2
        </Link>
      </div>
      <ForwardButton className={styles.next_button} />
    </div>
  );
}
