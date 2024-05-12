import React from "react";
import styles from "./MainSection.module.scss";
import { AddSquare, ArrowBack, ArrowForward } from "../svgs";

export default function MainSection() {
  return (
    <div className={styles.main_section}>
      <h1 className={styles.title}>Каталог телеграм каналов</h1>
      <div className={styles.subtitle}>
        <div className={styles.subtitle_container}>
          <h3 className={styles.subtitle_text}>Все категории</h3>
          <button className={styles.button}>
            <AddSquare className={styles.icon_add}/>
            <p className={styles.button_text}>Добавить канал</p>
          </button>
        </div>
        <div className={styles.content_container}>
        <ArrowBack className={styles.arrow_back}/>
        <div className={styles.content}>
            <div className={styles.content_list}>
                <ul className={styles.list}>
                    <li className={styles.list_item}>
                      <p className={styles.list_title}>Сообщества</p>
                      <p className={styles.list_subscribers}>123</p>
                    </li>
                    <li className={styles.list_item}>
                      <p className={styles.list_title}>Сообщества</p>
                      <p className={styles.list_subscribers}>123</p>
                    </li>
                    <li className={styles.list_item}>
                      <p className={styles.list_title}>Сообщества</p>
                      <p className={styles.list_subscribers}>123</p>
                    </li>
                    <li className={styles.list_item}>
                      <p className={styles.list_title}>Сообщества</p>
                      <p className={styles.list_subscribers}>123</p>
                    </li>
                </ul>
                <ul className={styles.list}>
                    <li className={styles.list_item}>
                      <p className={styles.list_title}>Сообщества</p>
                      <p className={styles.list_subscribers}>123</p>
                    </li>
                    <li className={styles.list_item}>
                      <p className={styles.list_title}>Сообщества</p>
                      <p className={styles.list_subscribers}>123</p>
                    </li>
                    <li className={styles.list_item}>
                      <p className={styles.list_title}>Сообщества</p>
                      <p className={styles.list_subscribers}>123</p>
                    </li>
                    <li className={styles.list_item}>
                      <p className={styles.list_title}>Сообщества</p>
                      <p className={styles.list_subscribers}>123</p>
                    </li>
                </ul>
            </div>
        </div>
        <ArrowForward className={styles.arrow_forward}/>        
        </div>
      </div>
    </div>
  );
}
