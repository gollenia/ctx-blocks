import { withColors } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';

import metadata from './block.json';
import deprecated from './deprecated';
import Edit from './edit';
import './editor.scss';
import icon from './icon';
import Save from './save';
import './style.scss';
import transforms from './transforms';
import type { BlockMetadata } from '../types';

const { name } = metadata as BlockMetadata;

const settings = {
	icon,
	deprecated,
	edit: withColors({
		accentColor: 'accentColor',
		hoverColor: 'hoverColor',
	})(Edit),
	transforms,
	save: Save,
};

registerBlockType(name, settings);
