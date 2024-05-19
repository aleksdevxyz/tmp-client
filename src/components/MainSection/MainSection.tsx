import { getCategory } from "../../app/[locale]/api/categoryApi";
import styles from "./MainSection.module.scss";
import SwiperMainComponent from "../SwiperMainComponent/SwiperMainComponent";


export default async function MainSection() {
  const data = await getCategory();

  return (
    <div className={styles.main_section}>
      <h2 className={styles.title}>Каталог телеграм каналов</h2>
      <SwiperMainComponent main={true} count={3} data={data}/>
    </div>
  );
}
