export type FocalPoint = {
	x: number;
	y: number;
};

export type CardAttributes = {
	hover?: boolean;
	imageUrl?: string;
	imageId?: number;
	shadow?: boolean;
	url?: string;
	badgeText?: string;
	labelText?: string;
	layout?: {
		orientation?: string;
	};
	fullHeight?: boolean;
	customAccentColor?: string;
	customHoverColor?: string;
	style?: {
		spacing?: {
			blockGap?: string;
		};
	};
	focalPoint?: FocalPoint;
	openInNewTab?: boolean;
	accentColor?: string;
};

export type CardColor = {
	color?: string;
	slug?: string;
};

export type CardProps = {
	attributes: CardAttributes;
	className?: string;
	clientId?: string;
	setAttributes: (attributes: Partial<CardAttributes>) => void;
	accentColor?: CardColor;
	hoverColor?: CardColor;
	setAccentColor?: (color?: string) => void;
	setHoverColor?: (color?: string) => void;
	imageRef?: { current: HTMLImageElement | null };
};

export type MediaLike = {
	id?: number;
	url?: string;
	sizes?: {
		large?: { url?: string };
	};
};
