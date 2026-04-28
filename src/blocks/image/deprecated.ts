const migrateImageObject = (
	attributes: Record<string, unknown> & {
		image?: { url?: string; id?: number };
	}
) => {
	attributes.imageUrl = attributes.image?.url ?? '';
	attributes.imageId = attributes.image?.id ?? 0;

	delete attributes.image;
	delete attributes.imageRound;
	delete attributes.imageWidth;
	delete attributes.imageBorder;
	delete attributes.isFirst;
	delete attributes.isLast;
	return attributes;
};

const deprecated = [
	{
		attributes: {
			hasLightbox: {
				type: 'boolean',
				default: false,
			},
			url: {
				type: 'string',
				default: '',
			},
			lightboxText: {
				type: 'string',
				default: '',
			},
			image: {
				type: 'object',
				default: null,
			},
			width: {
				type: 'integer',
				default: 100,
			},
			alignment: {
				type: 'string',
				default: 'left',
			},
			round: {
				type: 'boolean',
				default: false,
			},
			roundCorners: {
				type: 'boolean',
				default: true,
			},
			border: {
				type: 'boolean',
				default: false,
			},
			shadow: {
				type: 'boolean',
				default: false,
			},
			flip: {
				type: 'boolean',
				default: false,
			},
			caption: {
				type: 'string',
				default: '',
			},
		},
		migrate: migrateImageObject,
	},
];

export default deprecated;
