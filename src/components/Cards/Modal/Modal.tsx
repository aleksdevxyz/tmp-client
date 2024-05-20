import React, { MouseEventHandler, useEffect } from "react";
import styles from "./index.module.scss";
import Image from "next/image";
import cn from "classnames";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useFormStatus } from "react-dom";

const active = cn(styles.close, styles.overlay);
export default function Modal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const pathName = usePathname();
  const id = pathName?.split("/").at(-1);
  const type = pathName?.split("/").at(-2);

  const {pending} = useFormStatus()

  return (
    <div
      onClick={() => {
        setOpen(false);
      }}
      className={open ? styles.overlay : active}
    >
      <form
        onClick={(e) => e.stopPropagation()}
        className={styles.form}
        action=""
      >
        <div className={styles.text_container}>
          <p className={styles.title}>Опишите причину жалобы</p>
          <Image
            onClick={() => setOpen(false)}
            style={{ cursor: "pointer" }}
            src={"/close.svg"}
            alt="close"
            width={15}
            height={15}
          />
        </div>
        <ul className={styles.options}>
          <li className={styles.option}>
            <input
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

        <textarea name="other" className={styles.text_area}></textarea>

        <button type="submit" className={styles.button}>{pending ? <span className={styles.loader}></span> : 'Отправить'}</button>
      </form>
    </div>
  );
}
