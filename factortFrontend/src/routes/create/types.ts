export interface Form_CreatePost {
	title: string;

	content: string;
	images: File[];
	video: File | null;
	link: string;
}
