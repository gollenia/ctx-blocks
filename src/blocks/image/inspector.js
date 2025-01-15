/**
 * WordPress dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';
import {
	AnglePickerControl,
	CheckboxControl,
	FocalPointPicker,
	PanelBody,
	RangeControl,
	SelectControl,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { mediaPosition } from './common.js';

/**
 * Inspector controls
 */
const Inspector = (props) => {
	const {
		attributes: {
			round,
			border,
			width,
			shadow,
			flipX,
			flipY,
			rotate,
			aspectRatio,
			url,
			imageUrl,
			hoverZoom,
			imageId,
			focalPoint,
			imageSize,
		},
		setAttributes,
		imageRef,
	} = props;

	const imperativeFocalPointPreview = (value) => {
		const [styleOfRef, property] = imageRef.current
			? [imageRef.current.style, 'objectPosition']
			: [imageRef.current.style, 'backgroundPosition'];
		styleOfRef[property] = mediaPosition(value);
	};

	const image = useSelect(
		(select) => {
			return select('core').getMedia(imageId);
		},
		[imageId]
	);

	const imageSizes = useSelect((select) => {
		const sizes = select('core/editor').getEditorSettings().imageSizes;
		const data = image?.media_details?.sizes;
		if (!data || !sizes) return [];

		const selectSizes = sizes
			.filter((size) => {
				return !!data[size.slug];
			})
			.map((size) => {
				const dataForSize = data[size.slug];
				if (!dataForSize) return undefined;
				return {
					label:
						size.name +
						' (' +
						dataForSize.width +
						'x' +
						dataForSize.height +
						')',
					value: size.slug,
				};
			});
		return selectSizes;
	});

	const setImageSize = (size) => {
		const data = image?.media_details?.sizes;

		if (!data) return;
		const dataForSize = data[size];

		if (!dataForSize) return;
		setAttributes({
			imageUrl: dataForSize.source_url,
			imageSize: size,
		});
	};

	return (
		<InspectorControls>
			<PanelBody title={__('Design', 'ctx-blocks')} initialOpen={true}>
				<RangeControl
					label={__('Width in percent', 'ctx-blocks')}
					value={width}
					onChange={(value) => setAttributes({ width: value })}
					min={0}
					max={100}
					step={10}
				/>

				<CheckboxControl
					label={__('Shadow', 'ctx-blocks')}
					checked={shadow}
					onChange={(event) => {
						setAttributes({ shadow: event });
					}}
				/>
				<CheckboxControl
					label={__('Flip vertical', 'ctx-blocks')}
					checked={flipX}
					onChange={(event) => {
						setAttributes({ flipX: event });
					}}
				/>

				<CheckboxControl
					label={__('Flip horizontal', 'ctx-blocks')}
					checked={flipY}
					onChange={(event) => {
						setAttributes({ flipY: event });
					}}
				/>

				<AnglePickerControl
					label={__('Rotate', 'ctx-blocks')}
					value={rotate}
					onChange={(event) => {
						setAttributes({ rotate: event });
					}}
				/>

				<SelectControl
					label={__('Image size', 'ctx-blocks')}
					value={imageSize}
					options={imageSizes}
					onChange={(event) => {
						setImageSize(event);
					}}
				/>

				<SelectControl
					label={__('Aspect Ratio', 'ctx-blocks')}
					value={aspectRatio}
					options={[
						{
							label: __('Original', 'ctx-blocks'),
							value: '',
						},
						{
							label: __('16:9 (Wide)', 'ctx-blocks'),
							value: '16/9',
						},
						{
							label: __('1:1 (Portrait)', 'ctx-blocks'),
							value: '1/1',
						},
						{
							label: __('21:9 (Extra Wide)', 'ctx-blocks'),
							value: '21/9',
						},
						{
							label: __('9:16 (Upright)', 'ctx-blocks'),
							value: '9/16',
						},
					]}
					onChange={(event) => {
						setAttributes({ aspectRatio: event });
					}}
				/>

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
			<PanelBody title={__('Behaviour', 'ctx-blocks')} initialOpen={true}>
				<CheckboxControl
					label={__('Zoom in on hover', 'ctx-blocks')}
					checked={hoverZoom}
					onChange={(event) => {
						setAttributes({ hoverZoom: event });
					}}
				/>
			</PanelBody>
		</InspectorControls>
	);
};

export default Inspector;
