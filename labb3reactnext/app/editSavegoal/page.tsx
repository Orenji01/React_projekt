"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";

type Inputs = {
  _id: string;
  name: string;
  amount: number;
  perMonth: number;
  interest: number;
  inflation: number;
  targetDate: Date;
  startDate: Date;
};

export default function Editsavegoal() {
  const [saveGoalInfo, setSaveGoalInfo] = useState([]);

  useEffect(() => {
    fetch("/api/public/savegoal")
      .then((res) => res.json())
      .then((data) => setSaveGoalInfo(data));
  }, []);
  return (
    <div id={styles.saveGoalList}>
      {saveGoalInfo.map((saveGoal: Inputs) => (
        <Link
          className={styles.link}
          key={saveGoal._id}
          href={`/editSavegoal/${saveGoal.name.toLowerCase()}`}
        >
          <button className={styles.saveGoal}>{saveGoal.name}</button>
        </Link>
      ))}
    </div>
  );
}
