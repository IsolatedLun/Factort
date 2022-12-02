export function openModal(id: string) {
	const modal = document.getElementById(id) as HTMLDialogElement;
	console.log(modal);
	modal.showModal();
}

export function closeModal(id: string) {
	const modal = document.getElementById(id) as HTMLDialogElement;
	modal.close();
}
