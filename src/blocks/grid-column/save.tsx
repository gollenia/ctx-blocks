import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

import type { GridColumnProps } from './types';

export default function GridColumnSave({ ...props }: GridColumnProps) {
	const {
		attributes: { widthLarge, widthMedium, widthSmall, mobilePosition },
		className = '',
	} = props;

	const blockProps = useBlockProps.save({
		className: [
			className,
			'grid__column',
			`grid__column--span-${widthSmall}`,
			`md:grid__column--span-${widthMedium}`,
			`xl:grid__column--span-${widthLarge}`,
			`grid__column--start-${mobilePosition}`,
		]
			.filter(Boolean)
			.join(' '),
	});

	const innerBlocksProps = useInnerBlocksProps.save(blockProps, {});

	return <div {...innerBlocksProps} />;
}
