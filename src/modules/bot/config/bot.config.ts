import type { I18n } from "@grammyjs/i18n";
import { type MiddlewareObj, session, Bot as TelegramBot } from "grammy";

import { chatController } from "../../chat/controllers/chat.controller.ts";
import { upsertChat } from "../../chat/repositories/chat.repository.ts";
import type { Database } from "../../database/types/database.ts";
import type { Bot, CustomContext } from "../types/telegram.ts";
import { createReplyWithTextFunc } from "../utils/context.utils.ts";

function extendContext(bot: Bot, database: Database) {
	bot.use(async (ctx, next) => {
		if (!ctx.chat || !ctx.from) {
			return;
		}

		ctx.text = createReplyWithTextFunc(ctx);
		ctx.db = database;

		const chat = await upsertChat({
			db: database,
			chatId: ctx.chat.id,
			title:
				ctx.chat.type === "private"
					? (ctx.chat.title ?? "Group Chat")
					: `${ctx.from.first_name} Private Messages`,
		});

		ctx.dbEntities = { chat };

		await next();
	});
}

function setupPreControllers(_bot: Bot) {
	// e.g. inline-mode controllers
}

function setupMiddlewares(bot: Bot, i18n: I18n) {
	bot.use(session({ initial: () => ({}) }));
	bot.use(i18n as unknown as MiddlewareObj<CustomContext>);
}

function setupControllers(bot: Bot) {
	bot.use(chatController);
}

export function createBot(database: Database, i18n: I18n): Bot {
	const TOKEN = Deno.env.get("TOKEN");
	if (!TOKEN) {
		throw new Error("TOKEN environment variable is missing");
	}

	const bot = new TelegramBot<CustomContext>(TOKEN);

	setupPreControllers(bot);
	extendContext(bot, database);
	setupMiddlewares(bot, i18n);
	setupControllers(bot);

	return bot;
}
