import { getTranslations } from "next-intl/server";
import { getCategory } from "../../app/api/categoryApi";
import SwiperMainComponent from "../SwiperMainComponent/SwiperMainComponent";
import styles from "./MainSection.module.scss";

export default async function MainSection() {
  const data = await getCategory();
  const t = await getTranslations("Main");

  return (
    <div className={styles.main_section}>
      <h2 className={styles.title}>{t("Каталог телеграмм каналов")}</h2>
      <SwiperMainComponent count={3} data={data} />
    </div>
  );
}
