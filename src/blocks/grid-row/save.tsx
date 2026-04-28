import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

import type { GridRowAttributes } from './types';

type SaveProps = {
	attributes: GridRowAttributes;
};

export default function Save({ attributes }: SaveProps) {
	const {
		equalizer,
		divider,
		childrenWidthLarge,
		childrenWidthMedium,
		childrenWidthSmall,
	} = attributes;

	const classes = [
		'grid__row',
		'grid',
		`grid--columns-${childrenWidthSmall}`,
		`md:grid--columns-${childrenWidthMedium}`,
		`xl:grid--columns-${childrenWidthLarge}`,
		equalizer && 'grid--equalizer',
		divider && 'grid--divider',
	]
		.filter(Boolean)
		.join(' ');

	const blockGap = attributes.style?.spacing?.blockGap;
	const gapStyle = !blockGap
		? {}
		: {
				gap: blockGap.replaceAll('|', '--').replace(':', '(--wp--') + ')',
			};

	const blockProps = useBlockProps.save({
		className: classes,
		style: gapStyle,
	});
	const innerBlocksProps = useInnerBlocksProps.save(blockProps, {});

	return <div {...innerBlocksProps} />;
}
