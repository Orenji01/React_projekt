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
		setStartDate(new Date().toISOString().split("T")[0]);
	}

	// Mixade med dessa konstanter för att försöka få till något som justerade en avvikelse jag verkar ha i beräkingen av totala räntan... Skrotar dock den iden för stunden.

	// const firstMonthInterest =
	// 	amount !== null && interest !== null ? amount * (interest / 100 / 12) : 0;

	// const firstMonthPayment =
	// 	amount !== null ? amount / months + firstMonthInterest : 0;

	// Nedan ser du ett knapphändigt försök att generera ett lite random nummer. Inser att milli kan bli samma mellan olika submits men oddsen är åtminstone låga
	function makeName(name: string) {
		let newName;
		if (name === "") {
			const digits = () => {
				const date = new Date();
				const month = date.getMonth();
				const year = date.getFullYear();
				const milli = date.getMilliseconds();
				return String(month + year + milli);
			};
			newName = "QuickAdd " + digits();
		} else {
			newName = name;
		}

		return newName;
	}

	function makeInterest(int: number | null) {
		let newInterest;
		if (interest === null) {
			newInterest = 0;
		} else {
			newInterest = int;
		}

		return newInterest;
	}

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
			// Skulle kunna använda "perMonth" här men genom att bara räkna ut kostnaden igen så slipper jag ta in variabeln i funktionen.
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

	async function saveData(e: React.SubmitEvent<HTMLFormElement>) {
		e.preventDefault();
		const loanData: loanItem = {
			id: Date.now(),
			name: makeName(name),
			amount: Number(amount),
			perMonth: Number(perMonth),
			interest: Number(makeInterest(interest)),
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
		<div className={styles.pageContainer}>
			<h1 id={styles.header}>Lägg till nytt lån</h1>
			<form onSubmit={saveData} className={styles.inputForm}>
				<div className={styles.baseInfo}>
					<label className={styles.label}>
						Namn
						<input
							className={styles.input}
							value={name}
							aria-describedby="nameHelp"
							onChange={(e) => {
								setName(e.target.value);
							}}
						/>
						<span id="nameHelp" className={styles.screenReaderOnly}>
							Namn på lånet
						</span>
					</label>

					<label className={styles.label}>
						Summa<span aria-hidden="true">*</span>
						<input
							className={styles.input}
							value={amount === 0 || amount === null ? "" : amount}
							aria-describedby="amountHelp"
							required
							onChange={(e) => {
								const value = e.target.value;
								if (/^\d*(\.\d{0,2})?$/.test(value) || 0) {
									setAmount(Number(value));
								}
							}}
						/>
						<div aria-hidden>{currency}</div>
						<span id="amountHelp" className={styles.screenReaderOnly}>
							Obligatoriskt, Belopp i jämna kronor
						</span>
					</label>
				</div>
				<div className={styles.loanCost}>
					<label className={styles.sliderLabel}>
						Avbetalningstid
						<input
							className={styles.inputSlider}
							disabled={!amount}
							value={months}
							min="1"
							max="60"
							type="range"
							aria-valuemin={1}
							aria-valuemax={60}
							aria-valuenow={months}
							aria-valuetext={`${months} månader`}
							onChange={(e) => {
								setMonths(Number(e.target.value));
							}}
						/>
						{months} Månader
					</label>

					<label className={styles.interest}>
						Årsränta:
						<input
							aria-describedby="interestHelp"
							type="number"
							step="0.01"
							min={0}
							max={500}
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
						<span id="interestHelp" className={styles.screenReaderOnly}>
							Årlig ränta i procent
						</span>
					</label>
					<div aria-atomic="true" aria-live="polite">
						Beräknad månadskostnad:<span aria-hidden> </span>
						<strong>
							{Math.floor(Number(perMonth))}
							{currency}
						</strong>
					</div>
					<div aria-atomic="true" aria-live="polite">
						Total räntekostnad<span aria-hidden> </span>
						<strong>
							{interestCost}
							<span aria-hidden> </span>
							{currency}
						</strong>
					</div>
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
				<div className={styles.StartDateContainer}>
					<label className={styles.labelStarDate}>
						Startdatum<span aria-hidden="true">*</span>
						<input
							className={styles.input}
							value={startDate}
							onChange={(e) => {
								setStartDate(e.target.value);
							}}
							type="date"
						></input>
					</label>
				</div>
				<p>* obligatoriskt fält</p>
				<p
					className={styles.statusMessage}
				>{`Status: ${statusMessage ? statusMessage : "..."}`}</p>
				<input
					type="submit"
					className={styles.submitButton}
					disabled={!amount || !startDate}
				/>
			</form>
		</div>
	);
}
