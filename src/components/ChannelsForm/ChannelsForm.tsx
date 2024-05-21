"use client";

import { CategoryResponse } from "@/app/api/categoryApi";
import axios from "axios";
import { useTranslations } from "next-intl";
import { useState } from "react";
import SubmitButton from "../SubmitButton/SubmitButton";
import styles from "./index.module.scss";
import cn from "classnames";

export default function ChannelsForm({
  category,
}: {
  category?: CategoryResponse[];
}) {
  const t = useTranslations("AddForm");

  const [formState, setFormState] = useState({
    input: "",
    select: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const link = formState.input;
    const category = formState.select;
    const { data } = await axios.post(`/api/get_token`);
    await axios
      .post(`/api/post_channel`, {
        link,
        category,
        csrf_token: data,
      })
      .then((res) => {
        const { detail } = res.data;
        setSuccess(detail);
        setError("");
      })
      .catch((err) => {
        const { detail } = err.response.data;
        setError(detail);
        setSuccess("");
      });
  };

  

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>{t("Ссылка на канал")}</label>
        <input
          name="link"
          className={styles.input}
          type="text"
          placeholder={t("Поле ввода")}
          onChange={(e) =>
            setFormState({ ...formState, input: e.target.value })
          }
        />
        <label className={styles.label}>{t("Категория канала")}</label>
        <select
          className={styles.select}
          name="category"
          onChange={(e) =>
            setFormState({ ...formState, select: e.target.value })
          }
        >
          {category?.map(({ id, name }) => {
            return (
              <option id={id} value={id} className={styles.option} key={id}>
                {name}
              </option>
            );
          })}
        </select>
        { (success || error) && (
          <div className={cn(styles.msg, { [styles.success]: success, [styles.error]: error })}>
            <h3 className={styles.text_error}>{success || error}</h3>
          </div>
        )}
        <SubmitButton />
      </form>
    </>
  );
}
