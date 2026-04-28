export type SvgColor = {
	color?: string;
	slug?: string;
};

export type SvgAttributes = {
	url?: string;
	id?: number;
	width?: number;
	height?: number;
	syncHeight?: boolean;
	strokeWidth?: number;
	imageAlignment?: string;
	sizeInPercent?: boolean;
	linkNewTab?: boolean;
	linkUrl?: string;
	align?: string;
};

export type SvgProps = {
	attributes: SvgAttributes;
	setAttributes: (attributes: Partial<SvgAttributes>) => void;
	toggleSelection?: (isEnabled: boolean) => void;
	strokeColor?: SvgColor;
	fillColor?: SvgColor;
	setStrokeColor?: (color?: string) => void;
	setFillColor?: (color?: string) => void;
};

export type MediaLike = {
	id?: number;
	url?: string;
	sizes?: {
		large?: {
			url?: string;
		};
	};
};
