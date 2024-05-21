import { getCategory } from "../../app/api/categoryApi";
import SwiperMainComponent from "../SwiperMainComponent/SwiperMainComponent";
import styles from "./MainSection.module.scss";

export default async function MainSection() {
  const data = await getCategory();

  return (
    <div className={styles.main_section}>
      <h2 className={styles.title}>Каталог телеграм каналов</h2>
      <SwiperMainComponent count={3} data={data} />
    </div>
  );
}
