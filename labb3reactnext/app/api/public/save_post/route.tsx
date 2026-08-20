import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/mongodbnext";
import { ObjectId } from "mongodb";

interface transactionInterface {
	_id: ObjectId;
	id: number;
	type: string;
	name: string;
	recurring?: boolean;
	amount: string;
	date: string;
}

export async function POST(req: NextRequest) {
	const mongo = await getDB();

	if (mongo === 0) {
		return NextResponse.json(
			{
				ok: false,
				message: "Ingen mongo anslutning, du kan låtsas att det gick bra",
			},
			{ status: 200 },
		);
	}

	const body: transactionInterface = await req.json();

	await mongo.collection<transactionInterface>("cashflow").insertOne(body);
	return NextResponse.json({
		ok: true,
		message: "Transaktion tillagd tror jag",
	});
}
