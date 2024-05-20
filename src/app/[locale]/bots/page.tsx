import ChannelsList from "@/components/ChannelsList/ChannelsList";
import styles from "./index.module.scss";

import { Metadata } from "next";
import RecList from "@/components/RecList/RecList";
import Pagination from "@/components/Pagination/Pagination";
import { getTotalPages } from "@/helpers/getTotalPages";

export const metadata: Metadata = {
  title: "Teleshtorm – поиск по Telegram чатам. Каталог телеграмм чатов.",
};

async function getBotsList(page: number) {
  const res = await fetch(
    `https://test-api-teleshtorm.teleshtorm.org/bots?page=${page}&limit=31`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function HomePage({
  searchParams,
}: {
  searchParams?: {
    page?: number;
  }
}) {
  const currentPage = Number(searchParams?.page) || 1;

  const data = await getBotsList(currentPage > 1 ? currentPage : 0);
  
  const totalPages = await getTotalPages(currentPage, data);

  return (
    <>
      <h2 className={styles.title}>Каталог телеграмм ботов</h2>
      <div className={styles.section}>
        <h3 className={styles.subtitle}>Телеграм боты</h3>
        <ChannelsList path="bots" data={data} />
      </div>
      <Pagination data={data} totalPages={totalPages} currentPage={currentPage} />
      <div className={styles.section_rec}>
        <RecList />
      </div>
    </>
  );
}
