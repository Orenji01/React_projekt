"use client";
import { getOverviewData } from "../functions/functions";
import Link from "next/link";
import { Plus } from "lucide-react";
import { sourceItem } from "../types/overViewTypes";
import { useEffect, useState } from "react";

interface Overwiewbox {
	type: string;
}

export default function Overviewbox({ type }: Overwiewbox) {
	const [data, setData] = useState<sourceItem[]>([]);

	const setNav = () => {
		return (
			<Link className="plusLink" href={`/add${type}`}>
				<Plus />
			</Link>
		);
	};

	useEffect(() => {
		async function fetchData() {
			const response: sourceItem[] = (await getOverviewData(type)) ?? [];
			setData(response ?? []);
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
		if (type === "expenses") {
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
