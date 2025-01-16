import {
	__experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
	InspectorControls,
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
} from '@wordpress/block-editor';
import {
	CheckboxControl,
	FocalPointPicker,
	PanelBody,
	TextControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import { mediaPosition } from './mediaPosition.js';

const Inspector = (props) => {
	const {
		attributes: {
			url,
			imageUrl,
			shadow,
			focalPoint,
			labelText,
			badgeText,
			customAccentColor,
			customHoverColor,
			fullHeight,
		},
		setAttributes,
		imageRef,
		accentColor,
		hoverColor,
		setAccentColor,
		setHoverColor,
		clientId,
	} = props;

	const colorGradientSettings = useMultipleOriginColorsAndGradients();

	const imperativeFocalPointPreview = (value) => {
		const [styleOfRef, property] = imageRef.current
			? [imageRef.current.style, 'objectPosition']
			: [imageRef.current.style, 'backgroundPosition'];
		styleOfRef[property] = mediaPosition(value);
	};

	return (
		<>
			<InspectorControls group="color">
				<ColorGradientSettingsDropdown
					settings={[
						{
							label: __('Accent Color', 'ctx-blocks'),
							colorValue: accentColor.color || customAccentColor,
							onColorChange: (value) => {
								setAccentColor(value);

								setAttributes({
									customAccentColor: value,
								});
							},
						},
						{
							label: __('Hover Color', 'ctx-blocks'),
							colorValue: hoverColor.color || customHoverColor,
							onColorChange: (value) => {
								setHoverColor(value);

								setAttributes({
									customHoverColor: value,
								});
							},
						},
					]}
					panelId={clientId}
					hasColorsOrGradients={false}
					disableCustomColors={false}
					__experimentalIsRenderedInSidebar
					{...colorGradientSettings}
				/>
			</InspectorControls>
			<InspectorControls>
				<PanelBody
					title={__('Appearance', 'ctx-blocks')}
					initialOpen={false}
				>
					<CheckboxControl
						label={__('Shadow', 'ctx-blocks')}
						checked={shadow}
						onChange={(value) => {
							setAttributes({ shadow: value });
						}}
					/>

					<CheckboxControl
						label={__('Full Height', 'ctx-blocks')}
						checked={fullHeight}
						onChange={(value) => {
							setAttributes({ fullHeight: value });
						}}
					/>

					<TextControl
						label={__('Label Text', 'ctx-blocks')}
						value={labelText}
						onChange={(value) => {
							setAttributes({ labelText: value });
						}}
					/>

					<TextControl
						label={__('Badge Text', 'ctx-blocks')}
						value={badgeText}
						onChange={(value) => {
							setAttributes({ badgeText: value });
						}}
					/>
				</PanelBody>

				<PanelBody
					title={__('Image', 'ctx-blocks')}
					initialOpen={false}
				>
					<FocalPointPicker
						__nextHasNoMarginBottom
						label={__('Focal point picker')}
						url={imageUrl}
						value={focalPoint}
						onDragStart={imperativeFocalPointPreview}
						onDrag={imperativeFocalPointPreview}
						onChange={(newFocalPoint) =>
							setAttributes({
								focalPoint: newFocalPoint,
							})
						}
					/>
				</PanelBody>
			</InspectorControls>
		</>
	);
};

export default Inspector;
