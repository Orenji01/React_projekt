import { getDB } from "@/lib/mongodbnext";
import { NextResponse } from "next/server";

interface Savegoal {
	id: number;
	name: string;
	amount: number;
	perMonth: number;
	interest?: number;
	inflation?: number;
	targetDate: string;
	startDate: string;
}

export async function GET() {
	try {
		const getDatabase = await getDB();

		if (getDatabase === 0) {
			return NextResponse.json(
				{ ok: false, message: "No Db found" },
				{ status: 500 },
			);
		}

		const saveGoalInfo = await getDatabase
			.collection<Savegoal>("savegoal")
			.find()
			.toArray();
		return NextResponse.json(saveGoalInfo);
	} catch (error) {
		if (error instanceof Error) {
			return NextResponse.json({
				error: error.message,
			});
		}
	}
}
