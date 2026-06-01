"use client";
import Link from "next/link";
import { Plus } from "lucide-react";

interface Overwiewbox {
	type: string;
}

export default function Overviewbox({ type }: Overwiewbox) {
	const setNav = () => {
		return (
			<Link className="plusLink" href={`/add${type}`}>
				<Plus />
			</Link>
		);
	};

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
						<tr>
							<td>*namn</td>
							<td>*summa</td>
						</tr>
						<tr>
							<td>*namn</td>
							<td>*summa</td>
						</tr>
					</tbody>
				</table>
			</div>
			{setNav()}
		</div>
	);
}
