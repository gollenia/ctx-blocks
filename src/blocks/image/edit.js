import {
	BlockIcon,
	MediaPlaceholder,
	RichText,
	useBlockProps,
	__experimentalUseBorderProps as useBorderProps,
} from '@wordpress/block-editor';
import icon from './icon';
import Inspector from './inspector';
import Toolbar from './toolbar';

import { useRef } from '@wordpress/element';

import { __ } from '@wordpress/i18n';

export default function Edit({ ...props }) {
	const {
		setAttributes,
		attributes: {
			imageUrl,
			imageId,
			imageSize,
			aspectRatio,
			width,
			round,
			flipX,
			flipY,
			caption,
			rotate,
		},
		className,
	} = props;

	const imageRef = useRef();
	const ALLOWED_MEDIA_TYPES = ['image'];
	const onSelectMedia = (media) => {
		if (!media || !media.url) {
			setAttributes({ imageUrl: undefined, imageId: undefined });
			return;
		}

		setAttributes({
			imageUrl: media.sizes[imageSize]?.source_url ?? media.url,
			imageId: media.id,
		});
	};

	const imageClasses = [className, round ? 'iscircle' : false]
		.filter(Boolean)
		.join(' ');

	const transformations = [
		rotate ? `rotate(${rotate}deg)` : undefined,
		flipX ? 'scaleX(-1)' : undefined,
		flipY ? 'scaleY(-1)' : undefined,
	]
		.filter(Boolean)
		.join(' ');

	const borderProps = useBorderProps(props.attributes);

	const blockProps = useBlockProps();

	const imageStyle = {
		aspectRatio: aspectRatio ? aspectRatio : undefined,
		objectFit: aspectRatio ? 'cover' : undefined,
		transform: transformations,
		width: width ? width + '%' : undefined,
		boxShadow: blockProps.style.boxShadow || undefined,
		...borderProps.style,
	};

	blockProps.style.boxShadow = undefined;

	return (
		<>
			<Toolbar {...props} onSelectMedia={onSelectMedia} />
			<Inspector {...props} imageRef={imageRef} />

			<figure {...blockProps}>
				{imageUrl ? (
					<div>
						<img
							className={imageClasses}
							ref={imageRef}
							src={imageUrl ?? ''}
							style={imageStyle}
						/>
						<RichText
							tagName="figcaption"
							value={caption}
							onChange={(caption) => setAttributes({ caption })}
							placeholder={__('Write caption…')}
							withoutInteractiveFormatting
						/>
					</div>
				) : (
					<MediaPlaceholder
						labels={{ title: 'Image' }}
						icon={<BlockIcon icon={icon} />}
						onSelect={onSelectMedia}
						allowedTypes={ALLOWED_MEDIA_TYPES}
						value={{ imageId, imageUrl }}
					/>
				)}
			</figure>
		</>
	);
}
