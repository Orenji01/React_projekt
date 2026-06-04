"use client"
import { useEffect, useState } from "react";
import { sourceItem, sourceResponse } from "../types/overViewTypes";
import styles from "./page.module.css"


export default function BalancePage() {
    const [income, setIncome] = useState<sourceItem[]>([]);
    const [expenses, setExpenses] = useState<sourceItem[]>([]);
    const [loans, setLoans] = useState<sourceItem[]>([]);
    const [savings, setSavings] = useState<sourceItem[]>([]);

    async function getIncome() {
        const response = await fetch("/api/public/overview-data/get-income");
        const res: sourceResponse = await response.json();
        setIncome(res.data ?? []);
    }

    async function getExpenses() {
        const response = await fetch("/api/public/overview-data/get-expenses");
        const res: sourceResponse = await response.json();
        setExpenses(res.data ?? []);
    }

    async function getLoans() {
        const response = await fetch("/api/public/overview-data/get-loans");
        const res: sourceResponse = await response.json();
        setLoans(res.data ?? []);
    }

    async function getSavings() {
        const response = await fetch("/api/public/overview-data/get-savings");
        const res: sourceResponse = await response.json();
        setSavings(res.data ?? []);
    }

    useEffect(() => {
        getIncome();
        getExpenses();
        getLoans();
        getSavings();
    }, []);

    return (
        <>
            <section className={styles.balanceContainer}>
                <div className={styles.balanceCard}>
                    <h1 className={styles.title}>Din Balans</h1>

                    <h2>Inkomster</h2>
                    <ul className={styles.balanceList}>

                        {income.map((item) => (
                            <li key={item._id} className={styles.balanceItem}>
                                    <span>{item.name}</span>
                                    <span>{item.amount} kr</span>
                            </li>
                        ))}
                    </ul>

                    <h2>Utgifter</h2>
                    <ul className={styles.balanceList}>

                        {expenses.map((item) => (
                            <li key={item._id} className={styles.balanceItem}>
                                    <span>{item.name}</span>
                                    <span>{item.amount} kr</span>
                            </li>
                        ))}
                    </ul>

                    <h2>Lån</h2>
                    <ul className={styles.balanceList}>

                        {loans.map((item) => (
                            <li key={item._id} className={styles.balanceItem}>
                                    <span>{item.name}</span>
                                    <span>{item.amount} kr</span>
                            </li>
                        ))}
                    </ul>

                    <h2>Sparande</h2>
                    <ul className={styles.balanceList}>

                        {savings.map((item) => (
                            <li key={item._id} className={styles.balanceItem}>
                                    <span>{item.name}</span>
                                    <span>{item.amount} kr</span>
                            </li>
                        ))}
                    </ul>

                </div>
            </section>
        </>
    );
}
