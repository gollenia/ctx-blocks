const Progress = {
	progressBars: [],

	init(className) {
		this.progressBars = Array.from(
			document.getElementsByClassName(className)
		);
		if (this.progressBars.length === 0) return false;

		window.addEventListener('scroll', () => this.updateAll());
		window.addEventListener('resize', () => this.updateAll());
		this.updateAll();

		return this.progressBars;
	},

	animate(progressBar, duration) {
		if (progressBar.dataset.animating === 'true') return;

		progressBar.dataset.animating = 'true';

		const max = Number(progressBar.dataset.max);
		const current = Number(progressBar.dataset.current);

		const percentValue =
			current > max ? 100 : Math.round((current * 100) / max);

		const barValue = percentValue > 100 ? 100 : percentValue;

		let steps = (duration / 1000) * 50;
		let step = 0;

		let currentValueLabel = progressBar.getElementsByClassName(
			'ctx-progress__number-injection'
		)[0];
		let indicator =
			progressBar.getElementsByClassName('ctx-progress__bar')[0];
		let percentLabel = progressBar.getElementsByClassName(
			'ctx-progress__percent'
		)[0];

		if (!currentValueLabel || !indicator || !percentLabel) return;

		let timer = setInterval(function () {
			step++;
			let factor = Math.sqrt(1 - Math.pow(step / steps - 1, 2));
			let countValue = new Intl.NumberFormat('de-DE', {
				style: 'decimal',
			}).format(Math.round(current * factor));
			currentValueLabel.innerHTML = countValue;
			indicator.style.width = `${barValue * factor}%`;
			percentLabel.innerHTML = `${Math.round(percentValue * factor)}%`;
			if (step === steps) {
				clearInterval(timer);
				progressBar.classList.remove('ctx-progress--animating');
				progressBar.dataset.animating = 'false';
			}
		}, 20);
	},

	updateAll() {
		this.progressBars.forEach((progressBar) => {
			this.update(progressBar);
		});
	},

	update(progressBar) {
		let position = progressBar.getBoundingClientRect();
		let isLoaded = progressBar.classList.contains('ctx-progress--loaded');

		if (position.top >= 0 && position.bottom <= window.innerHeight) {
			if (!isLoaded) {
				progressBar.classList.add('ctx-progress--loaded');
				this.animate(progressBar, 3000);
			}
		} else {
			progressBar.classList.remove('ctx-progress--loaded');
			progressBar.dataset.animating = 'false';
		}
	},
};

export default Progress;
