import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGO_URI || "mongodb://localhost:27017";
const dbName = process.env.DB_NAME || "budget";

let db: Db;
let client: MongoClient;

export async function getDB(): Promise<Db | 0> {
	try {
		if (db) return db;

		client = new MongoClient(uri);
		await client.connect();

		db = client.db(dbName);

		if (!db) {
			return 0;
		}

		return db;
	} catch (e) {
		// console.log(e);
		return 0;
	}
}
