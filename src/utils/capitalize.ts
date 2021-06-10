export const capitalize = (value: string) => {
	const firstLetter = value.charAt(0).toLocaleUpperCase();
	return `${firstLetter}${value.slice(1)}`;
};
