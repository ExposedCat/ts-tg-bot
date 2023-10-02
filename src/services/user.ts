import type { Database, User } from '../types/database.js'

export function buildName(firstName: string, lastName?: string) {
	return lastName ? `${firstName} ${lastName}` : firstName
}

async function createPlayer(args: {
	db: Database
	userId: number
	name: string
}): Promise<User> {
	const playerObject = {
		userId: args.userId,
		name: args.name
	} as User

	await args.db.user.insertOne(playerObject)

	return playerObject
}

export async function getOrCreatePlayer(args: {
	db: Database
	userId: number
	name: string
}): Promise<User> {
	const user = await args.db.user.findOneAndUpdate(
		{ userId: args.userId },
		{ $set: { name: args.name } },
		{ returnDocument: 'after' }
	)

	if (user.ok && user.value) {
		return user.value
	}

	return createPlayer(args)
}
