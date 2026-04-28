import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

import Inspector from './inspector';
import type { DescriptionListProps } from './types';

export default function Edit({ ...props }: DescriptionListProps) {
	const allowedBlocks = ['ctx-blocks/description-item'];

	const {
		attributes: { dividers },
		className,
	} = props;

	const classes = [
		'ctx:description__wrapper',
		className,
		dividers ? 'ctx-description--divider' : false,
	]
		.filter(Boolean)
		.join(' ');

	const template: [string][] = [['ctx-blocks/description-item']];

	const blockProps = useBlockProps({ className: classes });

	const innerBlockProps = useInnerBlocksProps(
		{},
		{ allowedBlocks, template, templateLock: false }
	);

	return (
		<div {...blockProps}>
			<Inspector {...props} />
			<div className="ctx:description">
				<div {...innerBlockProps} />
			</div>
		</div>
	);
}
