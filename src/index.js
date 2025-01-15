/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Blocks dependencies.
 */
import * as button from './blocks/button';
import * as card from './blocks/card';
import * as conditional from './blocks/conditional';
import * as descriptionItem from './blocks/description-item';
import * as descriptionList from './blocks/description-list';
import * as gridColumn from './blocks/grid-column';
import * as gridRow from './blocks/grid-row';
import * as image from './blocks/image';
import * as progress from './blocks/progress';
import * as section from './blocks/section';
import * as inlineSvg from './blocks/svg';

/**
 * Core Block modification dependencies.
 */

import './mods/paragraphJustify';
import './mods/scrollAnimation';
import './mods/spacerAutoOption';

/**
 * Stylesheets
 */
import './common/styles/editor.scss';
import './common/styles/style.scss';

const registerBlock = (block) => {
	if (!block) return;
	const { name, settings } = block;
	registerBlockType(name, settings);
};
console.log('svg', inlineSvg);
export const registerBlocks = () => {
	[
		button,
		card,
		descriptionList,
		descriptionItem,
		conditional,
		inlineSvg,
		progress,
		gridRow,
		gridColumn,
		section,
		image,
	].forEach(registerBlock);
};

registerBlocks();
