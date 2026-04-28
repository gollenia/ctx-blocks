import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

import Inspector from './inspector';
import type { GridColumnProps } from './types';

export default function GridColumnEdit({ ...props }: GridColumnProps) {
	const {
		attributes: { widthLarge },
		className = '',
	} = props;

	const template: [string, Record<string, unknown>][] = [
		['core/paragraph', {}],
	];

	const blockProps = useBlockProps({
		className: `${className} ctx:column ctx:column--${widthLarge}`.trim(),
	});

	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		template,
	});

	return (
		<>
			<Inspector {...props} />

			<div {...innerBlocksProps} />
		</>
	);
}
