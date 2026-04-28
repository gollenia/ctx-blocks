import { addFilter } from '@wordpress/hooks';

import './featuredImageProps';
import './imageSettings';
import './listClass';
import {
	addVisibilityClass,
	addVisibilityControlAttribute,
	withVisibilityControl,
} from './mobileVisibility';
import './paragraphJustify';
import './scrollAnimation';
import './spacerAutoOption';

addFilter(
	'editor.BlockEdit',
	'ctx-blocks/core-visibility',
	withVisibilityControl
);
addFilter(
	'blocks.getSaveContent.extraProps',
	'ctx-blocks/core-visibility',
	addVisibilityClass
);
addFilter(
	'blocks.registerBlockType',
	'ctx-blocks/core-visibility',
	addVisibilityControlAttribute
);
