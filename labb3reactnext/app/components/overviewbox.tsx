"use client";
import { getOverviewData } from "../functions/functions";
import Link from "next/link";
import { Plus } from "lucide-react";
import { sourceItem, cashFlowItem } from "../types/someTypes";
import { useEffect, useState } from "react";

interface Overwiewbox {
	type: string;
}

export default function Overviewbox({ type }: Overwiewbox) {
	const [data, setData] = useState<sourceItem[] | cashFlowItem[]>([]);

	const setNav = () => {
		return (
			<Link className="plusLink" href={`/add${type}`}>
				<Plus />
			</Link>
		);
	};

	function setIncomeOrExpenses(
		transactions: cashFlowItem[],
		type: "income" | "expense",
	): cashFlowItem[] | undefined {
		if (!transactions || transactions.length === 0) return;
		const extracted: cashFlowItem[] = [];
		let index = 0;
		for (const t of transactions) {
			if (t.type === type) {
				extracted.unshift(transactions[index]);
			}
			index++;
			console.log("extracted: ", extracted);
		}
		return extracted;
	}

	useEffect(() => {
		async function fetchData() {
			if (type === "income" || type === "expense") {
				const transactions = (await getOverviewData(type)) ?? [];

				if (type === "income") {
					const income = setIncomeOrExpenses(
						transactions as cashFlowItem[],
						type,
					);
					setData((income as cashFlowItem[]) ?? []);
				}
				if (type === "expense") {
					const expense = setIncomeOrExpenses(
						transactions as cashFlowItem[],
						type,
					);
					setData((expense as cashFlowItem[]) ?? []);
				}
			}
			if (type === "loans" || type === "savings") {
				const transactions = (await getOverviewData(type)) ?? [];
				setData((transactions as sourceItem[]) ?? []);
			}
		}
		fetchData();
	}, [type]);

	function total() {
		let totalSum = 0;
		for (const item of data) {
			totalSum += item.amount;
		}
		return totalSum;
	}

	const setDesc = () => {
		if (type === "savings") {
			return "Sparande";
		}
		if (type === "loans") {
			return "Lån";
		}
		if (type === "income") {
			return "Inkomster";
		}
		if (type === "expense") {
			return "Utgifter";
		}
	};

	return (
		<div className={`overviewbox ${type}`}>
			<p id="boxDesc">{setDesc()}</p>
			<div className="listBox">
				<table>
					<thead>
						<tr>
							<th>Namn</th>
							<th>Summa</th>
						</tr>
					</thead>
					<tbody>
						{data.map((item, index) => (
							<tr key={index}>
								<td>{item.name}</td>
								<td>{item.amount}</td>
							</tr>
						))}
					</tbody>
				</table>
				Total {total()}
			</div>
			{setNav()}
		</div>
	);
}
