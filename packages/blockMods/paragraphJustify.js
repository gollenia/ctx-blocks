const { createHigherOrderComponent } = wp.compose;

import { BlockControls } from '@wordpress/block-editor';
import { ToolbarButton } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { alignJustify } from '@wordpress/icons';

const { addFilter } = wp.hooks;

const addParagraphAttribute = ( props, name ) => {
	if ( name !== 'core/paragraph' ) {
		return props;
	}

	const attributes = {
		...props.attributes,
		justifyText: {
			type: 'boolean',
			default: false,
		},
	};

	return { ...props, attributes };
};

addFilter(
	'blocks.registerBlockType',
	'ctx-blocks/paragraph',
	addParagraphAttribute
);

const withParagraphControl = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		if ( props.name !== 'core/paragraph' ) {
			return <BlockEdit { ...props } />;
		}

		const { attributes, setAttributes } = props;
		const { justifyText, className } = attributes;

		props.attributes.className = justifyText ? 'wp-justify' : '';

		return (
			<>
				<BlockEdit { ...props } />
				<BlockControls>
					<ToolbarButton
						icon={ alignJustify }
						title={ __( 'Justify text', 'ctx-blocks' ) }
						isActive={ justifyText }
						onClick={ ( value ) => {
							setAttributes( {
								justifyText: ! justifyText,
								className: justifyText ? '' : 'wp-justify',
							} );
						} }
					/>
				</BlockControls>
			</>
		);
	};
}, 'withParagraphControl' );

addFilter( 'editor.BlockEdit', 'ctx-blocks/paragraph', withParagraphControl );
