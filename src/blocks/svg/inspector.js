/**
 * WordPress dependencies
 */
import { InspectorControls, PanelColorSettings } from '@wordpress/block-editor';
import {
	CheckboxControl,
	__experimentalNumberControl as NumberControl,
	PanelBody,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Inspector controls
 */
const Inspector = (props) => {
	const {
		attributes: {
			width,
			height,
			syncHeight,
			url,
			id,
			linkTo,
			link,
			strokeWidth,
			sizeInPercent,
		},
		setAttributes,
		setStrokeColor,
		setFillColor,
		strokeColor,
		fillColor,
	} = props;

	return (
		<InspectorControls>
			<PanelBody
				title={__('Image Size', 'ctx-blocks')}
				initialOpen={true}
			>
				<CheckboxControl
					label={__('Sync Height', 'ctx-blocks')}
					checked={syncHeight}
					onChange={(value) => setAttributes({ syncHeight: value })}
				/>

				<CheckboxControl
					label={__('Size in Percent', 'ctx-blocks')}
					checked={sizeInPercent}
					onChange={(value) => {
						setAttributes({ sizeInPercent: value });
						if (value) {
							setAttributes({ width: 100 });
							setAttributes({ height: 100 });
						}
					}}
				/>

				<NumberControl
					label={__('Width', 'ctx-blocks')}
					value={width}
					max={sizeInPercent ? 100 : undefined}
					onChange={(value) => {
						setAttributes({ width: parseInt(value) });
						if (syncHeight) {
							setAttributes({ height: parseInt(value) });
						}
					}}
					min={16}
				/>
				<NumberControl
					label={__('Height', 'ctx-blocks')}
					value={height}
					max={sizeInPercent ? 100 : undefined}
					disabled={syncHeight}
					onChange={(value) =>
						setAttributes({ height: parseInt(value) })
					}
					min={16}
				/>
			</PanelBody>
			<PanelBody
				title={__('Image Manipulation', 'ctx-blocks')}
				initialOpen={false}
			>
				<NumberControl
					label={__('Stroke Width', 'ctx-blocks')}
					value={strokeWidth}
					onChange={(value) =>
						setAttributes({ strokeWidth: parseInt(value) })
					}
					min={0}
				/>
			</PanelBody>
			<PanelColorSettings
				title={__('Color settings', 'ctx-blocks')}
				initialOpen={false}
				colorSettings={[
					{
						label: __('Stroke color', 'ctx-blocks'),
						onChange: setStrokeColor,
						value: strokeColor.color,
						disableCustomColors: false,
						defaultPalette: false,
						enableAlpha: false,
					},
					{
						label: __('Fill color', 'ctx-blocks'),
						onChange: setFillColor,
						value: fillColor.color,
						disableCustomColors: false,
						defaultPalette: false,
					},
				]}
			/>
		</InspectorControls>
	);
};

export default Inspector;
