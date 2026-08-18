"use client";
import { useEffect, useState } from "react";
import "./page.css";

interface responseData {
	ok: boolean;
	message: string;
}

export interface transactionData {
	id: number;
	type: string;
	name: string;
	recurring?: boolean;
	amount: string;
	date: string;
}

export default function AddTransaction({}) {
	const [name, setName] = useState<string>("");
	const [amount, setAmount] = useState<string>("");
	const [date, setDate] = useState<string>("");
	const [transactionType, setTransactionType] = useState<string>("expense");
	const [currency, setCurrency] = useState<string>("kr");
	// Hade en ide med currency som jag inte implementerade
	const [recurring, setrecurring] = useState<boolean>(false);
	const [statusMessage, setStatusMessage] = useState<string>("");

	useEffect(() => {
		console.log(date);
	}, [date]);
	useEffect(() => {
		console.log(name);
	}, [name]);
	useEffect(() => {
		console.log(amount);
	}, [amount]);
	useEffect(() => {
		console.log(recurring);
	}, [recurring]);

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

	async function saveData(transactionData: transactionData) {
		const response = await fetch("/api/public/save_post", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(transactionData),
		});
		const res: responseData = await response.json();
		if (res.ok) {
			setStatusMessage(res.message);
			console.log(res.message);
			clearData();
		}
	}

	function clearData() {
		setName("");
		setAmount("");
		setDate("");
		setTransactionType("");
		setrecurring(false);
		setTransactionType("expense");
	}

	const handleClick = (): void => {
		const transactionData: transactionData = {
			id: Date.now(),
			type: transactionType,
			name: name,
			recurring: recurring,
			amount: amount,
			date: date,
		};
		saveData(transactionData);
	};

	return (
		<div className="container">
			<h1>Lägg till Utgift/Inkomst</h1>
			<div className="inputBox">
				<label title="Transaktions namn">
					Namn
					<input
						onChange={(e) => {
							setName(e.target.value);
						}}
						maxLength={15}
						value={name}
					/>{" "}
					{name.length} / 15
				</label>
			</div>
			<div className="inputBox">
				<label title="Transaktions summa">
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
			</div>
			<div className="inputBox">
				<label title="Transaktions Datum">
					Datum
					<input
						type="date"
						value={date}
						onChange={(e) => {
							setDate(e.currentTarget.value);
						}}
					/>
				</label>
			</div>
			<div className="inputBox">
				<div>
					<label className="radioBox" title="Transaktions typ">
						Utgift
						<input
							title="Utgift"
							type="radio"
							name="transactionType"
							value="expense"
							onChange={(e) => {
								// console.log(e.target.value);
								setTransactionType(e.target.value);
							}}
							checked={transactionType === "expense"}
						/>{" "}
						Inkomst
						<input
							title="Inkomst"
							type="radio"
							name="transactionType"
							value="income"
							onChange={(e) => {
								// console.log(e.target.value);
								setTransactionType(e.target.value);
							}}
							checked={transactionType === "income"}
						/>
					</label>
				</div>
			</div>
			<div className="inputBox">
				<label>
					Återkommande
					<input
						type="checkbox"
						onChange={() => {
							setrecurring(!recurring);
						}}
					/>
				</label>
			</div>
			<button disabled={!name || !amount || !date} onClick={handleClick}>
				Test
			</button>
			<p>{statusMessage}</p>
		</div>
	);
}
