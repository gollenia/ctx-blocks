/**
 * Internal dependencies
 */
import { register } from '@wordpress/data';
import metadata from './block.json';
import deprecated from './deprecated';
import edit from './edit';
import './editor.scss';
import icon from './icon';
import save from './save';
import './style.scss';
import transforms from './transforms';

/**
 * Wordpress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

const { name, title, description } = metadata;

const settings = {
	...metadata,
	title: __(title, 'ctx-blocks'),
	description: __(description, 'ctx-blocks'),
	icon,
	edit,
	save,
	transforms,
	deprecated,
};

registerBlockType(name, settings);
