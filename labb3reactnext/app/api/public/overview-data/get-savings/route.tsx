import { NextResponse } from "next/server";
import { getDB } from "@/lib/mongodbnext";
// import { getDB } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export interface savingsObject {
	_id: ObjectId;
	id: number;
	name: string;
	amount: number;
	perMonth: number;
	inflation: number;
	targetDate: string;
	startDate: string;
}

export async function GET() {
	try {
		const mongo = await getDB();

		if (mongo === 0) {
			return NextResponse.json(
				{
					ok: true,
					data: sampleData,
					message: "No db! Using example data",
				},
				{ status: 200 },
			);
		}

		const data = await mongo
			.collection<savingsObject>("savings")
			.find()
			.toArray();

		if (data!) {
			return NextResponse.json(
				{ ok: true, data: sampleData, message: "No data, using example data" },
				{ status: 200 },
			);
		}

		return NextResponse.json(
			{ ok: true, data: data, message: "This message from savings route" },
			{ status: 200 },
		);
	} catch (e) {
		console.log(e);
		return NextResponse.json(
			{ ok: false, data: [], message: "Okänt fel inträffade" },
			{ status: 500 },
		);
	}
}

const sampleData = [
	{
		_id: "6a1de9778b7c3125a370ce40",
		id: 1,
		name: "Emergency Fund",
		amount: 25000,
		perMonth: 250,
		interest: 3,
		inflation: 4,
		targetDate: "2026-10-25",
		startDate: "2026-08-10",
	},
	{
		_id: "6a1de9778b7c3b4ea370ce40",
		id: 2,
		name: "Waterdrum",
		amount: 25000,
		perMonth: 432,
		interest: 4,
		inflation: 3,
		targetDate: "2026-11-28",
		startDate: "2026-08-10",
	},
];
