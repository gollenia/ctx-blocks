import {
	getColorClassName,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import { colord } from 'colord';

const deprecated = [
	{
		attributes: {
			secondaryColor: { type: 'string', default: '' },
			customSecondaryColor: { type: 'string', default: '' },
			backgroundColor: { type: 'string', default: '' },
			customBackgroundColor: { type: 'string', default: '' },
			shadow: { type: 'boolean', default: true },
			focalPoint: { type: 'object' },
			url: { type: 'string', default: '' },
			hover: { type: 'boolean', default: false },
			textAlign: { type: 'string', default: 'left' },
			imageUrl: { type: 'string', default: '' },
			imageAlt: { type: 'string', default: '' },
			imageId: { type: 'number', default: 0 },
			imagePosition: { type: 'string', default: 'top' },
			label: { type: 'string', default: '' },
			badge: { type: 'string', default: '' },
			anchor: { type: 'string' },
		},
		migrate: (attributes: Record<string, unknown>) => {
			const next = { ...attributes };
			next.labelText = next.label;
			next.badgeText = next.badge;
			next.hasBadge = !!next.badge;
			next.hasLabel = !!next.label;
			delete next.label;
			delete next.badge;
			return next;
		},
		save: (props: {
			attributes: Record<string, any>;
			className?: string;
		}) => {
			const { attributes, className } = props;
			const {
				imagePosition,
				textAlign,
				label,
				badge,
				hover,
				imageUrl,
				shadow,
				url,
				backgroundColor,
				secondaryColor,
				customBackgroundColor,
				customSecondaryColor = '',
			} = attributes;

			const backgroundColorClass = getColorClassName(
				'background-color',
				backgroundColor
			);

			getColorClassName('background-color', secondaryColor);

			const classes = [
				className,
				'ctx-card',
				backgroundColorClass,
				url || hover ? 'ctx-card-hover' : false,
				shadow ? 'ctx-card-shadow' : false,
				`ctx-card-${textAlign}`,
				`ctx-card-image-${imagePosition}`,
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
				background: customSecondaryColor,
				color: colord(customSecondaryColor).isDark()
					? '#ffffff'
					: '#000000',
			};

			const cardStyle = {
				...blockProps.style,
				backgroundColor: !backgroundColorClass
					? customBackgroundColor
					: undefined,
				padding: '0 !important',
			};

			return (
				<div {...blockProps} style={cardStyle} className={classes}>
					{!!badge && (
						<b className="ctx-card-badge" style={accentStyle}>
							<b>{badge}</b>
						</b>
					)}
					{imageUrl && (
						<div className="ctx-card-image">
							<img src={imageUrl} />
						</div>
					)}
					<div className="ctx-card-content" style={contentStyle}>
						{!!label && (
							<label
								className="ctx-card-label"
								style={accentStyle}
							>
								{label}
							</label>
						)}
						<div
							{...useInnerBlocksProps.save({
								className: 'wp-block-card__inner-container',
							})}
						/>
					</div>
				</div>
			);
		},
	},
];

export default deprecated;
