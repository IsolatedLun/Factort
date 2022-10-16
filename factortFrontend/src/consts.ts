// ==============
// Global Variables

import type { KeyValue } from './types';

// ==============
export const POINTS_ALIAS_NAME = 'reputation';
export const TEXTAREA_TAB_SIZE = 8;
export const BLACKLISTED_MARKDOWN_CHARACTERS = ['<', '>'];
export const BLACKLISTED_MARKDOWN_CHARACTER_MAPPINGS: any = {
	'<': '&lt;',
	'>': '&gt;'
};
export const SLIDESHOW_INTERVAL = 300;
export const DRAWER_LEAVE_COUNTDOWN = 3500;
export const CREATE_YOUTUBE_IFRAME = (link: string) =>
	`<iframe src="${link}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;

// currEncloser = [
// x([) => ]
// y(]) => [
export const COMPLEMENTARIES: KeyValue<string> = {
	'[': ']',
	'(': ')',
	'{': '}'
};

export const REVERSE_COMPLEMENTARIES: KeyValue<string> = {
	']': '[',
	')': '(',
	'}': '{'
};

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

export const ICON_EYE = '\uf06e';

export const ICON_TRASH = '\uf1f8';
export const ICON_BUCKET = '\ue4cf';

export const ICON_MEDIA = '\uf03d';
export const ICON_LINK = '\uf0c1';
export const ICON_PLUS = '\uf067';

// ==============
// Id's
// ==============
export const CONTEXT_MENU_ID = 'context-menu';
export const CREATE_CONTEXT_MENU_ID = (uuid: string) => CONTEXT_MENU_ID + '-' + uuid;

export const NAVBAR_CM_ID = CREATE_CONTEXT_MENU_ID('navbar');

// =======================
// Urls
// =======================
export const BACKEND_ROOT_URL = 'http://localhost:8000';
export const API_URL = BACKEND_ROOT_URL + '/api';

export const POSTS_URL = API_URL + '/posts/';
export const POST_URL = (id: number) => POSTS_URL + id;

export const COMMUNITIES_URL = API_URL + '/communities/';
export const COMMUNITY_URL = (id: number) => COMMUNITIES_URL + id;

export const AUTH_URL = API_URL + '/auth/';
export const REGISTER_URL = AUTH_URL + 'register';
export const LOGIN_URL = AUTH_URL + 'login';

// =======================
// Navigation Urls
// =======================
export const WEB_SIGNUP_URL = '/auth/signup';
export const WEB_LOGIN_URL = '/auth/login';

export const WEB_CREATE_POST_URL = '/create/post';
export const WEB_CREATE_POST_WITH_TYPE_URL = (type: string) => '/create/post?type=' + type;

export const WEB_POST_URL = (id: number, title: string) => `/posts/${id}/${title}`;
