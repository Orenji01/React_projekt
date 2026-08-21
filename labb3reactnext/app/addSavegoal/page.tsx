"use client";

import { useForm } from "react-hook-form";
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
    <main>
      <div id={styles.container}>
        <form id={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <h1 id={styles.title}>Nytt sparmål</h1>
          <div className={styles.formSection}>
            <label htmlFor="name">Namn</label>
            <input
              className={styles.input}
              type="text"
              id="name"
              {...register("name", { required: true })}
              aria-invalid={errors.name ? "true" : "false"}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
          </div>
          {errors.name && (
            <span id="name-error" className={styles.errorMessage}>
              Namn saknas
            </span>
          )}
          <div className={styles.formSection}>
            <label htmlFor="amount">Summa</label>
            <input
              className={styles.input}
              type="number"
              id="amount"
              {...register("amount", { required: true })}
              aria-invalid={errors.amount ? "true" : "false"}
              aria-describedby={errors.amount ? "amount-error" : undefined}
            />
          </div>
          {errors.amount && (
            <span id="amount-error" className={styles.errorMessage}>
              Summa saknas
            </span>
          )}
          <div className={styles.formSection}>
            <label htmlFor="per-month">Månadsbetalning</label>
            <input
              className={styles.input}
              type="number"
              id="per-month"
              {...register("perMonth", { required: true })}
              aria-invalid={errors.perMonth ? "true" : "false"}
              aria-describedby={errors.perMonth ? "permonth-error" : undefined}
            />
          </div>
          {errors.perMonth && (
            <span id="permonth-error" className={styles.errorMessage}>
              Månadsbetalning saknas
            </span>
          )}
          <div className={styles.formSection}>
            <label htmlFor="interest">Ränta</label>
            <input
              className={styles.input}
              type="number"
              id="interest"
              step="0.01"
              {...register("interest", { required: true })}
              aria-invalid={errors.interest ? "true" : "false"}
              aria-describedby={errors.interest ? "interest-error" : undefined}
            />
          </div>
          {errors.interest && (
            <span id="interest-error" className={styles.errorMessage}>
              Ränta måste vara minst 0
            </span>
          )}
          <div className={styles.formSection}>
            <label htmlFor="inflation">Inflation</label>
            <input
              className={styles.input}
              type="number"
              id="inflation"
              step="0.01"
              {...register("inflation", { required: true })}
              aria-invalid={errors.inflation ? "true" : "false"}
              aria-describedby={
                errors.inflation ? "inflation-error" : undefined
              }
            />
          </div>
          {errors.inflation && (
            <span id="inflation-error" className={styles.errorMessage}>
              Inflation måste vara minst 0
            </span>
          )}
          <div className={styles.formSection}>
            <label htmlFor="start-datum">Start-datum</label>
            <input
              className={styles.input}
              type="date"
              id="start-datum"
              {...register("startDate", { required: true })}
              aria-invalid={errors.startDate ? "true" : "false"}
              aria-describedby={
                errors.startDate ? "startdate-error" : undefined
              }
            />
          </div>
          {errors.startDate && (
            <span id="startdate-error" className={styles.errorMessage}>
              Startdatum saknas
            </span>
          )}
          <div className={styles.formSection}>
            <label htmlFor="mål-datum">Mål-datum</label>
            <input
              className={styles.input}
              type="date"
              id="mål-datum"
              {...register("targetDate", { required: true })}
              aria-invalid={errors.targetDate ? "true" : "false"}
              aria-describedby={
                errors.targetDate ? "targetdate-error" : undefined
              }
            />
          </div>
          {errors.targetDate && (
            <span id="targetdate-error" className={styles.errorMessage}>
              Måldatum saknas
            </span>
          )}
          <input id={styles.button} type="submit" value="Lägg till" />
        </form>
      </div>
    </main>
  );
}
