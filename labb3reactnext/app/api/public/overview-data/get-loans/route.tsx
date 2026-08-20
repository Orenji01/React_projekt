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
					message: "No db connection, using sample data",
				},
				{ status: 200 },
			);
		}

		const data = await mongo
			.collection<overViewObject>("loans")
			.find()
			.toArray();

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
		_id: "6a1de9748b7c3b4ea370ce3c",
		name: "Student Loan",
		amount: 120000,
	},
	{
		_id: "6a1de9748b7c3b4ea370ce3d",
		name: "Car Loan",
		amount: 85000,
	},
	{
		_id: "6a1de9748b7c3b4ea370ce3e",
		name: "Personal Loan",
		amount: 15000,
	},
];
