import { getCategory } from "@/app/api/categoryApi";
import ChannelsList from "@/components/ChannelsList/ChannelsList";
import SwiperMainComponent from "@/components/SwiperMainComponent/SwiperMainComponent";
import { Metadata } from "next";
import styles from "./Categories.module.scss";
import { getTranslations } from "next-intl/server";
import Pagination from "@/components/Pagination/Pagination";
import RecList from "@/components/RecListMain/RecListMain";

type Props = {
  params: { translit_name: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const translitName = decodeURIComponent(params.translit_name);
  const categoryList = await getCategory();
  const matchingCategory = categoryList.find((item) => item.translit_name === translitName);
  const name = matchingCategory ? matchingCategory.name : "";


  const t = await getTranslations("IndexCategory");

  return {
    title: `${t("title", { name: name })}`,
    description: `${t("description", { name: name })}`,
    keywords: `${t("keywords")}${name}`,
    robots: {
      index: true,
      follow: true,
    },
  };
}

async function getAcuurateCategory(translit_name: string, page: number) {
  const res = await fetch(
    `${process.env.BASE_URL}/categories/channels?page=${page}&limit=31&category_translit=${translit_name}`,
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Categories({
  params,
 searchParams
}: {
  params: { translit_name: string; locale: string};
  searchParams?: {page?: number; totalPages?: number;}
}) {
  const currentPage = Number(searchParams?.page) || 0;
  let translitName = params.translit_name;
  const AccurateCategory = await getAcuurateCategory(translitName, currentPage);
  const categoryList = await getCategory();
  translitName = decodeURIComponent(params.translit_name);
  const matchingCategory = categoryList.find((item) => item.translit_name === translitName);
  const name = matchingCategory ? matchingCategory.name : "";
  const t = await getTranslations("SearchPage");

  return (
      <div className={styles.section}>
        <h2 className={styles.title}>{`${t("Каталог телеграм каналов в категории")} : ${name}`}</h2>
        <SwiperMainComponent count={3} data={categoryList}/>
        <div className={styles.channel_section}>
          <h3 className={styles.subtitle}>{t("Телеграм каналы")}</h3>
          <ChannelsList path="" data={AccurateCategory} advertisement={true}/>
        </div>
        <div className={styles.counter}>
          <Pagination data={AccurateCategory}/>
        </div>
      </div>
  );
}
