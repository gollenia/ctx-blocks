import {
	__experimentalGetBorderClassesAndStyles as getBorderClassesAndStyles,
	getColorClassName,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';

import type { DescriptionItemProps } from './types';

export default function Save(props: DescriptionItemProps) {
	const {
		attributes: {
			imageUrl,
			icon,
			url,
			urlIcon,
			iconColor,
			customIconColor,
			iconBackgroundColor,
			customIconBackgroundColor,
		},
		className,
	} = props;

	const classes = [className, 'ctx__description-item']
		.filter(Boolean)
		.join(' ');

	const blockProps = useBlockProps.save({
		className: classes,
	});

	const borderProps = getBorderClassesAndStyles(props.attributes);

	const iconColorSlug =
		typeof iconColor === 'string' ? iconColor : iconColor?.slug;
	const iconBackgroundColorSlug =
		typeof iconBackgroundColor === 'string'
			? iconBackgroundColor
			: iconBackgroundColor?.slug;

	const imageStyle = {
		...borderProps.style,
		...blockProps.style,
		color:
			(typeof iconColor === 'object' ? iconColor?.color : undefined) ??
			customIconColor ??
			'none',
		backgroundColor:
			(typeof iconBackgroundColor === 'object'
				? iconBackgroundColor?.color
				: undefined) ??
			customIconBackgroundColor ??
			'none',
	};

	const imageClasses = [
		borderProps.classes,
		'ctx__description-item-image',
		icon === 'label' && !imageUrl && 'ctx__description-item-image-bullet',
		getColorClassName('color', iconColorSlug),
		getColorClassName('background-color', iconBackgroundColorSlug),
	]
		.filter(Boolean)
		.join(' ');

	const innerBlocksProps = useInnerBlocksProps.save();

	return (
		<li {...blockProps}>
			<div className={imageClasses} style={imageStyle}>
				{imageUrl ? (
					<img src={imageUrl} />
				) : (
					<i className="material-icons material-symbols-outlined">
						{icon}
					</i>
				)}
			</div>

			<div
				{...innerBlocksProps}
				className="ctx__description-item__content"
			/>

			{url && (
				<a
					className="ctx__description-item__link"
					href={url}
					target="_blank"
					rel="noopener noreferrer"
				>
					{urlIcon && (
						<i className="material-icons material-symbols-outlined">
							{urlIcon}
						</i>
					)}
				</a>
			)}
		</li>
	);
}
