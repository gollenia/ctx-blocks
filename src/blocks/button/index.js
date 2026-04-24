/**
 * Internal dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor';
import metadata from './block.json';
import deprecated from './deprecated';
import edit from './edit';
import './editor.scss';
import icon from './icon';
import './style.scss';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Wordpress dependencies
 */

const { name } = metadata;

const settings = {
	icon,
	deprecated,
	edit,
	save: () => {
		return <InnerBlocks.Content />;
	},
};

registerBlockType(name, settings);
