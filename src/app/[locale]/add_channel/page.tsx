import AddForm from "@/components/AddChannelComponents/AddForm/AddForm";
import { getCategory } from "../../api/categoryApi";
import styles from "./index.module.scss";



export default async function HomePage() {
  const category = await getCategory();
  return (
    <div className={styles.section}>
      <AddForm category={category} />
    </div>
  );
}
