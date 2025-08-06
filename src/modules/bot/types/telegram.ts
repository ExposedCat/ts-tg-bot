import type { I18nContextFlavor, TemplateData } from "@grammyjs/i18n";
import type {
	Api,
	Context,
	NextFunction,
	SessionFlavor,
	Bot as TelegramBot,
} from "grammy";

import type { Chat, Database } from "../../database/types/database.js";

export type Extra = Parameters<Api["sendMessage"]>[2];

export interface Custom<C extends Context> {
	text: (
		text: string,
		templateData?: TemplateData,
		extra?: Extra,
	) => ReturnType<C["reply"]>;

	dbEntities: {
		chat: Chat;
	};

	db: Database;
}

export type CustomContextMethods = Custom<Context>;

export type CustomContext = Context &
	Custom<Context> &
	I18nContextFlavor &
	// biome-ignore lint/complexity/noBannedTypes: empty
	SessionFlavor<{}>;

export type Bot = TelegramBot<CustomContext>;

export type Handler = (ctx: CustomContext, next?: NextFunction) => void;
