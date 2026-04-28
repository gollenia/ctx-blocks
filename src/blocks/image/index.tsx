import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

import metadata from './block.json';
import deprecated from './deprecated';
import edit from './edit';
import './editor.scss';
import icon from './icon';
import save from './save';
import './style.scss';
import transforms from './transforms';
import type { BlockMetadata } from '../types';

const { name, title, description } = metadata as BlockMetadata;

const settings = {
	...metadata,
	title: title ? __(title, 'ctx-blocks') : title,
	description: description ? __(description, 'ctx-blocks') : description,
	icon,
	edit,
	save,
	transforms,
	deprecated,
};

registerBlockType(name, settings);
