"use client";

import React from "react";
import { useState, useEffect } from "react";
import "./page.css";

interface loanInterface {
	id: number;
	name: string;
	amount: string;
	repayAmount: string;
	interest: string | 0;
	useInflation: boolean;
	useDeductions: boolean;
	targetDate: string;
	startDate: string;
}

interface response {
	ok: boolean;
	message: string;
}

export default function AddLoanPage() {
	const [name, setName] = useState<string>("");
	const [amount, setAmount] = useState<string>("");
	const [repayAmount, setRepayAmount] = useState<string>("");
	const [interest, setInterest] = useState<string>("");
	const [useInflation, setUseInflation] = useState<boolean>(false);
	const [useDeductions, setUseDeductions] = useState<boolean>(false);
	const [targetDate, setTargetDate] = useState<string>("");
	const [startDate, setStartDate] = useState<string>(
		new Date().toISOString().split("T")[0],
	);

	const [statusMessage, setStatusMessage] = useState<string>("");
	const [currency, setCurrency] = useState<string>("kr");
	// Hade en ide med currency som jag inte implementerade

	function clearData() {
		setName("");
		setAmount("");
		setRepayAmount("");
		setInterest("");
		setUseInflation(false);
		setUseDeductions(false);
		setTargetDate("");
		setStartDate("");
	}

	useEffect(() => {
		function calcMonthlyAmount() {
			if (!targetDate || !startDate || !amount) {
				return;
			}
			const target = new Date(targetDate);
			const start = new Date(startDate);

			let monthsDiff: number =
				1 +
				(target.getFullYear() - start.getFullYear()) * 12 +
				(target.getMonth() - start.getMonth());

			if (target.getDate() < start.getDate()) {
				monthsDiff--;
			}
			if (monthsDiff > 0) {
				setRepayAmount(Math.floor(Number(amount) / monthsDiff).toString());
			} else {
				setRepayAmount(amount);
			}
		}
		calcMonthlyAmount();
	}, [amount, startDate, targetDate]);

	useEffect(() => {}, []);

	async function saveData() {
		const loanData: loanInterface = {
			id: Date.now(),
			name,
			amount,
			repayAmount,
			interest,
			useInflation,
			useDeductions,
			targetDate,
			startDate,
		};

		const data = await fetch("/api/public/save_loan", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(loanData),
		});
		const response: response = await data.json();

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
			<div className="inputContainer">
				<label>
					Namn
					<input
						value={name}
						onChange={(e) => {
							setName(e.target.value);
						}}
					/>
				</label>
				<label>
					Summa
					<input
						value={amount}
						onChange={(e) => {
							const value = e.target.value;
							if (/^\d*(\.\d{0,2})?$/.test(value) || 0) {
								setAmount(value);
							}
						}}
					/>{" "}
					{currency}
				</label>
				<label>
					Amortering
					<input
						value={repayAmount}
						onChange={(e) => {
							const value = e.target.value;
							if (Number(value) > Number(amount)) {
								setRepayAmount(amount);
								setStatusMessage("Kan inte överskrida totalsumman");
							} else if (
								/^\d*(\.\d{0,2})?$/.test(value) ||
								Number(value) < Number(amount)
							) {
								setRepayAmount(value);
							}
						}}
					/>{" "}
					{currency}
				</label>

				<label>
					Ränta
					<input
						value={interest}
						onChange={(e) => {
							const value = e.target.value;
							if (/^\d*(\.\d{0,2})?$/.test(value) || 0) {
								setInterest(value);
							}
						}}
					/>{" "}
					%
				</label>
				<label>
					Inkludera inflation
					<input
						onChange={() => {
							setUseInflation(!useInflation);
						}}
						type="checkbox"
						checked={useInflation}
					></input>
				</label>
				<label>
					Inkludera skatteavdrag
					<input
						onChange={() => {
							setUseDeductions((prev) => {
								return !prev;
							});
						}}
						type="checkbox"
						checked={useDeductions}
					></input>
				</label>

				<label>
					Startdatum
					<input
						value={startDate}
						onChange={(e) => {
							setStartDate(e.target.value);
						}}
						type="date"
					></input>
				</label>
				<label>
					Måldatum
					<input
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
				</label>
				<button
					disabled={!name || !amount || !repayAmount || !interest || !startDate}
					onClick={saveData}
				>
					Lägg till
				</button>
				<p>{statusMessage}</p>
			</div>
		</div>
	);
}
