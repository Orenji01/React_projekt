"use client";
import { useEffect, useState } from "react";
import {
	dataResponse,
	cashFlowItem,
	savingsItem,
	loanItem,
} from "../types/overViewTypes";
import styles from "./page.module.css";
import { Divide } from "lucide-react";

export default function BalancePage() {
	const [income, setIncome] = useState<cashFlowItem[]>([]);
	const [expense, setExpenses] = useState<cashFlowItem[]>([]);
	const [loans, setLoans] = useState<loanItem[]>([]);
	const [savings, setSavings] = useState<savingsItem[]>([]);

	useEffect(() => {
		async function getIncome() {
			const response = await fetch("/api/public/overview-data/get-income");
			const res: dataResponse<cashFlowItem[]> = await response.json();
			setIncome(res.data ?? []);
		}
		async function getExpenses() {
			const response = await fetch("/api/public/overview-data/get-expense");
			const res: dataResponse<cashFlowItem[]> = await response.json();
			setExpenses(res.data ?? []);
		}

		async function getLoans() {
			const response = await fetch("/api/public/overview-data/get-loans");
			const res: dataResponse<loanItem[]> = await response.json();
			setLoans(res.data ?? []);
		}

		async function getSavings() {
			const response = await fetch("/api/public/overview-data/get-savings");
			const res: dataResponse<savingsItem[]> = await response.json();
			setSavings(res.data ?? []);
		}
		getIncome();
		getExpenses();
		getLoans();
		getSavings();
	}, []);

	useEffect(() => {
		console.log(savings);
	}, [savings]);

	return (
		<>
			<section className={styles.balanceContainer}>
				<div className={styles.balanceCard}>
					<h1 className={styles.title}>Din Balans</h1>

					<h2>Inkomster</h2>
					<ul className={styles.balanceList}>
						{income.length ? (
							income.map((item) => (
								<li key={item.id} className={styles.balanceItem}>
									<span>{item.name}</span>
									<span>{item.amount} kr</span>
								</li>
							))
						) : (
							<div>Hämtar...</div>
						)}
					</ul>

					<h2>Utgifter</h2>
					<ul className={styles.balanceList}>
						{expense.length ? (
							expense.map((item) => (
								<li key={item.id} className={styles.balanceItem}>
									<span>{item.name}</span>
									<span>{item.amount} kr</span>
								</li>
							))
						) : (
							<div>Hämtar...</div>
						)}
					</ul>

					<h2>Lån</h2>
					<ul className={styles.balanceList}>
						{loans.length ? (
							loans.map((item) => (
								<li key={item.id} className={styles.balanceItem}>
									<span>{item.name}</span>
									<span>{item.amount} kr</span>
								</li>
							))
						) : (
							<div>Hämtar...</div>
						)}
					</ul>

					<h2>Sparande</h2>
					<ul className={styles.balanceList}>
						{savings.length ? (
							savings.map((item) => (
								<li key={item.id} className={styles.balanceItem}>
									<span>{item.name}</span>
									<span>{item.amount} kr</span>
								</li>
							))
						) : (
							<div>Hämtar...</div>
						)}
					</ul>
				</div>
			</section>
		</>
	);
}
