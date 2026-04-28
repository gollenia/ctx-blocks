export type DescriptionListAttributes = {
	dividers?: boolean;
	style?: {
		spacing?: {
			blockGap?: string;
		};
	};
};

export type DescriptionListProps = {
	attributes: DescriptionListAttributes;
	className?: string;
	setAttributes: (attributes: Partial<DescriptionListAttributes>) => void;
};
