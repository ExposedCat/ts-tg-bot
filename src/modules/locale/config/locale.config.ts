import { I18n } from "@grammyjs/i18n";

export const initLocaleEngine = (path: string, defaultLanguage = "en") =>
	new I18n({
		directory: path,
		defaultLanguage,
		defaultLanguageOnMissing: true,
		useSession: true,
	});
