"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import { log } from "console";

interface Inputs {
  _id: string;
  name: string;
  amount: number;
  perMonth: number;
  interest: number;
  inflation: number;
  targetDate: Date;
  startDate: Date;
}

export default function Editsavegoal() {
  const [saveGoalInfo, setSaveGoalInfo] = useState([]);

  useEffect(() => {
    fetch("/api/public/savegoal")
      .then((response) => response.json())
      .then((result) => {
        console.log(result);

        setSaveGoalInfo(result);
      });
  }, []);
  return (
    <div id={styles.saveGoalList}>
      {saveGoalInfo.map((saveGoal: Inputs) => (
        <Link
          className={styles.link}
          key={saveGoal._id}
          href={`/editSavegoal/${saveGoal._id.toString()}`}
        >
          <button className={styles.saveGoal}>{saveGoal.name}</button>
        </Link>
      ))}
    </div>
  );
}
