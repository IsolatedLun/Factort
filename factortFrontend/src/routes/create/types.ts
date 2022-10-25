export interface Form_CreatePost {
	title: string;
	selected: string;

	content: string;
	images: File[];
	video: File | null;
	link: string;
}
