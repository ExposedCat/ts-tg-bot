import { resolvePath, validateEnv } from "../../../utils/env.utils.ts";
import { createBot } from "../../bot/config/bot.config.ts";
import { connectToDb } from "../../database/config/connection.ts";
import type { Database } from "../../database/types/database.ts";
import { initLocaleEngine } from "../../locale/config/locale.config.ts";

export async function startApp() {
	try {
		validateEnv(["TOKEN", "DB_CONNECTION_STRING"]);
	} catch (error) {
		console.error("Error occurred while loading environment:", error);
		Deno.exit(1);
	}

	let database: Database;
	try {
		database = await connectToDb();
	} catch (error) {
		console.error("Error occurred while connecting to the database:", error);
		Deno.exit(2);
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
		Deno.exit(3);
	}
}
