import { NextResponse } from "next/server";

export default function GET() {
	const data = [
		{ id: 1, name: "Sparande1", summa: 12311 },
		{ id: 2, name: "Sparande2", summa: 1220 },
		{ id: 3, name: "Sparande3", summa: 1500 },
	];

	return NextResponse.json(
		{ data: data, message: "This message from savings route" },
		{ status: 200 },
	);
}
