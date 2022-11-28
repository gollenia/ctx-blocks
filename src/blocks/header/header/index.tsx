/**
 * Internal dependencies
 */
import metadata from './block.json';
import Edit from './edit';
import './editor.scss';
import icon from './icon';

/**
 * Wordpress dependencies
 */
import { InnerBlocks, withColors } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

const { name, title, description } = metadata;

const settings = {
	...metadata,
	title: __( title, 'ctx-blocks' ),
	description: __( description, 'ctx-blocks' ),
	icon,
	edit: withColors( {
		backgroundColor: 'backgroundColor',
		accentColor: 'accentColor',
	} )( Edit ),
	save: () => {
		return <InnerBlocks.Content />;
	},
};

export { name, settings };
