// ==============
// Global Variables
// ==============
export const POINTS_ALIAS_NAME = 'reputation';
export const TEXTAREA_TAB_SIZE = 8;
export const BLACKLISTED_MARKDOWN_CHARACTERS = ['<', '>'];
export const BLACKLISTED_MARKDOWN_CHARACTER_MAPPINGS: any = {
	'<': '&lt;',
	'>': '&gt;'
};
export let SLIDESHOW_INTERVAL = 2500;

// ==============
// Icons
// ==============
export const ICON_CARET_LEFT = '\uf0d9';
export const ICON_CARET_RIGHT = '\uf0da';
export const ICON_UPVOTE = '\uf062';
export const ICON_DOWNVOTE = '\uf063';

export const ICON_SEARCH = '\uf002';
export const ICON_TIMES = '\uf00d';
export const ICON_CHECK = '\uf00c';
export const ICON_COMMENTS = '\uf086';

// ==============
// Id's
// ==============
export const CONTEXT_MENU_ID = 'context-menu';
export const CREATE_CONTEXT_MENU_ID = (uuid: string) => CONTEXT_MENU_ID + '-' + uuid;

export const NAVBAR_CM_ID = CREATE_CONTEXT_MENU_ID('navbar');
