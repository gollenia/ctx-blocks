import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';

import metadata from './block.json';
import deprecated from './deprecated';
import edit from './edit';
import './editor.scss';
import icon from './icon';
import './style.scss';
import type { BlockMetadata } from '../types';

const { name } = metadata as BlockMetadata;

const settings = {
	icon,
	deprecated,
	edit,
	save: () => <InnerBlocks.Content />,
};

registerBlockType(name, settings);
