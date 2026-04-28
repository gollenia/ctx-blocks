import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

import type { DescriptionListAttributes } from './types';

type SaveProps = {
	attributes: DescriptionListAttributes;
};

export default function Save({ attributes }: SaveProps) {
	const { dividers } = attributes;

	const classes = [
		'ctx-description',
		'ctx:description__wrapper',
		dividers ? 'ctx-description--divider' : false,
	]
		.filter(Boolean)
		.join(' ');

	const blockGap = attributes.style?.spacing?.blockGap;
	const style = {
		gap: blockGap
			? blockGap.replaceAll('|', '--').replace(':', '(--wp--') + ')'
			: undefined,
	};
	const blockProps = useBlockProps.save({ className: classes, style });
	const innerBlockProps = useInnerBlocksProps.save(blockProps);

	return <ul {...innerBlockProps} />;
}
