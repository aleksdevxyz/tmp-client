"use client";
import React, { useEffect } from "react";
import styles from "./index.module.scss";
import { Arrow, SearchIcon } from "../svgs";
import Image from "next/image";
import Link from "next/link";
import cn from "classnames";
import axios from "axios";
import Logo from "../../../public/RU.png";

interface SearchResult {
  id: number;
  name: string;
  hidden: boolean;
  description: string;
  image: string;
  subscribers: number;
}

const active = cn(styles._active, styles.dropdown);

export default function SearchInput() {
  const [activeMenu, setActiveMenu] = React.useState(false);

  const [searchPhrase, setSearchPhrase] = React.useState("");

  const [searchResult, setSearchResult] = React.useState<SearchResult[] | null>(
    null
  );
  const dropRef: React.RefObject<HTMLDivElement> = React.useRef(null);

  const searchRequest = (value:string) => {
    if (value) {
      const res = axios.get(
        `https://test-api-teleshtorm.teleshtorm.org/channels/search?query=${value}&page=0&limit=31`,
        {
          headers: {
            "X-CSRF-Token": "262f06b948efa287aabe7fa3427186d5a585e27e",
          },
        }
      );

      res.then((res) => setSearchResult(res.data.data));
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setActiveMenu(!!value);
    setSearchPhrase(value);
    setTimeout(() => searchRequest(value), 1000);
  };

  const handleOverlayClick = (event: MouseEvent) => {
    if (dropRef.current && !dropRef.current.contains(event.target as Node)) {
      setActiveMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOverlayClick);
    return () => document.removeEventListener("click", handleOverlayClick);
  }, []);

  return (
    <div className={styles.input_container}>
      <SearchIcon className={styles.icon} />
      <input
        value={searchPhrase}
        onChange={handleSearch}
        placeholder="Поиск..."
        className={styles.input}
        type="text"
      />
      <div ref={dropRef} className={activeMenu ? active : styles.dropdown}>
        {searchResult?.map((item) => (
          <div key={item.id} className={styles.dropdown_content}>
            <Link className={styles.dropdown_item} href={"/"}>
              <Image
                alt="Картинка из поиска"
                className={styles.dropdown_img}
                src={item.image}
              />

              <div className={styles.dropdown_text}>
                <p className={styles.dropdown_name}>{item.name}</p>
                <p className={styles.dropdown_subscribe}>
                  <span className={styles.dropdown_number}>
                    {item.subscribers}
                  </span>
                  {item.description}
                </p>
              </div>
              <Arrow className={styles.dropdown_arrow} />
            </Link>
          </div>
        ))}
        <Link href={"/"} className={styles.dropdown_button} />
      </div>
    </div>
  );
}
