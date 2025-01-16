import {
	getColorClassName,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import { useRef } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { colord } from 'colord';
import Inspector from './inspector';
import Toolbar from './toolbar';

export default function CardEdit({ ...props }) {
	const {
		attributes: {
			hover,
			imageUrl,
			imageId,
			shadow,
			url,
			badgeText,
			labelText,
			layout,
			fullHeight,
			customAccentColor,
			customHoverColor,
		},
		hoverColor,
		accentColor,
		setAttributes,
	} = props;

	const allowedBlocks = [
		'core/spacer',
		'core/separator',
		'core/paragraph',
		'core/heading',
		'core/list',
		'core/image',
		'core/group',
		'ctx-blocks/image',
		'ctx-blocks/progress',
		'ctx-blocks/grid-row',
		!url ? 'ctx-blocks/button' : false,
	];

	const imageRef = useRef();

	const onSelectMedia = (media) => {
		if (!media || !media.url) {
			setAttributes({ imageUrl: undefined, imageId: undefined });
			return;
		}
		setAttributes({
			imageUrl: media.sizes?.large?.url ?? media.url,
			imageId: media.id,
		});
	};

	const template = [
		[
			'core/heading',
			{
				placeholder: __('Title', 'ctx-blocks'),
				className: 'card__title',
				level: 2,
			},
		],
		[
			'core/heading',
			{
				placeholder: __('Subtitle', 'ctx-blocks'),
				className: 'card__subtitle',
				level: 4,
			},
		],
		[
			'core/paragraph',
			{
				placeholder: __('Your content goes here...', 'ctx-blocks'),
				className: 'card__text',
			},
		],
	];

	const accentColorClass = getColorClassName(
		'background-color',
		accentColor.slug
	);

	const accentColorValue = customAccentColor
		? customAccentColor
		: accentColor.color ?? 'var(--primary)';

	const accentStyle = {
		background: accentColorValue,
		color: colord(accentColorValue).isDark() ? '#ffffff' : '#000000',
	};

	const classes = [
		'ctx__card',
		layout?.orientation === 'horizontal'
			? 'ctx__card-horizontal'
			: 'ctx__card-vertical',
		url || hover ? 'ctx__card-hover' : false,
		shadow ? 'ctx__card-shadow' : false,
	]
		.filter(Boolean)
		.join(' ');

	const blockProps = useBlockProps({ className: classes });
	const cardStyle = {
		...blockProps.style,
		padding: '0 !important',
		height: fullHeight ? '100%' : undefined,
	};

	const contentStyle = {
		paddingTop: blockProps.style?.paddingTop ?? '1rem',
		paddingBottom: blockProps.style?.paddingBottom ?? '1rem',
		paddingLeft: blockProps.style?.paddingLeft ?? '1rem',
		paddingRight: blockProps.style?.paddingRight ?? '1rem',
	};

	const innerBlockProps = useInnerBlocksProps(
		{ className: 'ctx__card-content', style: contentStyle },
		{ allowedBlocks, template }
	);

	return (
		<>
			<Inspector {...props} imageRef={imageRef} />
			<Toolbar {...props} onSelectMedia={onSelectMedia} />
			<div {...blockProps} style={cardStyle}>
				<div className="ctx__card-header">
					{badgeText && (
						<span
							className={`ctx__card-badge ${accentColorClass}`}
							style={accentStyle}
						>
							{badgeText}
						</span>
					)}
					{labelText && (
						<span
							className={`ctx__card-label ${accentColorClass}`}
							style={accentStyle}
						>
							{labelText}
						</span>
					)}
					{imageUrl && <img ref={imageRef} src={imageUrl ?? ''} />}
				</div>

				<div
					{...innerBlockProps}
					className="ctx__card-content"
					style={contentStyle}
				></div>
			</div>
		</>
	);
}
