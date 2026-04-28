import { createBlock } from '@wordpress/blocks';

import type { GridRowAttributes } from './types';

type InnerBlockLike = {
	attributes: {
		widthLarge?: number;
	};
	innerBlocks?: unknown[];
};

const getWidthInPercent = (columnCount = 1, columnSpan = 1) => {
	return (columnSpan / columnCount) * 100;
};

const transforms = {
	to: [
		{
			type: 'block',
			blocks: ['core/columns'],
			transform: (
				attributes: GridRowAttributes,
				innerBlocks: InnerBlockLike[]
			) => {
				const nextAttributes = {
					...attributes,
				};

				const newInnerBlocks = innerBlocks.map((block) => {
					const newWidth = getWidthInPercent(
						nextAttributes.childrenWidthLarge,
						block.attributes.widthLarge !== 0
							? block.attributes.widthLarge
							: 1
					);

					return createBlock(
						'core/column',
						{
							width: newWidth,
						},
						block.innerBlocks ?? []
					);
				});

				return createBlock('core/columns', nextAttributes, newInnerBlocks);
			},
		},
	],
};

export default transforms;
