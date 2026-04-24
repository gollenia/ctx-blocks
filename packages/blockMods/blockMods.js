import { withVisibilityControl, addVisibilityClass, addVisibilityControlAttribute } from "./mobileVisibility";

addFilter( 'editor.BlockEdit', 'ctx-blocks/core-visibility', withVisibilityControl );
addFilter( 'blocks.getSaveContent.extraProps', 'ctx-blocks/core-visibility', addVisibilityClass );
addFilter( 'blocks.registerBlockType', 'ctx-blocks/core-visibility', addVisibilityControlAttribute );