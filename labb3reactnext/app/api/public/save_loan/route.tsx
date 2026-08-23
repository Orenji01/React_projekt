import { NextResponse, NextRequest } from "next/server";
import { getDB } from "@/lib/mongodbnext";
import { ObjectId } from "mongodb";
import { loanItem } from "@/app/types/someTypes";

export async function POST(req: NextRequest) {
	const mongo = await getDB();

	if (mongo === 0) {
		return NextResponse.json(
			{
				ok: false,
				message: "No db connection. Men detta är ju endå bara test-grejer",
			},
			{ status: 500 },
		);
	}
	const body: loanItem = await req.json();

	const response = await mongo.collection<loanItem>("loans").insertOne(body);

	console.log(response);

	return NextResponse.json(
		{ ok: true, message: "det gick nog bra... kanske", data: response },
		{ status: 200 },
	);
}
