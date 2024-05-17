import ChannelsList from "@/components/ChannelsList/ChannelsList";
import styles from "./index.module.scss";

import { Metadata } from "next";
import RecList from "@/components/RecList/RecList";
import Pagination from "@/components/Pagination/Pagination";

export const metadata: Metadata = {
  title: "Teleshtorm – поиск по Telegram чатам. Каталог телеграмм чатов.",
};

async function getChatsList(page: number) {
  const res = await fetch(
    `https://test-api-teleshtorm.teleshtorm.org/chats?page=${page}&limit=31`
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
  };
}) {
  const currentPage = Number(searchParams?.page) || 0;

  const data = await getChatsList(currentPage);
  return (
    <>
      <h2 className={styles.title}>Каталог телеграмм чатов</h2>
      <div className={styles.section}>
        <h3 className={styles.subtitle}>Телеграм чаты</h3>
        <ChannelsList data={data} />
      </div>

      <Pagination totalPages={4} currentPage={currentPage} />
      <div className={styles.section_rec}>
        <RecList />
      </div>
    </>
  );
}
