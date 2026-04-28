import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, ToggleControl } from '@wordpress/components';
import { createHigherOrderComponent } from '@wordpress/compose';
import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
import type {
	BlockEditProps,
	BlockSettings,
	BlockTypeLike,
	SaveProps,
} from './types';

const forbiddenBlocks: string[] = [];

type AnimationAttributes = {
	animateOnScroll?: boolean;
	animationType?: string;
};

const addAnimationControlAttribute = (
	props: BlockSettings,
	name: string
) => {
	if (forbiddenBlocks.includes(name)) {
		return props;
	}

	const attributes = {
		...props.attributes,
		animateOnScroll: {
			type: 'boolean',
			default: false,
		},
		animationType: {
			type: 'string',
			default: '',
		},
	};

	return { ...props, attributes };
};

addFilter(
	'blocks.registerBlockType',
	'ctx-blocks/core-scrollanimation',
	addAnimationControlAttribute
);

const withAnimationControl = createHigherOrderComponent(
	(BlockEdit: (props: BlockEditProps<AnimationAttributes>) => JSX.Element) => {
		return (props: BlockEditProps<AnimationAttributes>) => {
			if (forbiddenBlocks.includes(props.name)) {
				return <BlockEdit {...props} />;
			}

			const { attributes, setAttributes } = props;
			const { animateOnScroll, animationType } = attributes;

			return (
				<>
					<BlockEdit {...props} />
					<InspectorControls>
						<PanelBody
							title={__('Animation', 'ctx-blocks')}
							initialOpen={false}
						>
							<ToggleControl
								label={__('Animate on scroll', 'ctx-blocks')}
								checked={animateOnScroll}
								onChange={(value) => {
									setAttributes({ animateOnScroll: value });
								}}
							/>
							<SelectControl
								disabled={!animateOnScroll}
								label={__('Select Animation', 'ctx-blocks')}
								value={animationType}
								options={[
									{ label: __('None', 'ctx-blocks'), value: '' },
									{ label: __('Fade In', 'ctx-blocks'), value: 'fade-in' },
									{
										label: __('Fade In Up', 'ctx-blocks'),
										value: 'fade-in-up',
									},
									{
										label: __('Fade In Down', 'ctx-blocks'),
										value: 'fade-in-down',
									},
									{
										label: __('Fade In Left', 'ctx-blocks'),
										value: 'fade-in-left',
									},
									{
										label: __('Fade In Right', 'ctx-blocks'),
										value: 'fade-in-right',
									},
									{
										label: __('Flip In X', 'ctx-blocks'),
										value: 'flip-in-x',
									},
									{
										label: __('Flip In Y', 'ctx-blocks'),
										value: 'flip-in-y',
									},
									{ label: __('Zoom In', 'ctx-blocks'), value: 'zoom-in' },
									{
										label: __('Bounce In', 'ctx-blocks'),
										value: 'bounce-in',
									},
								]}
								onChange={(value) => {
									setAttributes({ animationType: value });
								}}
							/>
						</PanelBody>
					</InspectorControls>
				</>
			);
		};
	},
	'withAnimationControl'
);

addFilter(
	'editor.BlockEdit',
	'ctx-blocks/core-scrollanimation',
	withAnimationControl
);

const addAnimationClass = (
	extraProps: SaveProps,
	blockType: BlockTypeLike,
	attributes: AnimationAttributes
) => {
	const { animateOnScroll, animationType } = attributes;

	if (forbiddenBlocks.includes(blockType.name)) {
		return extraProps;
	}

	extraProps.className = [
		animateOnScroll ? 'ctx-animate-on-scroll' : false,
		animationType ? `ctx-${animationType}` : false,
		extraProps.className || false,
	]
		.filter(Boolean)
		.join(' ');

	return extraProps;
};

addFilter(
	'blocks.getSaveContent.extraProps',
	'ctx-blocks/core-scrollanimation',
	addAnimationClass
);
