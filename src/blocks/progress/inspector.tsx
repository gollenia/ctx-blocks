/**
 * WordPress dependencies
 */
import { InspectorControls, PanelColorSettings } from '@wordpress/block-editor';
import {
	CheckboxControl,
	__experimentalNumberControl as NumberControl,
	PanelBody,
	PanelRow,
	RangeControl,
	SelectControl,
	TextControl,
	ToggleControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import type { ProgressProps } from './types';

/**
 * Inspector controls
 */
const Inspector = ( props: ProgressProps ) => {
	const {
		attributes: {
			title,
			animate,
			barLabel,
			barType,
			maxValue,
			currentValue,
			showValues,
			unit,
			prefixedUnit,
			thousandSeparators,
			decimalPlaces,
		},
		setAttributes,
		setColorBar,
		colorBar,
		setColorBackground,
		colorBackground,
	} = props;

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Values', 'ctx-blocks' ) }
					initialOpen={ true }
				>
					<NumberControl
						label={ __( 'Max value', 'ctx-blocks' ) }
						value={ maxValue }
						onChange={ ( event ) =>
							setAttributes( { maxValue: event } )
						}
					/>
					<NumberControl
						label={ __( 'Current value', 'ctx-blocks' ) }
						value={ currentValue }
						onChange={ ( event ) =>
							setAttributes( { currentValue: event } )
						}
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Labels', 'ctx-blocks' ) }
					initialOpen={ true }
				>
					<PanelRow>
						<CheckboxControl
							label={ __( 'Show Values', 'ctx-blocks' ) }
							checked={ showValues }
							onChange={ ( event ) =>
								setAttributes( { showValues: event } )
							}
						/>
					</PanelRow>
					{ showValues && (
						<PanelRow>
							<CheckboxControl
								label={ __(
									'Separate Thousands',
									'ctx-blocks'
								) }
								checked={ thousandSeparators }
								onChange={ ( event ) =>
									setAttributes( {
										thousandSeparators: event,
									} )
								}
								hidden={ ! showValues }
							/>
						</PanelRow>
					) }
					{ showValues && (
						<RangeControl
							label={ __( 'Decimal places', 'ctx-blocks' ) }
							value={ decimalPlaces }
							onChange={ ( event ) => {
								setAttributes( { decimalPlaces: event } );
							} }
							min={ 0 }
							max={ 4 }
							hidden={ ! showValues }
						/>
					) }
					{ showValues && (
						<PanelRow>
							<TextControl
								label={ __( 'Unit', 'ctx-blocks' ) }
								value={ unit }
								onChange={ ( event ) =>
									setAttributes( { unit: event } )
								}
								hidden={ ! showValues }
							/>
						</PanelRow>
					) }
					{ ( showValues || unit != '' ) && (
						<PanelRow>
							<CheckboxControl
								label={ __(
									'Show unit before Value',
									'ctx-blocks'
								) }
								checked={ prefixedUnit }
								onChange={ ( event ) =>
									setAttributes( { prefixedUnit: event } )
								}
								hidden={ unit == '' || ! showValues }
							/>
						</PanelRow>
					) }
				</PanelBody>
				<PanelBody
					title={ __( 'Bar', 'ctx-blocks' ) }
					initialOpen={ true }
				>
					<SelectControl
						label={ __( 'Bar type', 'ctx-blocks' ) }
						value={ barType }
						options={ [
							{ label: __( 'Normal', 'ctx-blocks' ), value: '' },
							{
								label: __(
									'Gradient (experimental)',
									'ctx-blocks'
								),
								value: 'gradient',
							},
							{
								label: __( 'Stripes', 'ctx-blocks' ),
								value: 'stripes',
							},
						] }
						onChange={ ( event ) =>
							setAttributes( { barType: event } )
						}
					/>
					<SelectControl
						label={ __( 'Bar Label', 'ctx-blocks' ) }
						value={ barLabel }
						options={ [
							{ label: __( 'None', 'ctx-blocks' ), value: '' },
							{
								label: __( 'Percentage', 'ctx-blocks' ),
								value: 'percentage',
							},
							{
								label: __( 'Value', 'ctx-blocks' ),
								value: 'value',
							},
							{
								label: __( 'Both', 'ctx-blocks' ),
								value: 'both',
							},
						] }
						onChange={ ( event ) =>
							setAttributes( { barLabel: event } )
						}
					/>
					<ToggleControl
						label={ __( 'Animate', 'ctx-blocks' ) }
						checked={ animate }
						onChange={ ( event ) =>
							setAttributes( { animate: ! animate } )
						}
					/>
				</PanelBody>
			</InspectorControls>
			<InspectorControls group="styles">
				<PanelColorSettings
					title={ __( 'Colors', 'ctx-blocks' ) }
					colorSettings={ [
						{
							label: __( 'Color for low values', 'ctx-blocks' ),
							onChange: setColorBar,
							value: colorBar.color,
							disableCustomColors: true,
						},
						{
							label: __(
								'Color for medium values',
								'ctx-blocks'
							),
							onChange: setColorBackground,
							value: colorBackground.color,
							disableCustomColors: true,
						},
					] }
				/>
			</InspectorControls>
		</>
	);
};

export default Inspector;
