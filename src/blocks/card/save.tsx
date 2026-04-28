import {
	getColorClassName,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import { colord } from 'colord';

import { mediaPosition } from './common';
import type { CardProps } from './types';

const CardSave = (props: CardProps) => {
	const { attributes } = props;
	const {
		labelText,
		badgeText,
		hover,
		imageId,
		imageUrl,
		shadow,
		url,
		openInNewTab,
		accentColor,
		customAccentColor = '',
		customHoverColor,
		layout,
		fullHeight,
		focalPoint,
	} = attributes;

	const classes = [
		'ctx__card',
		layout?.orientation === 'horizontal'
			? 'ctx__card-horizontal'
			: 'ctx__card-vertical',
		url || hover ? 'ctx__card-hover' : false,
		shadow ? 'ctx__card-shadow' : false,
		imageId ? '' : 'ctx__card-no-image',
		customHoverColor ? 'ctx__card-hover-custom' : false,
	]
		.filter(Boolean)
		.join(' ');

	const blockProps = useBlockProps.save({ className: classes });

	const contentStyle = {
		paddingTop: blockProps.style?.paddingTop ?? '1rem',
		paddingBottom: blockProps.style?.paddingBottom ?? '1rem',
		paddingLeft: blockProps.style?.paddingLeft ?? '1rem',
		paddingRight: blockProps.style?.paddingRight ?? '1rem',
	};

	const accentStyle = {
		background: customAccentColor,
		color: colord(customAccentColor).isDark() ? '#ffffff' : '#000000',
	};

	const accentClass = getColorClassName('background-color', accentColor);
	const blockGap = attributes.style?.spacing?.blockGap;

	const cardStyle = {
		...blockProps.style,
		height: fullHeight ? '100%' : undefined,
		padding: '0 !important',
		'--hover-color': customHoverColor || undefined,
		gap: blockGap
			? blockGap.replaceAll('|', '--').replace(':', '(--wp--') + ')'
			: undefined,
	};

	const objectPosition =
		focalPoint && imageUrl ? mediaPosition(focalPoint) : undefined;

	const innerBlockProps = useInnerBlocksProps.save({
		className: 'ctx__card-content',
		style: contentStyle,
	});

	const Tag = url ? 'a' : 'div';

	return (
		<Tag
			{...blockProps}
			style={cardStyle}
			href={url || undefined}
			target={openInNewTab ? '_blank' : undefined}
		>
			<div className="ctx__card-header">
				{!!badgeText && (
					<b
						className={`ctx__card-badge ${accentClass ?? ''}`}
						style={accentStyle}
					>
						{badgeText}
					</b>
				)}
				{imageUrl && (
					<img style={{ objectPosition }} src={imageUrl} />
				)}
				{!!labelText && (
					<label
						className={`ctx__card-label ${accentClass ?? ''}`}
						style={accentStyle}
					>
						{labelText}
					</label>
				)}
			</div>
			<div {...innerBlockProps} />
		</Tag>
	);
};

export default CardSave;
