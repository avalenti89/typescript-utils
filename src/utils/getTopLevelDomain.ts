export const getTopLevelDomain = (url: string | URL) => {
	const _url = new URL(url);
	const [top, domain] = _url.hostname.split('.').slice(-2);
	return [top, domain].filter(Boolean).join('.');
};
