import { NextResponse, NextRequest } from "next/server";
import { getDB } from "@/lib/mongodbnext";
import { ObjectId } from "mongodb";

interface loanInterface {
	_id: ObjectId;
	id: number;
	name: string;
	amount: string;
	repayAmount: string;
	interest: string;
	useInflation: boolean;
	useDeductions: boolean;
	targetDate: string;
	startDate: string;
}

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
	const body: loanInterface = await req.json();

	await mongo.collection<loanInterface>("loans").insertOne(body);

	return NextResponse.json(
		{ ok: true, message: "det gick nog bra... kanske" },
		{ status: 200 },
	);
}
