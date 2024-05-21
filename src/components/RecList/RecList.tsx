
import Image from "next/image";
import styles from "./index.module.scss";
import { Articles } from "@/app/[locale]/articles/page";

export default function RecList({ articles }: Articles) {
    
  return (
    <section className={styles.section}>
      {articles.map((article, index) => {
        return (
          <div key={index} className={styles.card}>
            <Image className={styles.image} src={article.image} alt="Article" width={356} height={204} />
            <div className={styles.container}>
              <h3 className={styles.title}>{article.name}</h3>
              <p className={styles.text}>{article.description}</p>
            </div>
          </div>
        );
      })}
    </section>
  );
}
