const observer = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.target.classList.contains('ctx-animate-children')) {
			const children = entry.target.querySelectorAll('li');

			children.forEach((child, index) => {
				if (entry.isIntersecting) {
					setTimeout(
						() => child.classList.add('ctx-animate-start'),
						index * 300
					);
					return;
				}
				child.classList.remove('ctx-animate-start');
			});
			return;
		}

		if (entry.isIntersecting) {
			entry.target.classList.add('ctx-animate-start');
			return;
		}
		entry.target.classList.remove('ctx-animate-start');
	});
});

const animatedElements = document.querySelectorAll(
	'.ctx-animate-on-scroll, .ctx-animate-children'
);
animatedElements.forEach((element) => {
	observer.observe(element);
});
