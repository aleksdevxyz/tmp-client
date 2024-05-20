"use client";
const BASE_URL = process.env.BASE_URL;
import { useTranslations } from "next-intl";
import styles from "./index.module.scss";
import { CategoryResponse } from "@/app/[locale]/api/categoryApi";
import SubmitButton from "../SubmitButton/SubmitButton";
import { useState } from "react";
import axios from "axios";

export default function ChannelsForm({
  category,
}: {
  category?: CategoryResponse[];
}) {
  const t = useTranslations("AddForm");
  const [formState, setFormState] = useState({
    input:'',
    select: ''
  });

  const handleSumbit = async (e: any) => {
    e.preventDefault();
    const link = formState.input
    const category = formState.select
    
    const req = async (): Promise<any> => {
      const res = await fetch(`/get_csrf_tokens`);
      if (!res.ok) {
          throw new Error('Failed to fetch data');
      }
      return res.json();
    };

    const csrf_token = await req();
    
    axios
    .post(`/request_to_add?type=Канал&link=${link}&category=${category}`, csrf_token)
    .then((res) => res.data)
  }


  return (
    <>
      <form method="POST" onSubmit={handleSumbit} className={styles.form}>
        <label className={styles.label}>{t("Ссылка на канал")}</label>
        <input
          name="link"
          className={styles.input}
          type="text"
          placeholder={t("Поле ввода")}
          onChange={(e) => setFormState({ ...formState, input: e.target.value })}
        />
        <label className={styles.label}>{t("Категория канала")}</label>
        <select onChange={(e) => setFormState({ ...formState, select: e.target.value })} className={styles.select} name="category">
          {category?.map(({ id, name }) => {
            return (
              <option id={id} value={id} className={styles.option} key={id}>
                {name}
              </option>
            );
          })}
        </select>
        {/* {state != "" && (
          <div className={styles.error}>
            <h3 className={styles.text_error}>{state}</h3>
          </div>
        )} */}

        <SubmitButton onSubmit={handleSumbit} />
      </form>
    </>
  );
}
