import { NextResponse } from "next/server";
import { getDB } from "@/lib/mongodbnext";
import { cashflowResponse } from "@/app/types/overViewTypes";

export async function GET() {
	const mongo = await getDB();

	if (mongo === 0) {
		return NextResponse.json(
			{ ok: false, message: "No instance of mongo running", data: [] },
			{ status: 500 },
		);
	}

	const data = await mongo
		.collection<cashflowResponse>("cashflow")
		.find()
		.toArray();

	if (data.length === 0) {
		return NextResponse.json(
			{ ok: false, message: "no data found", data: [] },
			{ status: 404 },
		);
	}

	return NextResponse.json(
		{ ok: true, message: "this message from get-cashflow", data: data },
		{ status: 200 },
	);
}
