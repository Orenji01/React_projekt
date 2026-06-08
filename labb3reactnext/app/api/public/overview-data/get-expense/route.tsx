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
		.collection<overViewObject>("cashflow")
		.find({ type: "expense" })
		.toArray();

	if (data.length === 0) {
		return NextResponse.json(
			{ ok: false, data: [], message: "No data found" },
			{ status: 404 },
		);
	}

	return NextResponse.json(
		{ ok: true, data: data, message: "This message from expense route" },
		{ status: 200 },
	);
}
