import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { createHigherOrderComponent } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import type {
	BlockEditProps,
	BlockSettings,
	BlockTypeLike,
	SaveProps,
} from './types';

const forbiddenBlocks = ['core/shortcode', 'ctx-blocks/nav'];

type BlockAttributes = {
	hiddenDesktop?: boolean;
	hiddenMobile?: boolean;
};

export const addVisibilityControlAttribute = (
	props: BlockSettings,
	name: string
) => {
	if (forbiddenBlocks.includes(name)) {
		return props;
	}

	const attributes = {
		...props.attributes,
		hiddenMobile: {
			type: 'boolean',
			default: false,
		},
		hiddenDesktop: {
			type: 'boolean',
			default: false,
		},
	};

	return { ...props, attributes };
};

export const withVisibilityControl = createHigherOrderComponent(
	(BlockEdit: (props: BlockEditProps<BlockAttributes>) => JSX.Element) => {
		return (props: BlockEditProps<BlockAttributes>) => {
			if (forbiddenBlocks.includes(props.name)) {
				return <BlockEdit {...props} />;
			}

			const { attributes, setAttributes } = props;
			const { hiddenDesktop, hiddenMobile } = attributes;

			return (
				<>
					<BlockEdit {...props} />
					<InspectorControls>
						<PanelBody
							title={__('Visibility', 'ctx-blocks')}
							initialOpen={false}
						>
							<ToggleControl
								label={__('Hide on large screens', 'ctx-blocks')}
								checked={hiddenDesktop}
								onChange={(value) => {
									setAttributes({ hiddenDesktop: value });
								}}
							/>
							<ToggleControl
								label={__('Hide on mobile devices', 'ctx-blocks')}
								checked={hiddenMobile}
								onChange={(value) => {
									setAttributes({ hiddenMobile: value });
								}}
							/>
						</PanelBody>
					</InspectorControls>
				</>
			);
		};
	},
	'withVisibilityControl'
);

export const addVisibilityClass = (
	extraProps: SaveProps,
	blockType: BlockTypeLike,
	attributes: BlockAttributes
) => {
	const { hiddenDesktop, hiddenMobile } = attributes;

	if (forbiddenBlocks.includes(blockType.name)) {
		return extraProps;
	}

	extraProps.className = [
		hiddenDesktop ? 'md:hidden' : false,
		hiddenMobile ? 'hidden md:visible' : false,
		extraProps.className || false,
	]
		.filter(Boolean)
		.join(' ');

	return extraProps;
};
