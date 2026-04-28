import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';
import { createHigherOrderComponent } from '@wordpress/compose';
import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
import type { BlockEditProps, BlockSettings } from './types';

type ImageAttributes = {
	aspectRatio?: string;
	mobileOrientation?: string;
	showRoundedBorder?: string;
	showBorder?: string;
};

const addFeaturedImageAttribute = (props: BlockSettings, name: string) => {
	if (name !== 'core/image') {
		return props;
	}

	const attributes = {
		...props.attributes,
		aspectRatio: {
			type: 'string',
			default: 'original',
		},
		mobileOrientation: {
			type: 'string',
			default: 'center',
		},
		showRoundedBorder: {
			type: 'string',
			default: 'center',
		},
		showBorder: {
			type: 'string',
			default: 'center',
		},
	};

	return { ...props, attributes };
};

addFilter(
	'blocks.registerBlockType',
	'ctx-blocks/image-settings',
	addFeaturedImageAttribute
);

const withFeaturedImageControl = createHigherOrderComponent(
	(BlockEdit: (props: BlockEditProps<ImageAttributes>) => JSX.Element) => {
		return (props: BlockEditProps<ImageAttributes>) => {
			if (props.name !== 'core/image') {
				return <BlockEdit {...props} />;
			}

			const { attributes, setAttributes } = props;
			const { aspectRatio, mobileOrientation } = attributes;

			return (
				<>
					<BlockEdit {...props} />
					<InspectorControls>
						<PanelBody
							title={__('Mobile Options', 'ctx-blocks')}
							initialOpen={false}
						>
							<SelectControl
								label={__(
									'Image Orientation on mobile devices',
									'ctx-blocks'
								)}
								options={[
									{ label: 'left', value: 'left' },
									{ label: 'center', value: 'center' },
									{ label: 'right', value: 'right' },
								]}
								onChange={(value) => {
									setAttributes({ mobileOrientation: value });
								}}
								value={mobileOrientation}
							/>
							<SelectControl
								label={__('Image size on mobile devices', 'ctx-blocks')}
								options={[
									{ label: '16/9', value: '16/9' },
									{ label: '4/3', value: '4/3' },
									{ label: '1/1', value: '1/1' },
									{ label: '3/4', value: '3/4' },
									{ label: 'Original', value: 'original' },
								]}
								onChange={(value) => {
									setAttributes({ aspectRatio: value });
								}}
								value={aspectRatio}
							/>
						</PanelBody>
					</InspectorControls>
				</>
			);
		};
	},
	'withFeaturedImageControl'
);

addFilter(
	'editor.BlockEdit',
	'ctx-blocks/image-settings',
	withFeaturedImageControl
);
