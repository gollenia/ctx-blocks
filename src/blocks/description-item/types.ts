export type DescriptionItemAttributes = {
	icon?: string;
	url?: string;
	urlIcon?: string;
	imageUrl?: string;
	imageId?: number;
	focalPoint?: unknown;
	textAlign?: string;
	opensInNewTab?: boolean;
	rel?: string;
	iconColor?: { color?: string } | string;
	customIconColor?: string;
	iconBackgroundColor?: { color?: string } | string;
	customIconBackgroundColor?: string;
	backgroundColor?: string;
	textColor?: string;
};

export type DescriptionItemProps = {
	attributes: DescriptionItemAttributes;
	className?: string;
	clientId?: string;
	name?: string;
	setAttributes: (attributes: Partial<DescriptionItemAttributes>) => void;
	iconColor?: { color?: string; slug?: string };
	iconBackgroundColor?: { color?: string; slug?: string };
	setIconColor?: (color?: string) => void;
	setIconBackgroundColor?: (color?: string) => void;
};

export type MediaLike = {
	id?: number;
	url?: string;
	sizes?: {
		thumbnail?: { url?: string };
	};
};
