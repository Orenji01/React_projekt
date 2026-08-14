"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./page.module.css";

type Inputs = {
  namn: string;
  summa: number;
  månadsbetalning: number;
  ränta: number;
  inflation: number;
  målDatum: Date;
  startDatum: Date;
};

export default function Savegoal() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

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
            {...register("namn", { required: true })}
          />
        </div>
        <div className={styles.formSection}>
          <label>Summa</label>
          <input
            className={styles.input}
            type="number"
            placeholder="summa"
            {...register("summa", { required: true })}
          />
        </div>
        <div className={styles.formSection}>
          <label>Månadsbetalning</label>
          <input
            className={styles.input}
            type="number"
            placeholder="månadsbetalning"
            {...register("månadsbetalning", { required: true })}
          />
        </div>
        <div className={styles.formSection}>
          <label>Ränta</label>
          <input
            className={styles.input}
            type="number"
            placeholder="ränta"
            step="0.01"
            {...register("ränta", { required: true })}
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
            {...register("startDatum", { required: true })}
          />
        </div>
        <div className={styles.formSection}>
          <label>Mål-datum</label>
          <input
            className={styles.input}
            type="date"
            placeholder="mål-datum"
            {...register("målDatum", { required: true })}
          />
        </div>
        <input id={styles.button} type="submit" value="Lägg till" />
      </form>
    </div>
  );
}
