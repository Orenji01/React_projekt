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
					message: "No db! Using example data",
				},
				{ status: 200 },
			);
		}

		const data = await mongo
			.collection<overViewObject>("savings")
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
		_id: "6a1de9778b7c3b4ea370ce40",
		name: "Emergency Fund",
		amount: 25000,
	},
	{
		_id: "6a1de9778b7c3b4ea370ce41",
		name: "Vacation Fund",
		amount: 10000,
	},
	{
		_id: "6a1de9778b7c3b4ea370ce42",
		name: "Retirement Savings",
		amount: 75000,
	},
];
