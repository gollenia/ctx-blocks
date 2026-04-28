import { withColors } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';

import metadata from './block.json';
import Edit from './edit';
import './editor.scss';
import icon from './icon';
import type { BlockMetadata } from '../types';

const { name } = metadata as BlockMetadata;

const settings = {
	icon,
	edit: withColors({
		strokeColor: 'strokeColor',
		fillColor: 'fillColor',
	})(Edit),
	save: () => null,
};

registerBlockType(name, settings);
