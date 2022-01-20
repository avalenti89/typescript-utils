export class WithListener<T extends string, E = any> {
	listeners: Partial<Record<T, Array<(data?: E) => void>>> = {};
	on = (eventType: T, callback: (data: E) => void) => {
		this.listeners = {
			...this.listeners,
			[eventType]: [...(this.listeners[eventType] ?? []), callback],
		};
		return () => {
			this.listeners = {
				...this.listeners,
				[eventType]: this.listeners[eventType]?.filter(
					(listener) => listener !== callback
				),
			};
		};
	};
	notify = (eventType: E, data?: E) => {
		this.listeners[eventType]?.forEach((callback) => {
			callback(data);
		});
	};
}
