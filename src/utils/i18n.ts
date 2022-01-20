export type ILocalizationMessages<
	T extends Record<string, string> = Record<string, string>
> = Record<string, T> & { custom?: T };

export const sanitizeLocale = (locale: string) =>
	locale.toLowerCase().replace('_', '-');

/**
 * Used to join multiple dictionary. In case of same key for a locale in different dictionaries, it will takes the last found
 * @param dictionaries "{[locale]:{key:value}}" a list of intl dictionaries to joins
 * @returns "{[locale]:{key:value}}" an intl dictionary
 */
export const joinIntlMessages = (
	...dictionaries: Array<Record<string, Record<string, string>>>
) => {
	return dictionaries.reduce((prev, dict) => {
		let newDict = prev;
		Object.entries(dict).forEach(([locale, messages]) => {
			newDict = {
				...newDict,
				[locale]: { ...(newDict[locale] ?? {}), ...messages },
			};
		});
		return newDict;
	}, {});
};

/**
 * Used to get the most appropriate locale dictionary with priority to custom.
 *
 * example: custom->locale(en-us)->language(en)
 * @param messages "{[locale]:{key:value}}" an intl dictionary
 * @param locale string
 * @returns "{[locale]:{key:value}}" an intl dictionary
 */
export const getIntlMessages = (
	messages: ILocalizationMessages,
	locale: string
) => {
	const _locale = sanitizeLocale(locale);
	const language = _locale.split('-')[0];
	const newMessages = {
		...(messages[language] ?? {}),
		...(messages[_locale] ?? {}),
		...(messages.custom ?? {}),
	};
	return newMessages;
};
