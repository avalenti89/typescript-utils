export const prefixCss = (css: string, prefix: string) => {
	const classLen = prefix.length;
	let char, nextChar, isAt, isIn;

	// makes sure the className will not concatenate the selector
	prefix += ' ';

	// removes comments
	css = css.replace(/\/\*(?:(?!\*\/)[\s\S])*\*\/|[\r\n\t]+/g, '');

	// makes sure nextChar will not target a space
	css = css.replace(/}(\s*)@/g, '}@');
	css = css.replace(/}(\s*)}/g, '}}');

	for (let i = 0; i < css.length - 2; i++) {
		char = css[i];
		nextChar = css[i + 1];

		if (char === '@' && nextChar !== 'f') isAt = true;
		if (!isAt && char === '{') isIn = true;
		if (isIn && char === '}') isIn = false;

		if (
			!isIn &&
			nextChar !== '@' &&
			nextChar !== '}' &&
			(char === '}' || char === ',' || ((char === '{' || char === ';') && isAt))
		) {
			css = css.slice(0, i + 1) + prefix + css.slice(i + 1);
			i += classLen;
			isAt = false;
		}
	}

	// prefix the first select if it is not `@media` and if it is not yet prefixed
	if (css.indexOf(prefix) !== 0 && css.indexOf('@') !== 0) css = prefix + css;

	return css;
};
