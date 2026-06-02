import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGO_URI || "mongodb://localhost:27017";
const dbName = process.env.DB_NAME || "budget";

let db: Db;
let client: MongoClient;

export async function getDB(): Promise<Db> {
	if (db) return db;

	client = new MongoClient(uri);
	await client.connect();

	db = client.db(dbName);

	return db;
}
