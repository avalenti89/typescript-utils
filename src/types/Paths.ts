type Prev = [
	never,
	0,
	1,
	2,
	3,
	4,
	5,
	6,
	7,
	8,
	9,
	10,
	...0[]
];

type Join<K, P> = K extends string | number
	? P extends string | number
		? `${K}${'' extends P ? '' : '.'}${P}`
		: never
	: never;

/**
 * Default depth to 3. Don't exceed with depth with recursive interfaces/types
 */
export type Paths<T, D extends number = 3> = [D] extends [never]
	? never
	: T extends object
	? {
			[K in keyof T]-?: K extends string | number
				? `${K}` | Join<K, Paths<T[K], Prev[D]>>
				: never;
	  }[keyof T]
	: '';


/**
 * Default depth to 3. Don't exceed with depth with recursive interfaces/types
 */
export type Leaves<T, D extends number = 3> = [D] extends [never]
	? never
	: T extends object
	? { [K in keyof T]-?: Join<K, Leaves<T[K], Prev[D]>> }[keyof T]
	: '';
