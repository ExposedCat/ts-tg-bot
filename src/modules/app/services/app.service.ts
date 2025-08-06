import { loadEnv, resolvePath, validateEnv } from "../../../utils/env.utils.js";
import { createBot } from "../../bot/config/bot.config.js";
import { connectToDb } from "../../database/config/connection.js";
import { initLocaleEngine } from "../../locale/config/locale.config.js";
import type { Database } from "../../database/types/database.js";

export async function startApp() {
	try {
		loadEnv("../../.env");
		validateEnv(["TOKEN", "DB_CONNECTION_STRING"]);
	} catch (error) {
		console.error("Error occurred while loading environment:", error);
		process.exit(1);
	}

	let database: Database;
	try {
		database = await connectToDb();
	} catch (error) {
		console.error("Error occurred while connecting to the database:", error);
		process.exit(2);
	}

	try {
		const localesPath = resolvePath(import.meta.url, "../../../locales");
		const i18n = initLocaleEngine(localesPath);
		const bot = createBot(database, i18n);

		await new Promise((resolve) =>
			bot.start({
				onStart: () => resolve(undefined),
			}),
		);
	} catch (error) {
		console.error("Error occurred while starting the bot:", error);
		process.exit(3);
	}
}
