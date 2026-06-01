import { NextResponse } from "next/server";

export default function GET() {
	const data = [
		{ id: 1, name: "Inkomst1", amount: 33000 },
		{ id: 2, name: "Inkomst2", amount: 4032 },
		{ id: 3, name: "Inkomst3", amount: 501 },
	];

	return NextResponse.json(
		{ data: data, message: "This message from income route" },
		{ status: 200 },
	);
}
