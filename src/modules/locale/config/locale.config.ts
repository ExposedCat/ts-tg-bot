import { I18n } from "@grammyjs/i18n";

export const initLocaleEngine = (path: string, defaultLocale = "en") =>
	new I18n({
		directory: path,
		defaultLocale,
		useSession: true,
	});
