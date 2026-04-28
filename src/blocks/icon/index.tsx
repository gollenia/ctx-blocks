import { registerBlockType } from '@wordpress/blocks';

import metadata from './block.json';
import edit from './edit';
import './editor.scss';
import icon from './icon';
import './style.scss';
import type { BlockMetadata } from '../types';

const { name } = metadata as BlockMetadata;

const settings = {
	icon,
	edit,
	save: () => null,
};

registerBlockType(name, settings);
