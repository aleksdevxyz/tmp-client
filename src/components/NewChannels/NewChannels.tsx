import SwiperNewComponent from "../SwiperNewComponent/SwiperNewComponent";
import styles from "./index.module.scss";

async function getData() {
  const res = await fetch(
    `${process.env.BASE_URL}/channels?page=0&limit=31`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function NewChannels() {
  const data = await getData();
  
  return (
    <div className={styles.swipper}>
      <SwiperNewComponent count={4} styles={styles} data={data} />
    </div>
  );
}
