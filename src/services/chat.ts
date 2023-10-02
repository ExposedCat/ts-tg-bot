import type { Chat, Database } from '../types/database.js'

// NOTE(DP): dead code?
export function buildName(firstName: string, lastName?: string) {
	return lastName ? `${firstName} ${lastName}` : firstName
}

interface CreateChatArgs {
	db: Database
	chatId: number
	title: string
}

async function createChat({chatId, db, title}: CreateChatArgs): Promise<Chat> {
	const newChat = {
		chatId,
		title
	} as Chat

	await db.chat.insertOne(newChat)

	return newChat
}

export async function getOrCreateChat(createChatArgs: CreateChatArgs): Promise<Chat> {
	const {chatId, db, title} = createChatArgs;
	const chat = await db.chat.findOneAndUpdate(
		{ chatId },
		{ $set: { title } },
		{ returnDocument: 'after' }
	)

	if (chat.ok && chat.value) {
		return chat.value
	}

	return createChat(createChatArgs)
}
