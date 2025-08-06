import type { I18nFlavor, TranslationVariables } from "@grammyjs/i18n";
import type {
	Api,
	Context,
	NextFunction,
	SessionFlavor,
	Bot as TelegramBot,
} from "grammy";
import type { Message } from "grammy_types";
import type { Chat, Database } from "../../database/types/database.ts";

type Extra = Parameters<Api["sendMessage"]>[2];

export type Custom = {
	text: (
		text: string,
		templateData?: TranslationVariables,
		extra?: Extra,
	) => Promise<Message.TextMessage>;

	dbEntities: {
		chat: Chat;
	};

	db: Database;
};

export type CustomContext = Context & Custom & I18nFlavor & SessionFlavor<{}>;

export type Bot = TelegramBot<CustomContext>;

export type Handler = (ctx: CustomContext, next?: NextFunction) => void;
