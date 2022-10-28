/**
 * @param e
 * @param contextMenuId -> This argument comes from a function that creates custom context menu id's
 * @sumarry Focuses on the context menu and changes it's position accordingly.
 */
export function toggleContextMenu(e: MouseEvent, contextMenuId: string) {
	e.preventDefault();

	const contextMenu = document.getElementById(contextMenuId)! as HTMLElement;
	const target = e.target as HTMLElement;
	const padding = 80;

	let x = e.offsetX;
	let y = e.offsetY;
	let rect = contextMenu.getBoundingClientRect();

	// right boundary
	if (x + rect.width > target.clientWidth) {
		x = target.clientWidth - rect.width;
	}

	// left boundary
	else if (x < padding) {
		x = x + rect.width / 2;
	}

	// top boundary
	else if (y + rect.height > target.clientHeight) {
		y = y + rect.height / 2;
	}

	contextMenu.style.left = `${x}px`;
	contextMenu.style.top = `${y}px`;

	contextMenu.focus();
}

export function blurContextMenu() {
	if (document.activeElement) (document.activeElement as HTMLElement).blur();
}
