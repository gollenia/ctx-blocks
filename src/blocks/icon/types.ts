export type IconBlockAttributes = {
	icon?: string;
	size?: number;
	url?: string;
	newTab?: boolean;
	rel?: string;
	style?: {
		color?: {
			text?: string;
		};
		spacing?: {
			padding?: {
				top?: string;
				right?: string;
				bottom?: string;
				left?: string;
			};
			margin?: {
				top?: string;
				right?: string;
				bottom?: string;
				left?: string;
			};
		};
	};
};

export type IconBlockProps = {
	attributes: IconBlockAttributes;
	className?: string;
	setAttributes: (attributes: Partial<IconBlockAttributes>) => void;
};
