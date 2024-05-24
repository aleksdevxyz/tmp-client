import styles from "./index.module.scss";
import ArticleContent from "@/components/ArticlesComponents/ArticleContent/ArticleContent";
import BreadCrumbs from "@/components/BreadCrumbs/BreadCrumbs";
import RecListMain from "@/components/RecListMain/RecListMain";

export interface Article {
  name: string;
  translit_name: string;
  description: string;
  image: string;
  content: string;
  created_at: string;
  category: Category;
}

export interface Category {
  id: number;
  name: string;
  translit_name: string;
}

async function getArticle(translit_name: string): Promise<Article> {
  const res = await fetch(`${process.env.BASE_URL}/article/${translit_name}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
export default async function HomePage({
  params,
}: {
  params: { translit_name: string };
}) {
  const translit_name = params.translit_name;

  const data: Article = await getArticle(translit_name);

  return (
    <div style={{paddingTop: '106px'}}>
      <BreadCrumbs name={data.name} />
      <section className={styles.section}>
        <ArticleContent
          image={data.image}
          translit_name={translit_name}
          created_at={data.created_at}
          category={data.category}
          name={data.name}
          description={data.description}
          content={data.content}
        />
        <RecListMain />
      </section>
    </div>
  );
}
