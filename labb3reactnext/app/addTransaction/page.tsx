"use client";
import { useEffect, useState } from "react";
import "./page.css";

interface responseData {
	ok: boolean;
	message: string;
}

export default function AddTransaction({}) {
	const [data, setData] = useState<responseData | null>(null);

	const [name, setName] = useState<string>("");
	// const [nameLengtWarning, setNameLengtWarning] = useState<string>("");
	const [amount, setAmount] = useState<string>("");
	const [date, setDate] = useState<string>("");
	const [transactionType, setTransactionType] = useState<string>("");
	const [currency, setCurrency] = useState<string>("kr");
	const [recurring, setrecurring] = useState<boolean>(false);

	const handleClick = () => {};

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
		async function getData() {
			const response = await fetch("/api/public/save_post");
			const res: responseData = await response.json();
			setData(res);
			console.log(res.message);
		}
		getData();
	}, []);

	return (
		<div className="container">
			<div id="addTransaction">
				Bästa sidan ever
				{data && <p className="p-element">{data.message}</p>}
			</div>
			<h1>Lägg till Utgift/Inkomst</h1>
			<div className="inputBox">
				<label title="Transaktions namn">
					Namn
					<input
						onChange={(e) => {
							setName(e.target.value);
						}}
						maxLength={15}
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
							defaultChecked
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
			<button onClick={handleClick}>Test</button>
		</div>
	);
}
