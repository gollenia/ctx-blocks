export type FocalPoint = {
	x: number;
	y: number;
};

export type ImageAttributes = {
	id?: number;
	alt?: string;
	backgroundType?: string;
	hasParallax?: boolean;
	url?: string;
	newTab?: boolean;
	rel?: string;
	imageUrl?: string;
	imageId?: number;
	imageSize?: string;
	width?: number;
	hoverZoom?: boolean;
	round?: boolean;
	flipX?: boolean;
	flipY?: boolean;
	rotate?: number;
	caption?: string;
	aspectRatio?: string;
	focalPoint?: FocalPoint;
	style?: {
		boxShadow?: string;
	};
};

export type ImageProps = {
	attributes: ImageAttributes;
	className?: string;
	setAttributes: (attributes: Partial<ImageAttributes>) => void;
};

export type MediaLike = {
	id?: number;
	url?: string;
	alt?: string;
	media_type?: string;
	type?: string;
	sizes?: Record<string, { source_url?: string; url?: string } | undefined>;
	media_details?: {
		sizes?: Record<
			string,
			{
				source_url?: string;
				width?: number;
				height?: number;
			}
		>;
	};
};
