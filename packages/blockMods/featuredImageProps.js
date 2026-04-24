const { createHigherOrderComponent } = wp.compose;
const { InspectorControls } = wp.blockEditor;
const { PanelBody, SelectControl } = wp.components;
const { addFilter } = wp.hooks;
const { __ } = wp.i18n;

const addFeaturedImageAttribute = ( props, name ) => {
	if ( name !== 'core/post-featured-image' ) {
		return props;
	}

	const attributes = {
		...props.attributes,
		aspectRatio: {
			type: 'string',
			default: '4/4',
		},
		mobileOrientation: {
			type: 'string',
			default: 'center',
		},
	};

	return { ...props, attributes };
};

addFilter(
	'blocks.registerBlockType',
	'ctx-blocks/featured-image',
	addFeaturedImageAttribute
);

const withFeaturedImageControl = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		if ( props.name !== 'core/post-featured-image' ) {
			return <BlockEdit { ...props } />;
		}

		const { attributes, setAttributes } = props;
		const { aspectRatio, mobileOrientation } = attributes;

		return (
			<>
				<BlockEdit { ...props } />
				<InspectorControls>
					<PanelBody
						title={ __( 'Mobile Options', 'ctx-blocks' ) }
						initialOpen={ false }
					>
						<SelectControl
							label={ __(
								'Image Orientation on mobile devices',
								'ctx-blocks'
							) }
							options={ [
								{ label: 'Left', value: 'left' },
								{ label: 'Center', value: 'center' },
								{ label: 'Right', value: 'right' },
							] }
							onChange={ ( value ) => {
								setAttributes( { mobileOrientation: value } );
							} }
							value={ mobileOrientation }
						/>
						<SelectControl
							label={ __(
								'Image size on mobile devices',
								'ctx-blocks'
							) }
							options={ [
								{ label: '16/9', value: '16/9' },
								{ label: '4/3', value: '4/3' },
								{ label: '1/1', value: '1/1' },
								{ label: '3/4', value: '3/4' },
								{ label: 'Original', value: 'original' },
							] }
							onChange={ ( value ) => {
								setAttributes( { aspectRatio: value } );
							} }
							value={ aspectRatio }
						/>
					</PanelBody>
				</InspectorControls>
			</>
		);
	};
}, 'withFeaturedImageControl' );

addFilter(
	'editor.BlockEdit',
	'ctx-blocks/featured-image',
	withFeaturedImageControl
);
