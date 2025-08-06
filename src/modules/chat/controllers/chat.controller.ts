import { Composer } from "grammy";

import type { CustomContext } from "../../bot/types/telegram.ts";

export const chatController = new Composer<CustomContext>();

chatController.command("health", async (ctx) => {
	await ctx.text("health");
});
