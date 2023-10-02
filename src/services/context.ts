import type { CustomContext, CustomContextMethods } from '../types/context.js'

// NOTE(DP): personally I do not get why createReplyWithTextFunc() in context.ts file
//           probably it needs to be moved (or renamed)
export function createReplyWithTextFunc(
	ctx: CustomContext
): CustomContextMethods['text'] {
	return (resourceKey, templateData, extra = {}) => {
		extra.parse_mode = 'HTML'
		extra.disable_web_page_preview = true
		const text = ctx.i18n.t(resourceKey, templateData)
		return ctx.reply(text, extra)
	}
}
