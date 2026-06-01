import { NextResponse } from "next/server";

export default function GET() {
	const data = [
		{ id: 1, name: "Utgift1", amount: 3000 },
		{ id: 2, name: "Utgift2", amount: 4000 },
		{ id: 3, name: "Utgift3", amount: 5000 },
	];

	return NextResponse.json(
		{ data: data, message: "This message from expenses Route" },
		{ status: 200 },
	);
}
