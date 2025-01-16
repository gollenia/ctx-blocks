/**
 * Internal dependencies
 */
import metadata from './block.json';
import deprecated from './deprecated';
import Edit from './edit';
import './editor.scss';
import icon from './icon';
import Save from './save';
import './style.scss';

/**
 * Wordpress dependencies
 */
import { withColors } from '@wordpress/block-editor';
import transforms from './transforms';

const { name } = metadata;

const settings = {
	icon: icon,
	deprecated,
	edit: withColors({
		accentColor: 'accentColor',
		hoverColor: 'hoverColor',
	})(Edit),
	transforms,
	save: Save,
};

export { name, settings };
