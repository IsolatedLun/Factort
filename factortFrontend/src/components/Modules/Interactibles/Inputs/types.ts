import type { Complex_Data_Type } from '../../../../types';

export type InputTypes = 'text' | 'email' | 'password' | 'file';

export type FileInputTypes = 'image' | 'audio' | 'video' | 'previewable' | 'file';
export type FileInputStylings = 'default' | 'square-image';

interface _Props_File<UrlType> {
	size: number;
	name: string;
	type: string;

	url: UrlType;
}

// File types
type Props_MediaFile = _Props_File<string>;
type Props_File = _Props_File<null>;

// Input types
export type Input_Video_File = Complex_Data_Type<'video', Props_MediaFile>;
export type Input_Image_File = Complex_Data_Type<'image', Props_MediaFile>;
export type Input_Audio_File = Complex_Data_Type<'audio', Props_MediaFile>;

// This is used for any files that the user can upload
type Input_File = Complex_Data_Type<'file', Props_File>;

// This is used for pdf, excel, docx files... but don't think we'll be supporting this for a while
type Input_Previewable_File = Complex_Data_Type<'previewable', Props_File>;

export type Input_Complex_File_Types =
	| Input_Video_File
	| Input_Image_File
	| Input_File
	| Input_Audio_File
	| Input_Previewable_File;
