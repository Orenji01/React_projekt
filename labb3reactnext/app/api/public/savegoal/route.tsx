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

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      name,
      amount,
      perMonth,
      interest,
      inflation,
      targetDate,
      startDate,
    } = body;

    if (
      !name ||
      !amount ||
      !perMonth ||
      !interest ||
      !inflation ||
      !targetDate ||
      !startDate
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    const getDatabase = await getDB();

    /* const db = await getDatabase.db("budget"); */

    const result = await getDatabase.collection("savegoal").insertOne({
      name,
      amount,
      perMonth,
      interest,
      inflation,
      targetDate,
      startDate,
    });

    return NextResponse.json(
      {
        success: true,
        id: result.insertedId,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
