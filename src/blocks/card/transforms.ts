import { createBlock } from '@wordpress/blocks';

const transforms = {
	to: [
		{
			type: 'block',
			blocks: ['core/group'],
			transform: (
				attributes: Record<string, unknown>,
				innerBlocks: unknown[]
			) => {
				const nextAttributes = {
					...attributes,
				};
				return createBlock('core/group', nextAttributes, innerBlocks);
			},
		},
	],
};

export default transforms;
