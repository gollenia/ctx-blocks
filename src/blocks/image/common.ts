import type { FocalPoint, ImageAttributes, MediaLike } from './types';

export const IMAGE_BACKGROUND_TYPE = 'image';
export const VIDEO_BACKGROUND_TYPE = 'video';
export const COVER_MIN_HEIGHT = 50;
export const COVER_MAX_HEIGHT = 1000;
export const COVER_DEFAULT_HEIGHT = 300;
export const DEFAULT_FOCAL_POINT = { x: 0.5, y: 0.5 };
export const ALLOWED_MEDIA_TYPES = ['image', 'video'];

export function attributesFromMedia(
	setAttributes: (attributes: Partial<ImageAttributes>) => void
) {
	return (media?: MediaLike) => {
		if (!media || !media.url) {
			setAttributes({ url: undefined, id: undefined });
			return;
		}

		let mediaType;
		// For media selections originated from a file upload.
		if (media.media_type) {
			if (media.media_type === IMAGE_BACKGROUND_TYPE) {
				mediaType = IMAGE_BACKGROUND_TYPE;
			} else {
				// only images and videos are accepted so if the media_type is not an image we can assume it is a video.
				// Videos contain the media type of 'file' in the object returned from the rest api.
				mediaType = VIDEO_BACKGROUND_TYPE;
			}
		} else {
			// For media selections originated from existing files in the media library.
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
			alt: media?.alt,
			backgroundType: mediaType,
			focalPoint: undefined,
			...(mediaType === VIDEO_BACKGROUND_TYPE
				? { hasParallax: undefined }
				: {}),
		});
	};
}

export function mediaPosition({ x, y }: FocalPoint = DEFAULT_FOCAL_POINT) {
	return `${Math.round(x * 100)}% ${Math.round(y * 100)}%`;
}
