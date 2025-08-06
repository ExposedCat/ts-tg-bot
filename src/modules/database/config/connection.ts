import { MongoClient } from "mongodb";

import type { Chat, Database } from "../types/database.ts";

export async function connectToDb() {
	const DB_CONNECTION_STRING = Deno.env.get("DB_CONNECTION_STRING");
	if (!DB_CONNECTION_STRING) {
		throw new Error("DB_CONNECTION_STRING environment variable is missing");
	}

	const client = new MongoClient(DB_CONNECTION_STRING);
	await client.connect();

	const mongoDb = client.db();
	const chat = mongoDb.collection<Chat>("chat");
	const database: Database = { chat };

	return database;
}
