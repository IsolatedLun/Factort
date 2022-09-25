import type { KeyValue } from 'src/types';

export interface MKD_ParserOptions {
	mode: 'normal' | 'count' | 'neighbours' | 'complementary';
}

export interface MKD_TreeItem {
	syntax: string;
	parser: <T>(text: string, self: MKD_TreeItem) => MKD_ParsedData<T>;
	formatter: (self: MKD_TreeItem, parsedData: MKD_ParsedData<any>) => string;
	options: MKD_ParserOptions;
}

export interface MKD_TreeItemWithVariants {
	variants: KeyValue<MKD_TreeItem>;
}

export interface MKD_ParsedData<T> {
	result: T;
	data: { count: number; offset: number };
}
