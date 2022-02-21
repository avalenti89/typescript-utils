export const promiseTimeout = (time: number) => {
	let timer: any = undefined;
	const waitPromise = new Promise<void>((resolve) => {
		timer = setTimeout(() => {
			resolve(timer);
			timer = undefined;
		}, time);
	});
	const cancel = () =>
		new Promise((resolve, reject) => {
			if (typeof timer !== 'undefined') {
				clearTimeout(timer);
				timer = undefined;
				resolve(timer);
			} else {
				reject();
			}
		});

	return {
		then: (...args: Parameters<typeof waitPromise.then>) =>
			waitPromise.then(...args),
		cancel,
	};
};
