const Progress = {
	progressBars: false,

	init(className) {
		let progressBars = document.getElementsByClassName(className);
		this.progressBars = progressBars;
		if (progressBars) {
			for (let index = 0; index < progressBars.length; index++) {
				this.add(progressBars[index]);
			}
			return progressBars;
		}
		return false;
	},

	add(progressBar) {
		window.addEventListener('scroll', () => this.update(progressBar));
		window.addEventListener('resize', () => this.update(progressBar));
		this.update(progressBar);
	},

	animate(progressBar, duration) {
		if (this.animating) return;
		this.animating = true;
		const max = progressBar.dataset.max;
		let current = progressBar.dataset.current;
		
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
			if (step == steps) {
				clearInterval(timer);
			}
		}, 20);

		if (step === steps) {
			clearInterval(timer);
			progressBar.classList.remove('ctx-progress--animating');
		}
	},

	update(progressBar) {
		let position = progressBar.getBoundingClientRect();

		let isLoaded = progressBar.classList.contains('ctx-progress--loaded');
		if (position.top >= 0 && position.bottom <= window.innerHeight) {
			if (!isLoaded) {
				progressBar.style.width = '{{percent}}%';
				progressBar.classList.add('ctx-progress--loaded');
				Progress.animate(progressBar, 3000);
			}
			return;
		}
		progressBar.classList.remove('ctx-progress--loaded');
	},
};

export default Progress;
