import { addFilter } from '@wordpress/hooks';
import type { BlockSettings } from './types';

const addListClass = (props: BlockSettings, name: string) => {
	if (name !== 'core/post-title') {
		return props;
	}

	const attributes = {
		...props.attributes,
		className: 'core-block',
	};

	return { ...props, attributes };
};

addFilter('blocks.registerBlockType', 'ctx-blocks/list', addListClass);
