const { createHigherOrderComponent } = wp.compose;
const { InspectorControls, URLInput } = wp.blockEditor;
const { PanelBody, TextControl, RadioControl } = wp.components;
const { addFilter } = wp.hooks;
const { __ } = wp.i18n;

const addListClass = (props, name) => {
	if (name !== 'core/post-title') {
		return props;
	}

	const attributes = {
		...props.attributes,
	};

	attributes.className = 'core-block';

	return { ...props, attributes };
};

addFilter('blocks.registerBlockType', 'ctx-blocks/list', addListClass);
