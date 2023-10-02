import type { Database, User } from '../types/database.js'

export function buildName(firstName: string, lastName?: string) {
	return lastName ? `${firstName} ${lastName}` : firstName
}

interface CreateUserArgs {
	db: Database
	userId: number
	name: string
}

// NOTE(DP): always use the same terminology: user for all users, not player
async function createUser({userId, db, name}: CreateUserArgs): Promise<User> {
	const newUser = {
		userId,
		name
	} as User

	await db.user.insertOne(newUser)

	return newUser
}

export async function getOrCreatePlayer(createUserArgs: CreateUserArgs): Promise<User> {
	const {userId, db, name} = createUserArgs;
	const user = await db.user.findOneAndUpdate(
		{ userId },
		{ $set: { name } },
		{ returnDocument: 'after' }
	)

	if (user.ok && user.value) {
		return user.value
	}

	return createUser(createUserArgs)
}
