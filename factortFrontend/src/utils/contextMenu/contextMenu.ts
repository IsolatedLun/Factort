import { CONTEXT_MENU_ID } from '../../consts';

/**
 * @param e
 * @param contextMenuId -> This argument comes from a function that creates custom context menu id's
 * @sumarry Focuses on the context menu and changes it's position accordingly.
 */
export function toggleContextMenu(e: MouseEvent, contextMenuId: string) {
	const contextMenu = document.getElementById(contextMenuId)! as HTMLElement;

	contextMenu.focus();
	contextMenu.style.left = `${e.x}px`;
	contextMenu.style.top = `${e.y}px`;
}
