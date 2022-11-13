// ==============
// Global Variables
import type { PostTypes } from './components/Layouts/Post/types';
import type { KeyValue, TypedKeyValue } from './types';

// ==============
export const POINTS_ALIAS_NAME = 'reputation';
export const TEXTAREA_TAB_SIZE = 8;
export const BLACKLISTED_MARKDOWN_CHARACTERS = ['<', '>'];
export const BLACKLISTED_MARKDOWN_CHARACTER_MAPPINGS: any = {
	'<': '&lt;',
	'>': '&gt;'
};
export const SLIDESHOW_INTERVAL = 3000;
export const DRAWER_LEAVE_COUNTDOWN = 3500;
export const TOOLTIP_TIMEOUT = 1000;
export const CREATE_YOUTUBE_IFRAME = (link: string) =>
	`<iframe src="${link}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;

// if currEncloser == [
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

export const BIT_COUNTS = {
	1: 1, // bit
	2: 8, // byte
	3: 8e3, // kilobyte
	4: 8e6, // megabyte
	5: 8e9, // gigabyte
	6: 8e12 // terabyte
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
export const ICON_BARS = '\uf0c9';
export const ICON_ERROR = '\uf071';
export const ICON_SETTINGS = '\uf013';
export const ICON_PLUS = '\uf067';

export const ICON_EYE = '\uf06e';

export const ICON_TRASH = '\uf1f8';
export const ICON_BUCKET = '\ue4cf';

export const ICON_IMAGE = '\uf03e';
export const ICON_MEDIA = '\uf03d';
export const ICON_LINK = '\uf0c1';
export const ICON_MICROPHONE = '\uf130';
export const ICON_TEXT = '\uf893';
export const ICON_BROKEN_LINK = '\uf127';
export const ICON_COMMUNITY = '\uf0c0';

export const POST_TYPE_TO_ICON: TypedKeyValue<PostTypes, string> = {
	text: 'T',
	audio: ICON_MICROPHONE,
	video: ICON_MEDIA,
	images: ICON_IMAGE,
	link: ICON_LINK
};

// ==============
// Id's
// ==============
export const CONTEXT_MENU_ID = 'context-menu';
export const CREATE_CONTEXT_MENU_ID = (uuid: string) => CONTEXT_MENU_ID + '-' + uuid;

export const NAVBAR_CM_ID = CREATE_CONTEXT_MENU_ID('navbar');
export const CREATE_SELECT_FORM_ID = (name: string) => `select-${name.toLowerCase()}-form`;

export const NAVBAR_MODAL_ID = 'navbarMobileModal';

// =======================
// Urls
// =======================
export const BACKEND_ROOT_URL = 'http://localhost:8000';
export const API_URL = BACKEND_ROOT_URL + '/api';

export const POSTS_URL = API_URL + '/posts/';
export const POST_URL = (id: number) => POSTS_URL + id;
export const VOTE_POST_URL = (id: number) => POSTS_URL + 'vote/' + id;
export const CREATE_POST_URL = POSTS_URL + 'create';

export const COMMUNITIES_URL = API_URL + '/communities/';
export const COMMUNITY_URL = (id: number) => COMMUNITIES_URL + id;
export const CREATE_COMMUNITY_URL = COMMUNITIES_URL + 'create';
export const COMMUNITY_MISC_URL = COMMUNITIES_URL + 'misc';
export const COMMUNITY_MISC_ADMINS_URL = (id: number) => COMMUNITY_URL(id) + `/admins`;

export const USERS_URL = API_URL + '/users/';
export const USER_URL = (id: number) => USERS_URL + id;

export const AUTH_URL = USERS_URL + 'auth/';
export const REGISTER_URL = AUTH_URL + 'register';
export const LOGIN_URL = AUTH_URL + 'login';
export const AUTHENTICATE_URL = AUTH_URL + 'authenticate';

// =======================
// Navigation Urls
// =======================
export const WEB_SIGNUP_URL = '/auth/signup';
export const WEB_LOGIN_URL = '/auth/login';
export const WEB_LOGOUT_URL = '/auth/logout';

export const WEB_CREATE_POST_URL = '/create/post';
export const WEB_CREATE_COMMUNITY_POST_URL = '/create/community';
export const WEB_CREATE_POST_WITH_TYPE_URL = (id: number | null, type: string) =>
	'/create/post?type=' + type + '&communityId=' + id;

export const WEB_CREATE_COMMUNITY_URL = '/create/community';

export const WEB_POST_URL = (id: string | number, title: string) => `/posts/${id}/${title}`;
export const WEB_COMMUNITY_URL = (id: string | number, title: string) =>
	`/communities/${id}/${title}`;

export const WEB_USER_URL = (id: string | number, title: string) => `/users/${id}/${title}`;

// These urls are for the current logged in user
// my/settings, etc...
export const WEB_MY_SETTINGS_URL = `/my/settings`;
