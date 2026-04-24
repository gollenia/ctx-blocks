const { createHigherOrderComponent } = wp.compose;
const { Fragment } = wp.element;
const { InspectorControls } = wp.blockEditor;
const { PanelBody, ToggleControl } = wp.components;
const { addFilter } = wp.hooks;
const { __ } = wp.i18n;

const addAutoMarginAttribute = (props, name) => {
	if (name != 'core/spacer') {
		return props;
	}

	const attributes = {
		...props.attributes,
		autoMargin: {
			type: 'boolean',
			default: false,
		},
	};

	return { ...props, attributes };
};

addFilter(
	'blocks.registerBlockType',
	'ctx-blocks/core-mtauto',
	addAutoMarginAttribute
);

/*
 * Add autoMargin control to core/spacer block inspector
 */
const withAutoMarginControl = createHigherOrderComponent((BlockEdit) => {
	return (props) => {
		if (props.name != 'core/spacer') {
			return <BlockEdit {...props} />;
		}

		const { attributes, setAttributes } = props;
		const { autoMargin } = attributes;

		return (
			<Fragment>
				<BlockEdit {...props} />
				<InspectorControls>
					<PanelBody
						title={__('Auto Height', 'ctx-blocks')}
						initialOpen={false}
					>
						<ToggleControl
							label={__(
								'Use as auto height control in a flex container',
								'ctx-blocks'
							)}
							checked={autoMargin}
							onChange={(value) => {
								setAttributes({ autoMargin: value });
								setAttributes({ className: 'ctx-auto-spacer' });
							}}
						/>
					</PanelBody>
				</InspectorControls>
			</Fragment>
		);
	};
}, 'withAutoMarginControl');

addFilter('editor.BlockEdit', 'ctx-blocks/core-mtauto', withAutoMarginControl);

const addAutoMarginClass = (extraProps, blockType, attributes) => {
	const { autoMargin } = attributes;

	if (blockType.name != 'core/spacer') {
		return extraProps;
	}

	extraProps.className = [
		autoMargin ? 'mt-auto' : false,
		extraProps.className || false,
	]
		.filter(Boolean)
		.join(' ');

	return extraProps;
};

addFilter(
	'blocks.getSaveContent.extraProps',
	'ctx-blocks/core-mtauto',
	addAutoMarginClass
);
