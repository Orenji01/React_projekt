import { NextResponse } from "next/server";

export default function GET() {
	const data = [
		{ id: 1, name: "Lån1", amount: 110000 },
		{ id: 2, name: "Lån2", amount: 13000 },
		{ id: 3, name: "Lån3", amount: 1500 },
	];

	return NextResponse.json(
		{ data: data, message: "This message from loan route" },
		{ status: 200 },
	);
}
