import type { FocalPoint } from './types';

export const IMAGE_BACKGROUND_TYPE = 'image';
export const VIDEO_BACKGROUND_TYPE = 'video';
export const COVER_MIN_HEIGHT = 50;
export const COVER_MAX_HEIGHT = 1000;
export const COVER_DEFAULT_HEIGHT = 300;
export const DEFAULT_FOCAL_POINT = { x: 0.5, y: 0.5 };
export const ALLOWED_MEDIA_TYPES = ['image', 'video'];

export function attributesFromMedia(
	setAttributes: (attributes: Record<string, unknown>) => void
) {
	return (media?: {
		url?: string;
		id?: number;
		alt?: string;
		type?: string;
		media_type?: string;
	}) => {
		if (!media?.url) {
			setAttributes({ url: undefined, id: undefined });
			return;
		}

		let mediaType: string | undefined;
		if (media.media_type) {
			mediaType =
				media.media_type === IMAGE_BACKGROUND_TYPE
					? IMAGE_BACKGROUND_TYPE
					: VIDEO_BACKGROUND_TYPE;
		} else {
			if (
				media.type !== IMAGE_BACKGROUND_TYPE &&
				media.type !== VIDEO_BACKGROUND_TYPE
			) {
				return;
			}
			mediaType = media.type;
		}

		setAttributes({
			imageUrl: media.url,
			id: media.id,
			alt: media.alt,
			backgroundType: mediaType,
			focalPoint: undefined,
			...(mediaType === VIDEO_BACKGROUND_TYPE
				? { hasParallax: undefined }
				: {}),
		});
	};
}

export function mediaPosition(
	{ x, y }: FocalPoint = DEFAULT_FOCAL_POINT
) {
	return `${Math.round(x * 100)}% ${Math.round(y * 100)}%`;
}
