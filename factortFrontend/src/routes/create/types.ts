export interface Form_CreatePost {
	title: string;
	selected: string;

	content: string;
	images: File[];
	video: File | null;
	audio: File | null;
	link: string;

	community_id: number | null;
}

export interface Form_CreateCommunity {
	name: string;
	about: string;

	profile: File | null;
	banner: File | null;
}
