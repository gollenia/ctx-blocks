import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';
import edit from './edit';
import './editor.scss';
import icons from './icons';
import save from './save';
import './style.scss';
import transforms from './transforms';

/**
 * Wordpress dependencies
 */

const { name, title, description } = metadata;

const settings = {
	icon: icons.row,
	edit,
	save,
	transforms,
};

registerBlockType(name, settings);
