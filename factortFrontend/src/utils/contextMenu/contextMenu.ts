/**
 * @param e
 * @param contextMenuId -> This argument comes from a function that creates custom context menu id's
 * @sumarry Focuses on the context menu and changes it's position accordingly.
 */
export function toggleContextMenu(e: MouseEvent, contextMenuId: string) {
	e.preventDefault();

	const contextMenu = document.getElementById(contextMenuId)! as HTMLElement;
	const target = e.target as HTMLInputElement;

	let x = e.x;
	let y = e.y;
	let rect = contextMenu.getBoundingClientRect();

	x = target.width / 2;
	y = target.height / 2;

	contextMenu.style.left = `${x}px`;
	contextMenu.style.top = `${y}px`;

	contextMenu.focus();
}

export function blurContextMenu() {
	if (document.activeElement) (document.activeElement as HTMLElement).blur();
}
