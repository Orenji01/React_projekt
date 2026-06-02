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
	const mongo = await getDB();

	const data = await mongo
		.collection<overViewObject>("savings")
		.find()
		.toArray();

	if (data.length === 0) {
		return NextResponse.json(
			{ ok: false, data: [], message: "No data found" },
			{ status: 404 },
		);
	}

	// const data = [
	// 	{ id: 1, name: "Inkomst1", amount: 33000 },
	// 	{ id: 2, name: "Inkomst2", amount: 4032 },
	// 	{ id: 3, name: "Inkomst3", amount: 501 },
	// ];

	return NextResponse.json(
		{ ok: true, data: data, message: "This message from savings route" },
		{ status: 200 },
	);
}
