const { createHigherOrderComponent } = wp.compose;
const { InspectorControls } = wp.blockEditor;
const { PanelBody, ToggleControl, SelectControl } = wp.components;
const { addFilter } = wp.hooks;
const { __ } = wp.i18n;

const forbiddenBlocks = [];
const disableClasses = ['events-manager/upcoming'];

const addAnimationControlAttribute = (props, name) => {
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

const withAnimationControl = createHigherOrderComponent((BlockEdit) => {
	return (props) => {
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
								{
									label: __('Fade In', 'ctx-blocks'),
									value: 'fade-in',
								},
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
									value: 'flip-in-x',
								},
								{
									label: __('Zoom In', 'ctx-blocks'),
									value: 'zoom-in',
								},
								{
									label: __('Bounce in In', 'ctx-blocks'),
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
}, 'withAnimationControl');

addFilter(
	'editor.BlockEdit',
	'ctx-blocks/core-scrollanimation',
	withAnimationControl
);

const addAnimationClass = (extraProps, blockType, attributes) => {
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
