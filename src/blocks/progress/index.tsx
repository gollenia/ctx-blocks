import { withColors } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';

import metadata from './block.json';
import edit from './edit';
import './editor.scss';
import icon from './icon';
import save from './save';
import type { BlockMetadata } from '../types';

const { name } = metadata as BlockMetadata;

const settings = {
	icon,
	edit: withColors({
		colorBar: 'colorBar',
		colorBackground: 'colorBackground',
	})(edit),
	save,
};

registerBlockType(name, settings);
