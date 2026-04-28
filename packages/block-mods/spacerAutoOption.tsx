import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { createHigherOrderComponent } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import type {
	BlockEditProps,
	BlockSettings,
	BlockTypeLike,
	SaveProps,
} from './types';

type SpacerAttributes = {
	autoMargin?: boolean;
	className?: string;
};

const addAutoMarginAttribute = (props: BlockSettings, name: string) => {
	if (name !== 'core/spacer') {
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

const withAutoMarginControl = createHigherOrderComponent(
	(BlockEdit: (props: BlockEditProps<SpacerAttributes>) => JSX.Element) => {
		return (props: BlockEditProps<SpacerAttributes>) => {
			if (props.name !== 'core/spacer') {
				return <BlockEdit {...props} />;
			}

			const { attributes, setAttributes } = props;
			const { autoMargin } = attributes;

			return (
				<>
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
									setAttributes({
										autoMargin: value,
										className: 'ctx-auto-spacer',
									});
								}}
							/>
						</PanelBody>
					</InspectorControls>
				</>
			);
		};
	},
	'withAutoMarginControl'
);

addFilter('editor.BlockEdit', 'ctx-blocks/core-mtauto', withAutoMarginControl);

const addAutoMarginClass = (
	extraProps: SaveProps,
	blockType: BlockTypeLike,
	attributes: SpacerAttributes
) => {
	const { autoMargin } = attributes;

	if (blockType.name !== 'core/spacer') {
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
