import dynamic from "next/dynamic";
// import SwiperNewComponent from "../SwiperNewComponent/SwiperNewComponent";
import styles from "./index.module.scss";

const SwiperNewComponent = dynamic(() => import("../SwiperNewComponent/SwiperNewComponent"));

async function getData() {
  try {
    const res = await fetch(
      `${process.env.BASE_URL}/channels?page=0&limit=31`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  } catch(error) {
    console.log(error);
  }

  return []
}

export default async function NewChannels() {
  const data = await getData();
  
  return (
    <div className={styles.swipper}>
      <SwiperNewComponent count={5} data={data} />
    </div>
  );
}
