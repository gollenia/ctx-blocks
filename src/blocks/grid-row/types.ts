export type GridRowAttributes = {
	equalizer?: boolean;
	divider?: boolean;
	childrenWidthLarge?: number;
	childrenWidthMedium?: number;
	childrenWidthSmall?: number;
	style?: {
		spacing?: {
			blockGap?: string;
		};
	};
};

export type GridRowProps = {
	className?: string;
	clientId: string;
	attributes: GridRowAttributes;
	setAttributes: (attributes: Partial<GridRowAttributes>) => void;
	__unstableLayoutClassNames?: string;
};
