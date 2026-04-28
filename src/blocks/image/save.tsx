import {
	__experimentalGetBorderClassesAndStyles as getBorderClassesAndStyles,
	useBlockProps,
} from '@wordpress/block-editor';
import { mediaPosition } from './common';
import type { ImageProps } from './types';

const Save = (props: ImageProps) => {
	const {
		attributes: {
			url,
			newTab,
			rel,
			imageUrl,
			imageId,
			focalPoint,
			imageSize,
			width,
			aspectRatio,
			flipX,
			flipY,
			rotate,
			shadow,
			hoverZoom,
		},
	} = props;

	const transformations = [
		rotate ? `rotate(${rotate}deg)` : undefined,
		flipX ? 'scaleX(-1)' : undefined,
		flipY ? 'scaleY(-1)' : undefined,
	]
		.filter(Boolean)
		.join(' ');

	const imageClasses = [
		shadow ? 'has-shadow' : false,
		hoverZoom ? 'hover-zoom' : false,
	]
		.filter(Boolean)
		.join(' ');

	const blockProps = useBlockProps.save({ className: imageClasses });
	const borderProps = getBorderClassesAndStyles(props.attributes);

	const imageStyle = {
		width: width ? width + '%' : undefined,
		aspectRatio: aspectRatio ? aspectRatio : undefined,
		objectFit: aspectRatio ? 'cover' : undefined,
		transform: transformations,
		objectPosition:
			focalPoint && imageUrl ? mediaPosition(focalPoint) : undefined,
		...borderProps.style,
	};

	const ImageTag = url ? 'a' : 'div';

	return (
		<ImageTag
			{...blockProps}
			href={url ? url : undefined}
			target={newTab ? '_blank' : undefined}
			rel="noopener"
		>
			<img src={imageUrl} alt="" style={imageStyle} />
		</ImageTag>
	);
};

export default Save;
