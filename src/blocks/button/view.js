const Modal = () => {
	window.addEventListener('DOMContentLoaded', () => {
		let modalLinks = document.querySelectorAll('button[data-modal]');

		if (!modalLinks) return;

		for (const modalLink of modalLinks) {
			modalLink.addEventListener('click', (event) => {
				const modalWindow = document.getElementById(
					modalLink.dataset.modal
				);
				modalWindow.classList.add('modal--open');
				modalWindow.addEventListener('click', (ev) => {
					if (
						ev.target !== ev.currentTarget &&
						!ev.target.classList.contains('modal__close')
					)
						return;
					const modalWindow = document.getElementById(
						modalLink.dataset.modal
					);
					modalWindow.classList.remove('modal--open');
				});
			});
		}
	});
};

export default Modal;
