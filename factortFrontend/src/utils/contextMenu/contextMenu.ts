/**
 * @param e
 * @param contextMenuId -> This argument comes from a function that creates custom context menu id's
 * @sumarry Focuses on the context menu and changes it's position accordingly.
 */
export function toggleContextMenu(e: MouseEvent, contextMenuId: string) {
	e.preventDefault();

	const contextMenu = document.getElementById(contextMenuId)! as HTMLElement;

	let x = e.x;
	let y = e.y;
	let rect = contextMenu.getBoundingClientRect();

	if (x + rect.width > window.innerWidth) {
		x = x - rect.width - 5;
	} else if (y + rect.height + rect.width > window.innerHeight) {
		y = y - rect.height - 5;
	}

	contextMenu.focus();
	contextMenu.style.left = `${x}px`;
	contextMenu.style.top = `${y}px`;
}

export function blurContextMenu() {
	if (document.activeElement) (document.activeElement as HTMLElement).blur();
}
