"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./page.module.css";

type Inputs = {
  name: string;
  amount: number;
  perMonth: number;
  interest: number;
  inflation: number;
  targetDate: Date;
  startDate: Date;
};

export default function Savegoal() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  const onSubmit = async (data: Inputs) => {
    const response = await fetch("/api/public/savegoal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Failed to submit form");
    }

    console.log("Saved:", result);

    reset();
  };

  return (
    <div id={styles.container}>
      <form id={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h1 id={styles.title}>Nytt sparmål</h1>
        <div className={styles.formSection}>
          <label>Namn</label>
          <input
            className={styles.input}
            type="text"
            placeholder="namn"
            {...register("name", { required: true })}
          />
        </div>
        <div className={styles.formSection}>
          <label>Summa</label>
          <input
            className={styles.input}
            type="number"
            placeholder="summa"
            {...register("amount", { required: true })}
          />
        </div>
        <div className={styles.formSection}>
          <label>Månadsbetalning</label>
          <input
            className={styles.input}
            type="number"
            placeholder="månadsbetalning"
            {...register("perMonth", { required: true })}
          />
        </div>
        <div className={styles.formSection}>
          <label>Ränta</label>
          <input
            className={styles.input}
            type="number"
            placeholder="ränta"
            step="0.01"
            {...register("interest", { required: true })}
          />
        </div>
        <div className={styles.formSection}>
          <label>Inflation</label>
          <input
            className={styles.input}
            type="number"
            placeholder="inflation"
            step="0.01"
            {...register("inflation", { required: true })}
          />
        </div>
        <div className={styles.formSection}>
          <label>Start-datum</label>
          <input
            className={styles.input}
            type="date"
            placeholder="start-datum"
            {...register("startDate", { required: true })}
          />
        </div>
        <div className={styles.formSection}>
          <label>Mål-datum</label>
          <input
            className={styles.input}
            type="date"
            placeholder="mål-datum"
            {...register("targetDate", { required: true })}
          />
        </div>
        <input id={styles.button} type="submit" value="Lägg till" />
      </form>
    </div>
  );
}
