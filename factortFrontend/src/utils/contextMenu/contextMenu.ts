/**
 * @param e
 * @param contextMenuId -> This argument comes from a function that creates custom context menu id's
 * @sumarry Focuses on the context menu and changes it's position accordingly.
 */
export function toggleContextMenu(e: MouseEvent, contextMenuId: string) {
	e.preventDefault();

	const contextMenu = document.getElementById(contextMenuId)! as HTMLElement;
	const target =
		(e.target as HTMLElement).closest('[data-tooltip-parent]') ?? (e.target as HTMLElement);
	const padding = 80;

	console.log(target);

	let x = target.clientWidth / 2;
	let y = target.clientHeight / 2;
	let rect = contextMenu.getBoundingClientRect();

	// Horizontal
	if (x + rect.width > target.clientWidth) x = target.clientWidth - rect.width;
	else if (x - rect.width < 0) x = rect.width;

	contextMenu.style.left = `${x}px`;
	contextMenu.style.top = `${y}px`;

	contextMenu.focus();
}

export function blurContextMenu() {
	if (document.activeElement) (document.activeElement as HTMLElement).blur();
}

export function reboundTooltip(tooltipEl: HTMLElement) {
	const tooltipRect = tooltipEl.getBoundingClientRect();

	if (tooltipRect.x < 0) {
		tooltipEl.style.left = `${tooltipRect.width / 2}px`;
	}
}
