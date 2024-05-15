import { getCategory } from "@/app/api/categoryApi";
import SwiperMainComponent from "../SwiperMainComponent/SwiperMainComponent";
import { AddSquare } from "../svgs";
import styles from "./MainSection.module.scss";


export default async function MainSection() {
  const data = await getCategory();

  return (
    <div className={styles.main_section}>
      <h1 className={styles.title}>Каталог телеграм каналов</h1>
      <div className={styles.subtitle}>
        <div className={styles.subtitle_container}>
          <h3 className={styles.subtitle_text}>Все категории</h3>
          <button className={styles.button}>
            <AddSquare className={styles.icon_add} />
            <p className={styles.button_text}>Добавить канал</p>
          </button>
        </div>
        <div className={styles.content_container}>
          <div className={styles.content}>
            <div className={styles.content_list}>
              <SwiperMainComponent count={3} styles={styles} data={data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
