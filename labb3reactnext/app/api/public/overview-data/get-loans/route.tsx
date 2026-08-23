import { NextResponse } from "next/server";
import { getDB } from "@/lib/mongodbnext";

import { loanItem } from "@/app/types/someTypes";

export async function GET() {
	try {
		const mongo = await getDB();

		if (mongo === 0) {
			return NextResponse.json(
				{
					ok: true,
					data: sampleData,
					message: "No db connection, using sample data",
				},
				{ status: 200 },
			);
		}

		const data = await mongo.collection<loanItem>("loans").find().toArray();

		if (data.length === 0) {
			return NextResponse.json(
				{
					ok: true,
					data: sampleData,
					message: "No data found, using sample data",
				},
				{ status: 200 },
			);
		}

		return NextResponse.json(
			{ ok: true, data: data, message: "This message from loans route" },
			{ status: 200 },
		);
	} catch (e) {
		console.log(e);
		return NextResponse.json(
			{ ok: true, data: [], message: "Ett okänt fel inträffade" },
			{ status: 500 },
		);
	}
}

const sampleData = [
	{
		_id: "6a1de9778b7c3125a370ce40",
		id: 1,
		name: "Happy Monday",
		amount: 25000,
		perMonth: 250,
		interest: 3,
		inflation: 4,
		deductions: false,
		targetDate: "2026-10-25",
		startDate: "2026-08-10",
	},
	{
		_id: "6a1de9778b7c3125a370ce40",
		id: 2,
		name: "Crude oil",
		amount: 4000,
		perMonth: 200,
		interest: 2,
		inflation: 4,
		deductions: false,
		targetDate: "2027-07-25",
		startDate: "2026-08-10",
	},
];
