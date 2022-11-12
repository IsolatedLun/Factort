export interface Form_CreatePost {
	title: string;
	selected: string;

	content: string;
	images: File[];
	video: File | null;
	audio: File | null;
	link: string;
}

export interface Form_CreateCommunity {
	name: string;
	about: string;

	profile: File;
	banner: File;
}
