import type { Collection } from "mongodb";

export type Chat = {
	chatId: number;
	title: string;
};

export type Database = {
	chat: Collection<Chat>;
};
