import type { Custom, CustomContext } from "../types/telegram.ts";

export function createReplyWithTextFunc(ctx: CustomContext): Custom["text"] {
	return (resourceKey, templateData, extra = {}) => {
		extra.parse_mode = "HTML";
		extra.link_preview_options = {
			is_disabled: true,
		};
		const text = ctx.t(resourceKey, templateData);
		return ctx.reply(text, extra);
	};
}
