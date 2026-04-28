export type GridColumnAttributes = {
	widthLarge?: number;
	widthMedium?: number;
	widthSmall?: number;
	mobilePosition?: string;
};

export type GridColumnProps = {
	className?: string;
	attributes: GridColumnAttributes;
	setAttributes: (attributes: Partial<GridColumnAttributes>) => void;
};
