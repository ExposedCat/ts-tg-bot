import type { Chat, Database } from "../../database/types/database.js";

type UpsertChatParams = {
	db: Database;
	chatId: number;
	title: string;
};

export async function upsertChat({
	db,
	chatId,
	title,
}: UpsertChatParams): Promise<Chat> {
	const chat = await db.chat.findOneAndUpdate(
		{ chatId },
		{ $set: { title } },
		{ returnDocument: "after", upsert: true },
	);

	if (!chat.ok || !chat.value) {
		throw new Error("Failed to upsert chat");
	}

	return chat.value;
}
