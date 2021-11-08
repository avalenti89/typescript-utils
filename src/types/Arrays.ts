export type DropFirst<T extends unknown[]> = T extends [any, ...(infer U)]
	? U
	: never;
export type DropLast<T extends unknown[]> = T extends [...(infer U), any]
	? U
	: never;
