"use client";
import React, { useEffect } from "react";
import styles from "./index.module.scss";
import { SearchIcon } from "../svgs";
import Link from "next/link";
import cn from "classnames";
import axios from "axios";
import Image from "next/image";
import { useDebouncedCallback } from "use-debounce";

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

  const searchRequest = (value: string) => {
    if (value) {
      axios
        .get(
          `https://test-api-teleshtorm.teleshtorm.org/channels/search_suggest?query=${value}`
        )
        .then((res) => {
          setSearchResult(res.data);
        });
    }
  };

  const handleSearch = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      if (value === "") return setSearchResult(null);
      searchRequest(value);
    },
    300
  );

  const handleOverlayClick = (event: MouseEvent) => {
    if (dropRef.current && !dropRef.current.contains(event.target as Node)) {
      setActiveMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOverlayClick);
    return () => document.removeEventListener("click", handleOverlayClick);
  }, []);

  const changeSubscribers = (subscribers: string) => {
    const lastDigit = parseInt(subscribers.slice(-1));
    if ([2, 3, 4].includes(lastDigit)) {
      return "Подписчика";
    }
    return "Подписчиков";
  };

  return (
    <div ref={dropRef} className={styles.input_container}>
      <SearchIcon className={styles.icon} />
      <input
        onFocus={() => setActiveMenu(true)}
        onChange={(e) => handleSearch(e)}
        placeholder="Поиск..."
        className={styles.input}
        type="text"
      />
      <div className={activeMenu ? active : styles.dropdown}>
        <div className={styles.dropdown_list}>
          {searchResult?.map((item) => (
            <div key={item.id} className={styles.dropdown_content}>
              <Link
                className={styles.dropdown_item}
                href={`/channel/${item.id}`}
              >
                <Image
                  width={55}
                  height={55}
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
                    {changeSubscribers(item.subscribers.toString())}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <Link href={"/"} className={styles.dropdown_button}/>
      </div>
    </div>
  );
}
