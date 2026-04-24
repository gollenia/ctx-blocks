/**
 * Internal dependencies
 */
import { register } from '@wordpress/data';
import metadata from './block.json';
import Edit from './edit';
import './editor.scss';
import icon from './icon';

/**
 * Wordpress dependencies
 */
import { withColors } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';

const { name, title, description } = metadata;

const settings = {
	icon,
	edit: withColors({
		strokeColor: 'strokeColor',
		fillColor: 'fillColor',
	})(Edit),
	save: () => {
		return null;
	},
};

registerBlockType(name, settings);
