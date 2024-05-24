import ChannelsList from "@/components/ChannelsList/ChannelsList";
import styles from "./index.module.scss";

import Pagination from "@/components/Pagination/Pagination";
import RecList from "@/components/RecListMain/RecListMain";
import { getTotalPages } from "@/helpers/getTotalPages";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Teleshtorm – поиск по Telegram чатам. Каталог телеграмм чатов.",
};

async function getChatsList(page: number) {
  const res = await fetch(
    `${process.env.BASE_URL}/chats?page=${page}&limit=31`
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
  const currentPage = Number(searchParams?.page) || 1;

  const data = await getChatsList(currentPage > 1 ? currentPage : 0);

  const totalPages = await getTotalPages(currentPage, data);

  return (
    <>
      <h2 className={styles.title}>Каталог телеграмм чатов</h2>
      <div className={styles.section}>
        <h3 className={styles.subtitle}>Телеграм чаты</h3>
        <ChannelsList path="chats" data={data} />
      </div>
      <Pagination
        data={data}
      />
      <div className={styles.section_rec}>
        <RecList />
      </div>
    </>
  );
}
