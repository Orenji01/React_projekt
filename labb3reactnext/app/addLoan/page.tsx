"use client";
import { dataResponse, loanItem } from "../types/someTypes";
import { useState, useEffect } from "react";
import styles from "./page.module.css";

export default function AddLoanPage() {
	const [name, setName] = useState<string>("");
	const [amount, setAmount] = useState<number | null>(null);
	const [perMonth, setPerMonth] = useState<number | null>(null);
	const [interest, setInterest] = useState<number | null>(null);
	const [inflation, setInflation] = useState<boolean>(false);
	const [deductions, setDeductions] = useState<boolean>(false);
	const [targetDate, setTargetDate] = useState<string>("");
	const [startDate, setStartDate] = useState<string>(
		new Date().toISOString().split("T")[0],
	);
	const [months, setMonths] = useState<number>(12);

	const [statusMessage, setStatusMessage] = useState<string>("");
	const [currency, setCurrency] = useState<string>("kr");
	const [interestCost, setInterestCost] = useState<number>(0);
	// Hade en ide med currency som jag inte implementerade

	function clearData() {
		setName("");
		setAmount(null);
		setPerMonth(null);
		setInterest(null);
		setInflation(false);
		setDeductions(false);
		setTargetDate("");
		setStartDate("");
	}

	const firstMonthInterest =
		amount !== null && interest !== null ? amount * (interest / 100 / 12) : 0;

	const firstMonthPayment =
		amount !== null ? amount / months + firstMonthInterest : 0;

	// useEffect(() => {
	// 	function calcMonthlyAmount() {
	// 		if (!targetDate || !startDate || !amount) {
	// 			return;
	// 		}
	// 		const target = new Date(targetDate);
	// 		const start = new Date(startDate);

	// 		let monthsDiff: number =
	// 			1 +
	// 			(target.getFullYear() - start.getFullYear()) * 12 +
	// 			(target.getMonth() - start.getMonth());

	// 		if (target.getDate() < start.getDate()) {
	// 			monthsDiff--;
	// 		}
	// 		if (monthsDiff > 0) {
	// 			setPerMonth(Math.floor(Number(amount) / monthsDiff).toString());
	// 		} else {
	// 			setPerMonth(amount);
	// 		}
	// 	}
	// 	calcMonthlyAmount();
	// }, [amount, startDate, targetDate]);

	useEffect(() => {
		if (!amount || !months) return;
		function calcMonths() {
			setPerMonth((): number => {
				const value = Number(amount) / months;

				return Number(Math.floor(value).toString());
			});
		}
		calcMonths();
	}, [amount, months]);

	useEffect(() => {
		function calcAccInterest() {
			if (amount === null || !months || interest === null) {
				return;
			}

			let remaining = amount;
			let accumulated = 0;

			const monthlyAmortization = amount / months;
			// Skulle kunna använda "perMonth" här men... näää
			const monthlyInterest = interest / 100 / 12;

			for (let month = 1; month <= months; month++) {
				const monthsInterest = remaining * monthlyInterest;

				accumulated += monthsInterest;
				remaining -= monthlyAmortization;
			}

			setInterestCost(Math.floor(accumulated));
		}
		calcAccInterest();
	}, [amount, months, interest]);

	async function saveData() {
		if (name === "") {
			setName("Ett lån");
		}
		const loanData: loanItem = {
			id: Date.now(),
			name,
			amount: Number(amount),
			perMonth: Number(amount),
			interest: Number(amount),
			inflation,
			deductions,
			targetDate,
			startDate,
		};

		const data = await fetch("/api/public/save_loan", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(loanData),
		});
		const response: dataResponse<loanItem> = await data.json();

		if (response.ok!) {
			setStatusMessage(response.message);
		}

		console.log("Grejjer tillagda");
		setStatusMessage(response.message);
		clearData();
	}

	useEffect(() => {
		if (statusMessage === "") {
			return;
		}
		const timer = setTimeout(() => {
			setStatusMessage("");
		}, 4000);
		return () => {
			clearTimeout(timer);
		};
	}, [statusMessage]);

	return (
		<div>
			<form onSubmit={saveData} className={styles.inputContainer}>
				<label className={styles.label}>
					Namn
					<input
						className={styles.input}
						value={name}
						onChange={(e) => {
							setName(e.target.value);
						}}
					/>
				</label>
				<label className={styles.label}>
					Summa*
					<input
						className={styles.input}
						value={amount ?? ""}
						placeholder={currency}
						onChange={(e) => {
							const value = e.target.value;
							if (/^\d*(\.\d{0,2})?$/.test(value) || 0) {
								setAmount(Number(value));
							}
						}}
					/>{" "}
				</label>
				{/* <label className={styles.label}>
					Amortering
					<input
						className={styles.input}
						value={perMonth}
						onChange={(e) => {
							const value = e.target.value;
							if (Number(value) > Number(amount)) {
								setPerMonth(amount);
								setStatusMessage("Kan inte överskrida totalsumman");
							} else if (
								/^\d*(\.\d{0,2})?$/.test(value) ||
								Number(value) < Number(amount)
							) {
								setPerMonth(value);
							}
						}}
					/>{" "}
					{currency}
				</label> */}
				<div className={styles.loanCost}>
					<label className={styles.slider}>
						Avbetalningstid
						<input
							className={styles.input}
							disabled={!amount}
							value={months}
							min="1"
							max="60"
							type="range"
							onChange={(e) => {
								setMonths(Number(e.target.value));
							}}
						/>
						{months} Månader
					</label>
					Kostnad: {Math.floor(Number(perMonth))} per månad.{" "}
					{/* <label className={styles.label}>
					Måldatum
					<input
						className={styles.input}
						value={targetDate}
						onChange={(e) => {
							if (startDate > e.target.value) {
								setTargetDate(startDate);
								setStatusMessage("Mål datum kan inte underskrida Startdatum");
								return;
							}
							setTargetDate(e.target.value);

							setStatusMessage("");
						}}
						type="date"
					></input>
				</label> */}
					<label className={styles.interest}>
						Ränta
						<input
							type="number"
							step="0.01"
							className={styles.interestInput}
							value={interest ?? ""}
							onChange={(e) => {
								const value = e.target.value;
								if (value === "") {
									setInterest(null);
									setInterestCost(0);
									return;
								}
								if (/^\d*(\.\d{0,2})?$/.test(value) || 0) {
									setInterest(Number(value));
								}
							}}
						/>{" "}
						%
					</label>
					<div>Total räntekostnad {interestCost}</div>
				</div>
				<div className={styles.checkboxes}>
					<label className={styles.labelCheck}>
						Inkludera inflation
						<input
							className={styles.checkInput}
							onChange={() => {
								setInflation(!inflation);
							}}
							type="checkbox"
							checked={inflation}
						></input>
					</label>

					<label className={styles.labelCheck}>
						Inkludera skatteavdrag
						<input
							className={styles.inputCheck}
							onChange={() => {
								setDeductions((prev) => {
									return !prev;
								});
							}}
							type="checkbox"
							checked={deductions}
						></input>
					</label>
				</div>
				<label className={styles.label}>
					Startdatum
					<input
						className={styles.input}
						value={startDate}
						onChange={(e) => {
							setStartDate(e.target.value);
						}}
						type="date"
					></input>
				</label>
				<p>* obligatoriska fält</p>
				<input
					type="submit"
					className={styles.submitButton}
					disabled={!name || !amount || !perMonth || !interest || !startDate}
				/>
				<p>{statusMessage}</p>
			</form>
		</div>
	);
}
