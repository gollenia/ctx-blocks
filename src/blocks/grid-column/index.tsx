import { registerBlockType } from '@wordpress/blocks';

import metadata from './block.json';
import edit from './edit';
import './editor.scss';
import icons from './icons';
import save from './save';
import './style.scss';
import type { BlockMetadata, WidthAttributes } from '../types';

const { name } = metadata as BlockMetadata;

const settings = {
	icon: icons.column,
	getEditWrapperProps(props: WidthAttributes) {
		return {
			'data-width': props.widthLarge || false,
		};
	},
	edit,
	save,
};

registerBlockType(name, settings);
