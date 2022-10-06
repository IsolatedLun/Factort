import type { Complex_Data_Type } from 'src/types';

export type InputTypes = 'text' | 'email' | 'password' | 'file';
export type FileInputTypes = 'image' | 'video' | 'previewable' | 'file';

// Input types
type Input_Video_File = Complex_Data_Type<'video', string>;
type Input_Profile_File = Complex_Data_Type<'image', string>;

// This is used for any files that the user can upload
type Input_File = Complex_Data_Type<'file', null>;

// This is used for pdf, excel, docx files... but don't think we'll be supporting this for a while
type Input_Previewable_File = Complex_Data_Type<'previewable', { fileType: string }>;

export type Input_Complex_File_Types =
	| Input_Video_File
	| Input_Profile_File
	| Input_File
	| Input_Previewable_File;
