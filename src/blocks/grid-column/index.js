/**
 * Internal dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';
import edit from './edit';
import './editor.scss';
import icons from './icons';
import save from './save';
import './style.scss';

/**
 * Wordpress dependencies
 */

const { name, title, description } = metadata;

const settings = {
	icon: icons.column,
	getEditWrapperProps(props) {
		return {
			'data-width': props.widthLarge || false,
		};
	},
	edit,
	save,
};

registerBlockType(name, settings);
