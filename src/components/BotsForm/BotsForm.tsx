"use client";
import { useTranslations } from "next-intl";
import SubmitButton from "../SubmitButton/SubmitButton";
import styles from "./index.module.scss";
import { useState } from "react";
import axios from "axios";
import classNames from "classnames";

export default function BotsForm() {
  const t = useTranslations("AddForm");
  const [input, setFormState] = useState('');
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const link = input;
    const { data } = await axios.post(`/api/get_token`);
    await axios
      .post(`/api/post_bots`, {
        link,
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
    <form onSubmit={handleSubmit} className={styles.form}>
      <label className={styles.label}>{t("Ссылка на канал")}</label>
      <input
        name="link"
        className={styles.input}
        type="text"
        placeholder={t("Поле ввода")}
        onChange={(e) => setFormState(e.target.value)}
      />
              { (success || error) && (
          <div className={classNames(styles.msg, { [styles.success]: success, [styles.error]: error })}>
            <h3 className={styles.text_error}>{success || error}</h3>
          </div>
        )}
      <SubmitButton />
    </form>
  );
}
