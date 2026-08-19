"use client";
import { useEffect, useState } from "react";

export default function Summary() {
	const [income, setIncome] = useState<sourceItem[]>([]);
	const [expense, setExpenses] = useState<sourceItem[]>([]);
	const [loans, setLoans] = useState<sourceItem[]>([]);
	const [savings, setSavings] = useState<sourceItem[]>([]);

	useEffect(() => {
		async function getIncome() {
			const response = await fetch("/api/public/overview-data/get-income");
			const res: sourceResponse = await response.json();
			setIncome(res.data ?? []);
		}
		async function getExpenses() {
			const response = await fetch("/api/public/overview-data/get-expense");
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
		getIncome();
		getExpenses();
		getLoans();
		getSavings();
	}, []);
	return <div>Testar</div>;
}
