import {
	getColorClassName,
	useBlockProps,
	__experimentalUseBorderProps as useBorderProps,
	useInnerBlocksProps,
	withColors,
} from '@wordpress/block-editor';
import { compose } from '@wordpress/compose';
import { useRef } from '@wordpress/element';

import { RenderIconPreview, getBlockIcon, useBlockIcons } from '../../shared/icons';
import Inspector from './inspector';
import Toolbar from './toolbar';
import type {
	DescriptionItemProps,
	MediaLike,
} from './types';

function ItemEdit({ ...props }: DescriptionItemProps) {
	const {
		attributes: { icon, url, urlIcon, imageUrl },
		iconColor,
		customIconColor,
		customIconBackgroundColor,
		iconBackgroundColor,
		className,
		setAttributes,
	} = props;

	const imageRef = useRef<HTMLImageElement | null>(null);
	const { icons } = useBlockIcons();
	const selectedIcon = getBlockIcon(icons, icon);
	const selectedUrlIcon = getBlockIcon(icons, urlIcon);

	const onSelectMedia = (media?: MediaLike) => {
		if (!media?.url) {
			setAttributes({ imageUrl: undefined, imageId: undefined });
			return;
		}
		setAttributes({
			imageUrl: media.sizes?.thumbnail?.url ?? media.url,
			imageId: media.id,
		});
	};

	const classes = [className, 'ctx__description-item']
		.filter(Boolean)
		.join(' ');

	const blockProps = useBlockProps({
		className: classes,
	});

	const borderProps = useBorderProps(props.attributes);
	const imageStyle = {
		...borderProps.style,
		color: iconColor?.color ?? customIconColor ?? 'none',
		backgroundColor:
			iconBackgroundColor?.color ?? customIconBackgroundColor ?? 'none',
	};

	const imageClasses = [
		'ctx__description-item-image',
		getColorClassName('color', iconColor?.slug),
		getColorClassName('background-color', iconBackgroundColor?.slug),
		icon === 'label' && !imageUrl && 'ctx__description-item-image-bullet',
	]
		.filter(Boolean)
		.join(' ');

	const template: [string, Record<string, unknown>][] = [
		[
			'core/heading',
			{
				placeholder: 'Title',
				level: 4,
				className: 'title',
				style: { spacing: { margin: { top: '0px', bottom: '0px' } } },
			},
		],
		['core/paragraph', { placeholder: 'Description' }],
	];
	const innerBlockProps = useInnerBlocksProps(
		{ className: 'ctx__description-item-content' },
		{
			template,
			allowedBlocks: ['core/paragraph', 'core/heading'],
		}
	);

	return (
		<>
			<div
				{...blockProps}
				style={{
					...blockProps.style,
					backgroundColor: 'none !important',
				}}
			>
				<Inspector {...props} />
				<Toolbar {...props} onSelectMedia={onSelectMedia} />
				<div className={imageClasses} style={imageStyle}>
					{imageUrl ? (
						<img src={imageUrl} ref={imageRef} />
					) : (
						<RenderIconPreview
							icon={selectedIcon}
							className="ctx-icon"
						/>
					)}
				</div>

				<div
					className="ctx__description-item__content"
					{...innerBlockProps}
				/>
				{url && (
					<div className="ctx__description-item__action">
						<b>
							<RenderIconPreview
								icon={selectedUrlIcon}
								className="ctx-icon"
							/>
						</b>
					</div>
				)}
			</div>
		</>
	);
}

export default compose([
	withColors({
		iconColor: 'icon-color',
		iconBackgroundColor: 'background-color',
	}),
])(ItemEdit);
