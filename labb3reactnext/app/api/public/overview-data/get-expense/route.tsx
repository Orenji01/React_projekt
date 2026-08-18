import { NextResponse } from "next/server";
import { getDB } from "@/lib/mongodbnext";
// import { getDB } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export interface overViewObject {
	_id: ObjectId;
	name: string;
	amount: number;
}

export async function GET() {
	try {
		const mongo = await getDB();

		if (mongo === 0) {
			return NextResponse.json(
				{
					ok: true,
					data: sampleData,
					message: "Ingen DB hittades, använder exempeldata",
				},
				{ status: 200 },
			);
		}

		const data = await mongo
			.collection<overViewObject>("cashflow")
			.find({ type: "expense" })
			.toArray();

		if (data.length === 0) {
			return NextResponse.json(
				{
					ok: true,
					data: sampleData,
					message: "Ingen data hittades, använder exempeldata",
				},
				{ status: 200 },
			);
		}

		return NextResponse.json(
			{ ok: true, data: data, message: "This message from expense route" },
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
		_id: "6a23d580550b2d22d9f3c0ee",
		type: "expense",
		category: "housing",
		repeating: true,
		name: "Rent",
		amount: 8500,
		date: "2026-02-12",
		created: "2025-03-24",
	},
	{
		_id: "6a23d580550b2d22d9f3c0ef",
		type: "expense",
		category: "utilities",
		repeating: true,
		name: "Electricity",
		amount: 650,
		date: "2026-02-28",
		created: "2025-03-24",
	},
	{
		_id: "6a23d580550b2d22d9f3c0f0",
		type: "expense",
		category: "utilities",
		repeating: true,
		name: "Internet",
		amount: 399,
		date: "2026-02-15",
		created: "2025-03-24",
	},
	{
		_id: "6a23d580550b2d22d9f3c0f1",
		type: "expense",
		category: "food",
		repeating: false,
		name: "Restaurant",
		amount: 720,
		date: "2026-02-14",
		created: "2026-02-14",
	},
	{
		_id: "6a23d580550b2d22d9f3c0f2",
		type: "expense",
		category: "shopping",
		repeating: false,
		name: "New Monitor",
		amount: 3490,
		date: "2026-02-08",
		created: "2026-02-08",
	},
	{
		_id: "6a23d580550b2d22d9f3c0f3",
		type: "expense",
		category: "transport",
		repeating: true,
		name: "Public Transport",
		amount: 1020,
		date: "2026-02-01",
		created: "2025-03-24",
	},
	{
		_id: "6a25f10f3cd0ed6c35d84c94",
		type: "expense",
		category: "health",
		repeating: false,
		name: "Dental Checkup",
		amount: 1450,
		date: "2026-02-21",
		created: "2026-02-21",
	},
	{
		_id: "6a25f10f3cd0ed6c35d84c95",
		type: "expense",
		category: "entertainment",
		repeating: true,
		name: "Streaming Services",
		amount: 249,
		date: "2026-02-03",
		created: "2025-03-24",
	},
	{
		_id: "6a25f10f3cd0ed6c35d84c96",
		type: "expense",
		category: "insurance",
		repeating: true,
		name: "Home Insurance",
		amount: 890,
		date: "2026-02-07",
		created: "2025-03-24",
	},
	{
		_id: "6a25f10f3cd0ed6c35d84c97",
		type: "expense",
		category: "travel",
		repeating: false,
		name: "Weekend Trip",
		amount: 4200,
		date: "2026-02-17",
		created: "2026-02-17",
	},
];
