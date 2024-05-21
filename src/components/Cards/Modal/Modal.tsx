import { useState } from "react";
import styles from "./index.module.scss";
import Image from "next/image";
import cn from "classnames";
import { useParams, usePathname } from "next/navigation";
import axios from "axios";

const active = cn(styles.close, styles.overlay);
export default function Modal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { id } = useParams();
  const pathName = usePathname();
  const type = pathName?.split("/").at(-2);
  const [formState, setFormState] = useState({
    link_not_work: false,
    drugs: false,
    false_information: false,
    child_abuse: false,
    other: "",
    isLoading: false,
    id: id,
    type: type === 'channel' ? 'Канал' : type === 'bots' ? 'Бот' : 'Чат',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState({ ...formState, isLoading: true });
    const {data} = await axios.post(`/api/get_token`);
    
    const { link_not_work, drugs, false_information, child_abuse, other, id, type } = formState;
    await axios
      .post(`/api/post_complaint`, {
        id,
        type,
        link_not_work,
        drugs,
        false_information,
        child_abuse,
        other,
        csrf_token: data,
      })
      .then((res) => {
        const { detail } = res.data;
        setOpen(false);
      })
      .catch((err) => {
        const { detail } = err.response.data;
        setOpen(false);

      })
      .finally(() => {
        setFormState({ ...formState, 
          link_not_work: false, 
          drugs: false, false_information: false, 
          child_abuse: false, other: "", 
          isLoading: false });
      });
  }
  

  return (
    <div
      onClick={() => {
        setOpen(false);
      }}
      className={open ? styles.overlay : active}
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className={styles.form}
        action=""
      >
        <div className={styles.text_container}>
          <p className={styles.title}>Опишите причину жалобы</p>
          <Image
            onClick={() => setOpen(false)}
            style={{ cursor: "pointer" }}
            src={"/Close.svg"}
            alt="close"
            width={15}
            height={15}
          />
        </div>
        <ul className={styles.options}>
          <li className={styles.option}>
            <input
              checked={formState.link_not_work}
              onChange={(e) => setFormState({...formState, link_not_work: e.target.checked})}
              type="checkbox"
              id="link_not_work"
              name="link_not_work"
              className={styles.input}
            />
            <label htmlFor="link_not_work" className={styles.label}>
            Ссылка на телеграм канал/чат/бот не работает
            </label>
          </li>
          <li className={styles.option}>
            <input
            checked={formState.drugs}
              onChange={(e) => setFormState({...formState, drugs: e.target.checked})}
              type="checkbox"
              id="drugs"
              name="drugs"
              className={styles.input}
            />
            <label htmlFor="drugs" className={styles.label}>
            Пропаганда наркотиков
            </label>
          </li>
          <li className={styles.option}>
            <input
            checked={formState.false_information}
              onChange={(e) => setFormState({...formState, false_information: e.target.checked})}
              type="checkbox"
              id="false_information"
              name="false_information"
              className={styles.input}
            />
            <label htmlFor="false_information" className={styles.label}>
            Ложная информация
            </label>
          </li>
          <li className={styles.option}>
            <input
              checked={formState.child_abuse}
              onChange={(e) => setFormState({...formState, child_abuse: e.target.checked})}
              type="checkbox"
              id="child_abuse"
              name="child_abuse"
              className={styles.input}
            />
            <label htmlFor="child_abuse" className={styles.label}>
            Жестокое обращение с детьми
            </label>
          </li>
        </ul>
        <h3 className={styles.subtitle}>Другое:</h3>

        <textarea onChange={(e) => setFormState({...formState, other: e.target.value})} onClick={(e) => e.stopPropagation()} name="other" className={styles.text_area}></textarea>

        <button type="submit" className={styles.button}>{formState.isLoading ? <span className={styles.loader}></span> : 'Отправить'}</button>
      </form>
    </div>
  );
}
