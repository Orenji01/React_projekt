import { NextResponse } from "next/server";
import { getDB } from "@/lib/mongodbnext";

import { cashFlowItem } from "@/app/types/overViewTypes";

export async function GET() {
	try {
		const mongo = await getDB();

		if (mongo === 0) {
			return NextResponse.json(
				{
					ok: true,
					data: sampleData,
					message: "DB koppling misslyckades, använder exempleldata",
				},
				{ status: 200 },
			);
		}

		const data = await mongo
			.collection<cashFlowItem>("cashflow")
			.find({ type: "income" })
			.toArray();

		if (data.length === 0) {
			return NextResponse.json(
				{
					ok: true,
					data: sampleData,
					message: "Using example data",
				},
				{ status: 200 },
			);
		}

		return NextResponse.json(
			{ ok: true, data: data, message: "This message from income route" },
			{ status: 200 },
		);
	} catch (e) {
		console.log(e);
		return NextResponse.json(
			{ ok: false, data: [], message: "Ett ohanterat fel inträffade" },
			{ status: 500 },
		);
	}
}

const sampleData = [
	{
		_id: "6a23d580550b2d22d9f3c0eb",
		id: 1,
		type: "income",
		category: "salary",
		repeating: true,
		name: "Salary",
		amount: 42000,
		date: "2026-02-25",
		created: "2025-03-24",
	},
	{
		_id: "6a23d580550b2d22d9f3c0ec",
		id: 2,
		type: "income",
		category: "benefits",
		repeating: true,
		name: "Child Benefit",
		amount: 1250,
		date: "2026-02-20",
		created: "2025-03-24",
	},
	{
		_id: "6a23d580550b2d22d9f3c0ed",
		id: 3,
		type: "income",
		category: "investment",
		repeating: false,
		name: "Dividend",
		amount: 1800,
		date: "2026-02-18",
		created: "2026-02-18",
	},
	{
		_id: "6a25f10f3cd0ed6c35d84c92",
		id: 4,
		type: "income",
		category: "freelance",
		repeating: false,
		name: "Website Project",
		amount: 12500,
		date: "2026-02-10",
		created: "2026-02-10",
	},
	{
		_id: "6a25f10f3cd0ed6c35d84c93",
		id: 5,
		type: "income",
		category: "gift",
		repeating: false,
		name: "Birthday Gift",
		amount: 2000,
		date: "2026-02-05",
		created: "2026-02-05",
	},
];
